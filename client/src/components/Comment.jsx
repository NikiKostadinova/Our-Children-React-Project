import { Button, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa6";
import { useSelector } from "react-redux";


export default function Comment({ comment, onLike, onUpdate, onDelete }) {
    const { currentUser } = useSelector(state => state.user);
    const [isUpdating, setIsUpdating] = useState(false);
    const [updatedComment, setUpdatedComment] = useState(comment.content);
    const [user, setUser] = useState({});

    useEffect(() => {
        const gettUser = async () => {
            try {

                const res = await fetch(`/api/user/${comment.userId}`);
                const data = await res.json();
                if (res.ok) {
                    setUser(data)
                }

            } catch (error) {
                console.log(error.message)
            }
        }

        gettUser();
    }, [comment]);

    const updateComment = () => {
        setIsUpdating(true);
        setUpdatedComment(comment.content)
    }
    const handleUpdate = async () => {
        try {
            const res = await fetch(`/api/comment/updateComment/${comment._id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: updatedComment
                })
            });

            console.log(res)
            if (res.ok) {
                console.log('ALMOST')

                setIsUpdating(false);
                onUpdate(comment, updatedComment);
            }

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="flex p-4 border-b dark:border-gray-500 text-sm">
            <div className="flex-shrink-0 mr-3">
                <img className="w-10 h-10 rounded-full bg-gray-300" src={user.profilePicture} alt="Profile Picture" />
            </div>
            <div className="flex-1">
                <div className="flex items-center mb-1"><span className="fond-bold mr-1 text-xs truncate ">{user ? `@${user.username}` : 'Anonymous'}</span></div>
                {isUpdating ? (
                    <>
                        <Textarea
                            className="mb-2 focus:ring-1 focus:ring-red-400  focus:border-red-400 dark:focus:ring-1 dark:focus:ring-red-400 dark:focus:border-red-400"
                            value={updatedComment}
                            onChange={(e) => setUpdatedComment(e.target.value)}
                        />
                        <div className="flex justify-between">
                            <Button type="button" size='sm' gradientDuoTone='pinkToOrange' outline onClick={handleUpdate}>Update</Button>
                            <Button type="button" size='sm' gradientDuoTone='pinkToOrange' outline onClick={() => setIsUpdating(false)}>Cancel</Button>

                        </div>
                    </>
                ) : (
                    <>
                        <p className="text-gray-500 mb-2 ">{comment.content}</p>
                        <div className="flex items-center pt-2 text-xs gap-2">
                            {currentUser && (
                                <button type='button' onClick={() => onLike(comment._id)} className={`text-grey-400 hover:text-red-400 ${currentUser && comment.likes.includes(currentUser._id) && 'text-red-400'}`}>
                                    <FaThumbsUp className="text-sm" />
                                </button>
                            )}

                            <p className="text-gray-400">
                                {comment.numberOfLikes > 0 && comment.numberOfLikes + ' ' + (comment.numberOfLikes === 1 ? 'Like' : 'Likes')}
                            </p>
                            {
                                currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) && (
                                    <>
                                        <button type="button" onClick={updateComment} className=" text-sm text-gray-400 hover:text-cyan-400">Update</button>
                                        <button type="button" onClick={() => onDelete(comment._id)} className=" text-sm text-gray-400 hover:text-red-400">Delete</button>
                                    </>
                                )
                            }
                        </div>
                    </>
                )}

            </div>

        </div>
    )
}
