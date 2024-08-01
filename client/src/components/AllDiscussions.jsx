import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DiscussionCard from './DiscussionCard';
import { HiOutlineExclamation } from "react-icons/hi";

export default function AllDiscussions() {
  const { currentUser } = useSelector((state) => state.user);
  const [currentUserDiscussions, setCurrentUserDiscussions] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [discussionIdToDelete, setDiscussionIdToDelete] = useState(null);

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        console.log(`/api/discussion/getdiscussions?userId=${currentUser._id}`);
        const res = await fetch(`/api/discussion/getdiscussions?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setCurrentUserDiscussions(data.discussions);
          if (data.discussions.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchDiscussions();
    }
  }, [currentUser._id, currentUser.isAdmin]);

  const showMoreDiscussions = async () => {
    const startIndex = currentUserDiscussions.length;
    try {
      const res = await fetch(`/api/discussion/getdiscussions?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setCurrentUserDiscussions((previous) => [...previous, ...data.discussions]);
        if (data.discussions.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDiscussion = async () => {
    setShowModal(false);
    try {
      const res = await fetch(`/api/discussion/deletepost/${discussionIdToDelete}/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setCurrentUserDiscussions((prev) => prev.filter((discussion) => discussion._id !== discussionIdToDelete));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-3 w-[800px]">
      {currentUser.isAdmin && currentUserDiscussions.length > 0 ? (
        <>
          <div className="flex flex-col space-y-4 w-auto">
            {currentUserDiscussions.map((discussion) => (
              <DiscussionCard
                key={discussion._id}
                image={discussion.image}
                title={discussion.title}
                category={discussion.category}
                slug={discussion.slug}
                onDelete={() => {
                  setShowModal(true);
                  setDiscussionIdToDelete(discussion._id);
                }}
                onEdit={() => {}} // Handle edit logic here if needed
              />
            ))}
          </div>
          {showMore && (
            <button onClick={showMoreDiscussions} className="w-full text-teal-500 self-center text-sm py-7">Show More</button>
          )}
        </>
      ) : (
        <p>Create Your First Discussion</p>
      )}
      <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamation className="h-14 w-14 text-red-700 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">Are you sure you want to delete this discussion?</h3>
            <div className="flex justify-center gap-4">
              <Button color='failure' onClick={deleteDiscussion}>Yes, I am sure</Button>
              <Button onClick={() => setShowModal(false)}>No, cancel</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
