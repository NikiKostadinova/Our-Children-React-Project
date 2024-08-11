import { Button, Modal, Pagination, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import DiscussionCard from './DiscussionCard';
import { HiOutlineExclamation } from "react-icons/hi";
import { Link } from "react-router-dom";
// import DiscussionDisplay from "./DiscussionCard";

export default function AllDiscussions() {
  const { currentUser } = useSelector((state) => state.user);
  const [currentUserDiscussions, setCurrentUserDiscussions] = useState([]);
  
  const [showModal, setShowModal] = useState(false);
  const [discussionIdToDelete, setDiscussionIdToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 4;


  useEffect(() => {
    const fetchDiscussions = async (page) => {
      try {

        const res = await fetch(`/api/discussion/getdiscussions?page=${page}&limit=${itemsPerPage}`);

        const data = await res.json();
        if (res.ok) {
          setCurrentUserDiscussions(data.discussions);
          setTotalPages(data.totalPages);

        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchDiscussions(currentPage)
  }, [currentPage, currentUser._id, currentUser.isAdmin]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

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
      <p className="mx-auto p-10 text-lg font-semibold">Your Discussions</p>
      {currentUser.isAdmin && currentUserDiscussions.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell className="md:px-6 md:py-4">Image</Table.HeadCell>
              <Table.HeadCell className="md:px-6 md:py-4">Title</Table.HeadCell>
              <Table.HeadCell className=" hidden md:block  md:px-6 md:py-4">Category</Table.HeadCell>
              <Table.HeadCell className="md:px-6 md:py-4">Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y">
              {currentUserDiscussions.map((discussion) => (
                <Table.Row key={discussion._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="p-2">
                    <Link to={`/discussion/${discussion.slug}`}>
                      <img
                        src={discussion.image}
                        alt={discussion.title}
                        className='w-20 h-10 object-cover bg-gray-500'
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell className="p-1 pr-2 md:px-6 md:py-4">
                    <Link className="font-medium text-gray-900 dark:text-white" to={`/discussion/${discussion.slug}`}>{discussion.title}</Link>
                  </Table.Cell>
                  <Table.Cell className="hidden md:block md:px-6 md:py-4">{discussion.category}</Table.Cell>
                  <Table.Cell className="p-1 md:px-6 md:py-4">
                    <span onClick={() => {
                      setShowModal(true);
                      setDiscussionIdToDelete(discussion._id);
                    }} className="font-medium text-red-400 hover:text-red-500 cursor-pointer">Delete</span>
                  </Table.Cell>
                  <Table.Cell className="p-0 md:px-6 md:py-4">
                    <Link className="text-teal-400 hover:text-teal-500" to={`/edit-discussion/${discussion._id}`}>
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>

          </Table>
          <Link to={'/add-discussion'}>
            <Button type='button' gradientDuoTone='pinkToOrange' className="w-full mt-3">Start Discussion</Button>
          </Link>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            className="mx-auto p-5"
          />


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
