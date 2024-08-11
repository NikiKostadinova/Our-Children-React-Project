import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PostDisplay from '../components/PostDisplay';
import { useSelector } from 'react-redux';

export default function PostByCategory() {
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category') || '';
  const {currentUser} = useSelector((state) => state.user);
  

  useEffect(() => {

    const fetchPostsByCategory = async () => {
      try {
       
        const res = await fetch(`/api/post/getposts?category=${encodeURIComponent(category)}`);
        const data = await res.json();
        setPosts(data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPostsByCategory();
  }, [category]);

  return (
    <div className="max-w-8xl mx-auto p-3 flex flex-col gap-8 py-7">
      {posts && posts.length > 0 ? (
        <div className="flex flex-col gap-5">
          <h2 className="text-3xl font-semibold text-center">{category || 'All Categories'}</h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {posts.map((post) => (
              <PostDisplay key={post._id} post={post} />
            ))}
          </div>
        </div>
      ) : (
        <div className=' h-screen flex flex-col items-center'>
            <p className='text-3xl'>{category}</p>
        <p className="text-center mt-20 text-lg">There are no post in this category yet!</p>     
        {currentUser && currentUser.isAdmin && (
            <Link to="/add-new-post" className="text-red-400 text-lg">Add Post</Link>
        )}   
        
        </div>
      )}
    </div>
  );
}
