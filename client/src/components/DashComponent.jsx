import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { MdOutlineMessage } from "react-icons/md";
import CommentDisplay from '../components/CommentDisplay';
import { TbMessages } from "react-icons/tb";
import { CgFileDocument } from "react-icons/cg";
import { Pagination } from "flowbite-react";

export default function DashComponent() {


    const [userComments, setUserComments] = useState([]);
    const [totalDiscussions, setTotalDiscussions] = useState(0);
    const [totalPosts, setTotalPosts] = useState(0);
    const [totalPostComments, setTotalPostComments] = useState(0);
    const [totalDiscussionComments, setTotalDiscussionComments] = useState(0);
    const { currentUser } = useSelector((state) => state.user);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const postsPerPage = 3;



    useEffect(() => {
        const fetchUserDiscussions = async () => {
            try {
                const res = await fetch(`/api/discussion/getUserDiscussions/${currentUser._id}`);
                const data = await res.json();
                if (res.ok) {

                    setTotalDiscussions(data.length);

                }
            } catch (error) {
                console.log(error.message)
            }

        }
        const fetchUserPosts = async () => {
            try {
                const res = await fetch('/api/post/getposts');
                const data = await res.json();
                if (res.ok) {
                    setTotalPosts(data.totalPosts);
                }
            } catch (error) {
                console.log(error.message)
            }
        }

        const fetchUserCommentsCount = async (page) => {
            try {
              
                const res = await fetch(`/api/comment/getUserComments/${currentUser._id}?page=${page}&limit=${postsPerPage}`);

                const data = await res.json();
               

                if (res.ok) {
                    let countPostComments = 0;
                    let countDicussionComments = 0;
                    if (Array.isArray(data)) {

                        data.forEach(comment => {
                            if (comment.postId) {

                                countPostComments += 1;
                            } else if (comment.discussionId) {

                                countDicussionComments += 1;
                            }
                        });

                        setTotalPostComments(countPostComments);
                        setTotalDiscussionComments(countDicussionComments);

                        const sortedComments = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                        const totalComments = sortedComments.length;  
                        const calculatedTotalPages = Math.ceil(totalComments / postsPerPage);
                        setTotalPages(calculatedTotalPages);                        

                        const startIdx = (page - 1) * postsPerPage;
                        const endIdx = startIdx + postsPerPage;
                        setUserComments(data.slice(startIdx, endIdx));

                    }
                }
            } catch (error) {
                console.log(error.message);
            }
        };

        if (currentUser.isAdmin) {
            fetchUserPosts();
        }

        fetchUserDiscussions();
        fetchUserCommentsCount(currentPage);

    }, [currentUser, currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    return (
        <div className="p-3 md:mx-auto">
            <div className="flex-wrap flex gap-4 justify-center my-5">
                <div className="flex flex-col relative p-3 dark:bg-slate-700 dark:text-gray-300  gap-4 md:w-60 w-full rounded-md shadow-md">
                    <div className="flex justify-between">
                        <div>
                            <h3 className="text-gray-600 dark:text-gray-300 text-md">Your Discussions</h3>
                            <p className="absolute bottom-0 left-0 mb-2 ml-2 text-gray-800 dark:text-gray-300">{totalDiscussions}</p>
                        </div>
                        <MdOutlineMessage className="bg-gradient-to-r from-pink-500 to-orange-400  text-white rounded-full text-5xl p-3 shadow-lg" />

                    </div>
                </div>
                <div className="flex flex-col relative p-3 dark:bg-slate-700 dark:text-gray-300 gap-4 md:w-60 w-full rounded-md shadow-md">
                    <div className="flex justify-between">
                        <div>
                            <h3 className="text-gray-600 dark:text-gray-300 text-md">Your Post Comments</h3>
                            <p className="absolute bottom-0 left-0 mb-2 ml-2 text-gray-800 dark:text-gray-300">{totalPostComments}</p>
                        </div>
                        <TbMessages className="bg-gradient-to-r from-pink-500 to-orange-400  text-white rounded-full text-5xl p-3 shadow-lg" />
                    </div>
                </div>
                <div className="flex flex-col relative p-3 dark:bg-slate-700 dark:text-gray-300 gap-4 md:w-60 w-full rounded-md shadow-md">
                    <div className="flex justify-between">
                        <div>
                            <h3 className="text-gray-600 dark:text-gray-300 text-md mb-5">Your Discussion Comments</h3>
                            <p className="absolute bottom-0 left-0 mb-2 ml-2 text-gray-800 dark:text-gray-300">{totalDiscussionComments}</p>
                        </div>
                        <TbMessages className="bg-gradient-to-r from-pink-500 to-orange-400  text-white rounded-full text-5xl p-3 shadow-lg" />
                    </div>
                </div>
                {currentUser.isAdmin && (
                    <div className="flex flex-col relative p-3 dark:bg-slate-700 dark:text-gray-300 gap-4 md:w-60 w-full rounded-md shadow-md">
                        <div className="flex justify-between">
                            <div>
                                <h3 className="text-gray-600 dark:text-gray-300 text-md">Your Posts</h3>
                                <p className="absolute bottom-0 left-0 mb-2 ml-2 text-gray-800 dark:text-gray-300">{totalPosts}</p>
                            </div>
                            <CgFileDocument className="bg-gradient-to-r from-pink-500 to-orange-400  text-white rounded-full text-5xl p-3 shadow-lg" />
                        </div>
                    </div>
                )}
            </div>
            <div className="flex-wrap flex gap-4 justify-center">
                <h2 className="my-5 text-lg">Your Recent Comments</h2>
                <div className="flex flex-wrap gap-2 justify-center ">
                    {userComments
                        .slice()
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                        .map((comment) => (
                            <CommentDisplay
                                key={comment._id}
                                comment={comment}
                            />
                        ))}
                    <div className="flex justify-center mt-4">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}
