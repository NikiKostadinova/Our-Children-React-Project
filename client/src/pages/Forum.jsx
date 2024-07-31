
import { Link } from 'react-router-dom';
import { FaMessage } from "react-icons/fa6";

import pregnancy from '../assets/pregnancy.jpg';
import newborn from '../assets/newborn.jpg';
import firstYear from '../assets/firstYear.jpg';
import toddler from '../assets/toddler.jpg';
import preschool from '../assets/preschool.jpg';
import schoolage from '../assets/schoolage.jpg';
import teens from '../assets/teens.jpg';
import { useEffect, useState } from 'react';
import DiscussionDisplay from '../components/DiscussionDisplay';





export default function Forum() {
  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    const fetchDiscussions = async () => {
      const res = await fetch('/api/discussion/getdiscussions');
      const data = await res.json();
      setDiscussions(data.discussions);
    }
    fetchDiscussions();
  }, [])
  return (
    <div className='p-3'>
    <div className='flex flex-wrap justify-center items-center gap-2 p-5 sm:p-1'>
      <Card image={pregnancy} title="Pregnancy" />
      <Card image={newborn} title="Newborn" />
      <Card image={firstYear} title="First Year" />
      <Card image={toddler} title="Toddlers" />
      <Card image={preschool} title="Pre Schoolers" />
      <Card image={schoolage} title="School Age" />
      <Card image={teens} title="Teens" />
    </div>
     <div className="max-w-8xl mx-auto p-3 flex flex-col gap-8 py-7 ">
     {discussions && discussions.length > 0 && (
       <div className="flex flex-col gap-5">
         <h2 className="text-2xl font-semibold text-center">Recent Discussions</h2>
         <div className="flex flex-wrap gap-2 justify-center">
           {discussions.map((discussion) => (
             <DiscussionDisplay key={discussion._id} discussion={discussion} />
           ))}
         </div>
         <Link to={''}
           className="text-lg text-red-400 hover:text-red-500 text-center" >All Posts</Link>
       </div>
     )}
   </div>
   </div>
  );
}

function Card({ image, title }) {
  return (
    
    <div className='group relative w-full sm:w-1/2 md:w-[130px]  border border-red-400 hover:border-2 h-[200px] overflow-hidden rounded-lg transition-all'>
      <Link to="#">
        <img src={image} alt={title} className='h-[130px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20 rounded-t-lg' />

        <div className='p-1 flex flex-col gap-2 '>
          <p className='text-lg font-semibold line-clamp-2'>{title}</p>
          <div className='flex items-center gap-1 mb-2'>
            <FaMessage />
            <p>56</p>
          </div>
        </div>
      </Link>
    </div>
   
  

  );
}