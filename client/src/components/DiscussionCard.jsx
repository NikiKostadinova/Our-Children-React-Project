import { Card } from "flowbite-react";
import { Link } from "react-router-dom";

export default function DiscussionCard({ image, title, slug, onDelete }) {
    return (
        <Card className=" flex flex-row max-h-[80px] min-w-[700px] " imgSrc={image} horizontal>
            <div className="flex items-center justify-between flex-grow space-x-4 ">
                <div className="">
                    <h5 className="text-lg font-bold tracking-tight text-gray-700 dark:text-white">
                        <Link to={`/discussion/${slug}`}>{title}</Link>
                    </h5>
                </div>
                <div className="flex flex-row items-center justify-between gap-3 ">
                    <button onClick={onDelete} className="text-red-500 hover:text-red-700">Delete</button>
                    <Link to={`/edit-post/${slug}`} className="text-teal-400 hover:text-teal-500">Edit</Link>
                </div>
            </div>
        </Card>
    );
}




// import { Card } from "flowbite-react";
// import { Link } from "react-router-dom";

// export default function DiscussionCard({ image, title, slug, onDelete }) {
//   return (
//     <Card className="flex flex-row max-w-md min-w-[300px]">
//       <img
//         src={image}
//         alt={title}
//         className="w-24 h-24 object-cover flex-shrink-0"  // Fixed size and maintains aspect ratio
//       />
//       <div className="flex flex-col justify-between flex-grow p-4 space-y-4">
//         <h5 className="text-lg font-bold tracking-tight text-gray-700 dark:text-white">
//           <Link to={`/discussion/${slug}`}>{title}</Link>
//         </h5>
//         <div className="flex flex-row gap-2">
//           <button onClick={onDelete} className="text-red-500 hover:text-red-700">Delete</button>
//           <Link to={`/edit-post/${slug}`} className="text-teal-400 hover:text-teal-500">Edit</Link>
//         </div>
//       </div>
//     </Card>
//   );
// }
