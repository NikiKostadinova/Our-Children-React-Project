import { Link } from 'react-router-dom';
import { FaMessage } from "react-icons/fa6";


export default function DiscussionDisplay({ discussion }) {

  return (
    <div className='group relative w-full border border-red-400 hover:border-2 h-[400px] overflow-hidden rounded-lg sm:w-[430px] transition-all'>
      <Link to={`/discussion/${discussion.slug}`} >
        <img src={discussion.image} alt='Post Image' className='h-[260px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20 ' />
      
      <div className='p-3 flex flex-col gap-2 '>
        <p className='text-lg font-semibold line-clamp-2'>{discussion.title}</p>
        <p className='italic text-sm mb-3'>{discussion.category}</p>  
        <FaMessage />     
      </div>
      <div className='absolute  bottom-0 left-0 right-0 p-3 transition-all duration-300 translate-y-[100%] group-hover:translate-y-0'>
        <div className='p-3'>
        <p className='line-clamp-4 text-gray-500 dark:text-gray-400'>{discussion.content}</p>
        </div>
        </div>
        </Link>
    </div>
  )
}