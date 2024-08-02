import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import DiscussionCard from './DiscussionCard';
import { HiOutlineExclamation } from "react-icons/hi";
import { Link } from "react-router-dom";
// import DiscussionDisplay from "./DiscussionCard";

export default function AllDiscussions() {
  const { currentUser } = useSelector((state) => state.user);
  const [currentUserDiscussions, setCurrentUserDiscussions] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [discussionIdToDelete, setDiscussionIdToDelete] = useState(null);


  useEffect(() => {
    const fetchDiscussions = async () => {
      try {        
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
      const res = await fetch(`/api/discussion/deletediscussion/${discussionIdToDelete}/${currentUser._id}`, {
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
    <div className="flex flex-col max-w-2xl mx-auto  p-3 ">
      {currentUser.isAdmin && currentUserDiscussions.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Image</Table.HeadCell>
              <Table.HeadCell>Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y">
              {currentUserDiscussions.map((discussion) => (
                <Table.Row key={discussion._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    <Link to={`/discussion/${discussion.slug}`}>
                      <img
                        src={discussion.image}
                        alt={discussion.title}
                        className='w-20 h-10 object-cover bg-gray-500'
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link className="font-medium text-gray-900 dark:text-white" to={`/discussion/${discussion.slug}`}>{discussion.title}</Link>
                  </Table.Cell>
                  <Table.Cell>{discussion.category}</Table.Cell>
                  <Table.Cell>
                    <span onClick={() => {
                      setShowModal(true);
                      setDiscussionIdToDelete(discussion._id);
                    }} className="font-medium text-red-400 hover:text-red-500 cursor-pointer">Delete</span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link className="text-teal-400 hover:text-teal-500" to={`/edit-discussion/${discussion._id}`}>
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>

          </Table>

          {
            showMore && (
              <button onClick={showMoreDiscussions} className="w-full text-teal-500 self-center text-sm py-7">Show More</button>
            )
          }
        </>
      ) : (
        <p>Create Your First Post</p>
      )}
      <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
        <Modal.Header />
        <Modal.Body  >
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
  )

}
