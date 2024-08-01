
import { Link } from 'react-router-dom';

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
  }, []);


  return (
    <div className='p-3'>
      <p className='p-3 text-3xl font-semibold text-center'>Categories</p>
    <div className='flex flex-wrap justify-center items-center gap-2 p-5 sm:p-1'>
    <Card image={pregnancy} title="Pregnancy" category="Pregnancy" />
        <Card image={newborn} title="Newborn" category="Newborn" />
        <Card image={firstYear} title="First Year" category="First Year" />
        <Card image={toddler} title="Toddlers" category="Toddlers" />
        <Card image={preschool} title="Pre Schoolers" category="Pre Schoolers" />
        <Card image={schoolage} title="School Age" category="School Age" />
        <Card image={teens} title="Teens" category="Teens" />
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
           className="text-lg text-red-400 hover:text-red-500 text-center" >All Discussions</Link>
       </div>
     )}
   </div>
   </div>
  );
}

function Card({ image, title, category }) {
  return (
    
    <div className='group relative w-full sm:w-1/2 md:w-[130px]  border border-red-400 hover:border-2 h-[180px] overflow-hidden rounded-lg transition-all '>
      <Link to={`/discussions?category=${encodeURIComponent(category)}`}>
        <img src={image} alt={title} className='h-[130px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20 rounded-t-lg' />

        <div className='p-1 flex flex-col gap-2 text-center'>
          <p className='text-lg font-semibold line-clamp-2 text-gray-600 dark:text-gray-300'>{title}</p>          
        </div>
      </Link>
    </div>
   
  

  );
}