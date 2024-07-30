import { useEffect, useState } from "react";
import PostDisplay from '../components/PostDisplay';
import { Link } from "react-router-dom";


export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getposts');
      const data = await res.json();
      setPosts(data.posts);
    }
    fetchPosts();
  }, [])
  return (
    <div>
      <div className="flex flex-col gap-4 lg:p-28 px-5 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold lg:text-6xl">Welcome</h1>
        <p className="text-gray-500 text-sm sm:text-md ">What to expect...</p>
      </div>
      <div className="max-w-8xl mx-auto p-3 flex flex-col gap-8 py-7 ">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
            <div className="flex flex-wrap gap-2 justify-center">
              {posts.map((post) => (
                <PostDisplay key={post._id} post={post} />
              ))}
            </div>
            <Link to={''}
              className="text-lg text-red-400 hover:text-red-500 text-center" >All Posts</Link>
          </div>
        )}
      </div>
    </div>
  )
}

