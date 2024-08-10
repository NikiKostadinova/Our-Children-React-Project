import { useEffect, useState } from "react";
import PostDisplay from '../components/PostDisplay';
import { Link } from "react-router-dom";
import BannerHomePage2 from '../assets/BannerHomePage2.png'


export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getposts?limit=6');
      const data = await res.json();
      setPosts(data.posts);
    }
    fetchPosts();
  }, [])
  return (
    <div>
      <div className="flex flex-col w-full relative">
      <img src={BannerHomePage2} alt="Banner" className='w-full h-full object-cover' />
        
      </div>
      <div className="max-w-8xl mx-auto p-3 flex flex-col gap-8 py-7 ">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-5">
            <h2 className="text-4xl font-semibold text-center p-5">Recent Posts</h2>
            <div className="flex flex-wrap gap-2 justify-center">
              {posts.map((post) => (
                <PostDisplay key={post._id} post={post} />
              ))}
            </div>
            <Link to={'/allposts'}
              className="text-lg text-red-400 hover:text-red-500 text-center" >All Posts</Link>
          </div>
        )}
      </div>
    </div>
  )
}

