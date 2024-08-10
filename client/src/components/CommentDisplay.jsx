import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


export default function CommentDisplay({ comment }) {
    const [item, setItem] = useState(null);
    const itemId = comment.postId || comment.discussionId;
    const isPost = !!comment.postId;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(isPost ? `/api/post/getpost/${itemId}` : `/api/discussion/getdiscussion/${itemId}`);
                const data = await res.json();
                if (res.ok) {
                    setItem(data);
                } else {
                    console.error('Failed to fetch data:', data.message);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        

        fetchData();
    }, [itemId, isPost]);

    if (!item) {
        return <div>Loading...</div>;
    }


    return (
        <div className='group relative flex dark:bg-slate-800 border border-red-400 hover:border-2 h-[100px] overflow-hidden rounded-lg w-full mx-10 transition-all'>
        <Link to={isPost ? `/post/${item.slug}` : `/discussion/${item.slug}`} className='flex w-full'>
            <img 
                src={item.image} 
                alt={isPost ? 'Post Image' : 'Discussion Image'} 
                className='h-full w-1/3 object-cover transition-all duration-300 z-20' 
            />
            <div className='p-3 flex flex-col gap-1 w-2/3'>
                <p className='text-md md:text-lg font-semibold line-clamp-2'>{item.title}</p>
              
                <div className='flex-1 flex items-end gap-5'>
                    <p className='text-sm md:text-md text-gray-500 dark:text-gray-300 line-clamp-1'>{comment.content}</p>
                    <span className='ml-auto text-sm md:text-md '>{comment && new Date(comment.createdAt).toLocaleDateString()}</span>
                </div>
            </div>
        </Link>
    </div>
    )
}

