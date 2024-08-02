// import { Card } from "flowbite-react";
// import { Link } from "react-router-dom";

// export default function DiscussionCard({ image, title, slug, onDelete }) {
//     return (
//         <Card className=" flex flex-row max-h-[80px] min-w-[700px] " imgSrc={image} horizontal>
//             <div className="flex items-center justify-between flex-grow space-x-4 ">
//                 <div className="">
//                     <h5 className="text-lg font-bold tracking-tight text-gray-700 dark:text-white">
//                         <Link to={`/discussion/${slug}`}>{title}</Link>
//                     </h5>
//                 </div>
//                 <div className="flex flex-row items-center justify-between gap-3 ">
//                     <button onClick={onDelete} className="text-red-500 hover:text-red-700">Delete</button>
//                     <Link to={`/edit-post/${slug}`} className="text-teal-400 hover:text-teal-500">Edit</Link>
//                 </div>
//             </div>
//         </Card>
//     );
// }



import { Link } from 'react-router-dom';


export default function DiscussionDisplay({ discussion, onDelete, slug }) {

    return (
        <div className='group relative  border border-red-400 dark:border-red-300 hover:border-2 h-[400px] overflow-hidden rounded-lg w-[700px]  transition-all flex'>
            <Link to={`/discussion/${discussion.slug}`} className='flex w-[700px]'>
                <img src={discussion.image} alt='Post Image' className='w-1/3 h-full object-cover transition-all duration-300 z-20' />

                <div className='w-2/3 p-2 flex flex-col '>
                    <span className='text-md font-semibold line-clamp-1'>{discussion.title}</span>
                    <span className='italic text-sm mb-3'>{discussion.category}</span>
                </div>           

            </Link>
            <div className="flex flex-row items-center justify-between gap-3 p-3">
                   <button onClick={onDelete} className="text-red-500 hover:text-red-700">Delete</button>
                   <Link to={`/edit-post/${slug}`} className="text-teal-400 hover:text-teal-500">Edit</Link>
               </div>
        </div>
    )
}

