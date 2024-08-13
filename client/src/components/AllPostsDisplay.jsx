import { Button, Modal, Pagination, Table } from "flowbite-react";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { HiOutlineExclamation } from "react-icons/hi";

export default function AllPostsDisplay() {
  const { currentUser } = useSelector((state) => state.user);
  const [currentUserPosts, setCurrentUserPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 4;
 

  useEffect(() => {
    const fetchUserPosts = async (page) => {
      const res = await fetch(`/api/post/getposts?page=${page}&limit=${itemsPerPage}`);
      const data = await res.json();
      setCurrentUserPosts(data.posts);
      setTotalPages(data.totalPages);
    }
    fetchUserPosts(currentPage);
  }, [currentPage, currentUser._id, currentUser.isAdmin]);

  const deletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(`/api/post/deletepost/${postIdToDelete}/${currentUser._id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setCurrentUserPosts((prev) => prev.filter((post) => post._id !== postIdToDelete));
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }
  return (

    <div className="flex flex-col max-w-2xl mx-auto  p-3 ">
      <p className="mx-auto p-10 text-lg font-semibold">Your Posts</p>
      {currentUser.isAdmin && currentUserPosts.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell className="md:px-6 md:py-4">Image</Table.HeadCell>
              <Table.HeadCell className="md:px-6 md:py-4">Title</Table.HeadCell>
              <Table.HeadCell className="hidden md:block md:px-6 md:py-4">Category</Table.HeadCell>
              <Table.HeadCell className="p-2 md:px-6 md:py-4">Delete</Table.HeadCell>
              <Table.HeadCell className="p-2 md:px-6 md:py-4">
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y">
              {currentUserPosts.map((post) => (
                <Table.Row key={post._id} className="bg-white dark:border-gray-700 dark:bg-gray-800 ">
                  <Table.Cell className="p-2">
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className='w-20 h-10 object-cover bg-gray-500'
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell className="p-1 pr-2 md:px-6 md:py-4">
                    <Link className="font-medium  text-gray-900 dark:text-white" to={`/post/${post.slug}`}>{post.title}</Link>
                  </Table.Cell>
                  <Table.Cell className="hidden md:block md:px-6 md:py-4">{post.category}</Table.Cell>
                  <Table.Cell className="p-1 md:px-6 md:py-4">
                    <span onClick={() => {
                      setShowModal(true);
                      setPostIdToDelete(post._id);
                    }} className="font-medium text-red-400 hover:text-red-500 cursor-pointer">Delete</span>
                  </Table.Cell>
                  <Table.Cell className="p-0 md:px-6 md:py-4">
                    <Link className="text-teal-400 hover:text-teal-500" to={`/edit-post/${post._id}`}>
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>

          </Table>

          {currentUser.isAdmin && (
            <Link to={'/add-new-post'}>
              <Button type='button' gradientDuoTone='pinkToOrange' className="w-full mt-3" >Add New Post</Button>
            </Link>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            className="mx-auto p-5"
          />

        </>
      ) : (
        <>
        <p>Create Your First Post</p>
        {currentUser.isAdmin && (
          <Link to={'/add-new-post'}>
            <Button type='button' gradientDuoTone='pinkToOrange' className="w-full mt-3" >Add New Post</Button>
          </Link>
        )}
        </>
      )}
      <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'   >
        <Modal.Header className="  bg-white/80 shadow-lg" />
        <Modal.Body className="  bg-white/80 shadow-lg" >
          <div className="text-center">
            <HiOutlineExclamation className="h-14 w-14 text-red-700 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">Are you sure you want to delete this post?</h3>
            <div className="flex justify-center gap-4">
              <Button color='failure' onClick={deletePost}>Yes, I am sure</Button>
              <Button onClick={() => setShowModal(false)}>No, cancel</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>

  )
}
