import { Alert, Button, Textarea } from "flowbite-react";
import { useState } from "react";
import { useSelector } from "react-redux"
import { Link } from "react-router-dom";

export default function Comments({ postId }) {
    const { currentUser } = useSelector(state => state.user);
    const [comment, setComment] = useState('');
    const [ commentError, setCommentError] = useState(null);

    const addComment = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/comment/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: comment, postId, userId: currentUser._id })
            }
            );

            const data = await res.json();
            if (res.ok) {
                setComment('');
                setCommentError(null)
            }
        } catch (error) {
            setCommentError(error.message)
        }


    }

    return (
        <div className='max-w-2xl mx-auto w-full p-3'>
            {currentUser ? (
                <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
                    <p>User:</p>
                    <img className='h-7 w-7 object-cover rounded-full' src={currentUser.profilePicture} alt="User Profile Picture" />
                    <Link to={'/dashboard?tab=profile'} className="text-xs text-cyan-600 hover:underline">
                        @{currentUser.username}
                    </Link>
                </div>
            ) : (
                <div>
                    You must be signed in to comment!
                    <Link to={'/sign-in'}>Sign In</Link>
                </div>
            )}
            {currentUser && (
                <form onSubmit={addComment} className="w-full border border-red-400 rounded-md p-3">
                    <Textarea onChange={(e) => setComment(e.target.value)} value={comment} placeholder="Add a comment" rows='3' maxLength='200' className="w-full focus:ring-1 focus:ring-red-400  focus:border-red-400 dark:focus:ring-1 dark:focus:ring-red-400 dark:focus:border-red-400" />
                    <div className="flex justify-between items-center mt-5">
                        <p className="text-gray-500 text-xs">{200 - comment.length} characters left</p>
                        <Button gradientDuoTone='pinkToOrange' type='submit'>Add Comment</Button>
                    </div>
                    {commentError && (<Alert color="failure" className="mt-5" >{commentError}</Alert>)}                    
                </form>
                
            )}
        </div>
    )
}
