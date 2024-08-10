import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Comments from "../components/Comments";

export default function Post() {
    const { postSlug } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [post, setPost] = useState(null);

   

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
                const data = await res.json();
                if (!res.ok) {
                    setError(true);
                    setLoading(false);
                    return;
                } else {
                    setPost(data.posts[0]);
                    setLoading(false);
                    setError(false);
                }

            } catch (error) {
                
                setError(true);
                setLoading(false);
            }
        }
        fetchPost();
    }, [postSlug]);

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <Spinner size="xl" />
        </div>
    )
    console.log(error)
    return <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
        <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">{post && post.title}</h1>
        <img src={post && post.image} alt={post && post.title} className="mt-10 p-3 max-h-[500px] max-w-[800px] object-cover self-center" />
        <div className="p-3 border-b border-slate-500 mx-auto text-sm">
            <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="mb-10">
        <pre className="whitespace-pre-wrap font-sans p-3 max-w-2xl mx-auto w-full">{post && post.content}</pre>
        </div>
        <Comments postId={post._id} />
    </main>
}
