import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


export default function CommentDisplay({ comment }) {

    const [discussions, setDiscussions] = useState([]);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (comment.postId) {
            
            const fetchPosts = async () => {
                const res = await fetch('/api/post/getposts');
                const data = await res.json();
                setPosts(data.posts);
            }
            console.log(posts)
            fetchPosts();

            const post = posts.find(({ _id }) => _id === comment.postId);
            console.log(post)

        } else if (comment.discussionId) {

            const fetchDiscussions = async () => {
                const res = await fetch('/api/discussion/getdiscussions');
                const data = await res.json();
                setDiscussions(data.discussions);
            }
            fetchDiscussions();

            const discussion = discussions.find(({ _id }) => _id === comment.discussionId);
            console.log(discussion)
        }



    }, [comment]);




    return (
        <div className='group relative w-full border border-red-400 hover:border-2 h-[400px] overflow-hidden rounded-lg sm:w-[430px] transition-all'>
            <Link to={'/'}>
                <img src={''} alt={posts ? 'Post Image' : 'Discussion Image'} className='h-[260px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20 ' />

                <div className='p-3 flex flex-col gap-2 '>
                    <p className='text-lg font-semibold line-clamp-2'>HA</p>
                    <p className='italic text-sm mb-3'>CAT</p>
                </div>
                <div className='absolute bottom-0 left-0 right-0 p-3 transition-all duration-300 translate-y-[100%] group-hover:translate-y-0'>
                    <div className='p-3'>
                        <p className='line-clamp-4 text-gray-500 dark:text-gray-300'>Content</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}