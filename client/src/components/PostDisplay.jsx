import { Link } from 'react-router-dom';


export default function PostDisplay({ post }) {

  return (
    <div className='group relative w-full border border-red-400 hover:border-2 h-[200px] md:h-[300px] overflow-hidden rounded-lg sm:w-[430px] transition-all '>
      <Link to={`/post/${post.slug}`} >
        <img src={post.image} alt='Post Image' className='h-[100px] md:h-[200px] w-full object-cover group-hover:h-[80px] transition-all duration-300 z-20 ' />
      
      <div className='p-3 flex flex-col gap-2 '>
        <p className='text-md md:text-lg font-semibold line-clamp-1'>{post.title}</p>
        <p className='italic text-sm mb-3 group-hover:hidden md:group-hover:block md:block'>{post.category}</p>            
      </div>
      <div className='absolute  bottom-0 left-0 right-0 p-3 transition-all duration-300 translate-y-[100%] group-hover:translate-y-0'>
        <div className='p-3'>
        <p className='line-clamp-2 md:line-clamp-4 text-gray-500 dark:text-gray-300 text-sm md:text-md'>{post.content}</p>
        </div>
        </div>
        </Link>
    </div>
  )
}
