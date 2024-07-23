import { useEffect, useState } from "react"


export default function Comment({comment}) {
    const [user, setUser] = useState({});
    useEffect(() => {
       const gettUser = async () => {
        try {
            
            const res = await fetch(`/api/user/${comment.userId}`);
            const data = await res.json();
            if(res.ok){
                setUser(data)
            }
            
        } catch (error) {
            console.log(error.message)
        }
       }
       
       gettUser();
    }, [comment])
  return (
    <div className="flex p-4 border-b dark:border-gray-500 text-sm">
        <div className="flex-shrink-0 mr-3">
            <img className="w-10 h-10 rounded-full bg-gray-300" src={user.profilePicture} alt="Profile Picture" />
        </div>
        <div className="flex-1">
            <div className="flex items-center mb-1"><span className="fond-bold mr-1 text-xs truncate ">{user ? `@${user.username}` : 'Anonymous'}</span></div>
        <p className="text-gray-500 mb-2 ">{comment.content}</p>
        </div>
        
    </div>
  )
}
