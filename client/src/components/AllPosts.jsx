import { Table } from "flowbite-react";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function AllPosts() {
  const {currentUser} = useSelector((state) => state.user);
  const [currentUserPosts, setCurrentUserPosts] = useState([]);

    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`)
          const data = await res.json();
          if(res.ok) {
            setCurrentUserPosts(data.posts)
          }
        } catch (error) {
          console.log(error.message)
        }
      };
      if(currentUser.isAdmin){
        fetchPosts();
      }
    }, [currentUser._id, currentUser.isAdmin])
  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 ">
      {currentUser.isAdmin && currentUserPosts.length > 0 ? (
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
            {currentUserPosts.map((post) => (
             <Table.Row key={post._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
             <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className='w-20 h-10 object-cover bg-gray-500'
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link className="font-medium text-gray-900 dark:text-white" to={`/post/${post.slug}`}>{post.title}</Link>
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>
                    <span className="font-medium text-red-400 hover:text-red-500 cursor-pointer">Delete</span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link className="text-teal-400 hover:text-teal-500" to={`/edit-post/${post._id}`}>
                    <span>Edit</span>
                    </Link>
                  </Table.Cell>
             </Table.Row>
             ))}
            </Table.Body>
          
        </Table>
        </>
      ):(
        <p>Create Your First Post</p>
      )}
    </div>
  )
}
