
import { Link } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import pregnancy from '../assets/pregnancy.jpg';
import newborn from '../assets/newborn.jpg';
import firstYear from '../assets/firstYear.jpg';
import toddler from '../assets/toddler.jpg';
import preschool from '../assets/preschool.jpg';
import schoolage from '../assets/schoolage.jpg';
import teens from '../assets/teens.jpg';
import { useEffect, useState } from 'react';
import DiscussionDisplay from '../components/DiscussionDisplay';
import { Pagination } from 'flowbite-react';

const categories = [
  { image: pregnancy, title: "Pregnancy", category: "Pregnancy" },
  { image: newborn, title: "Newborn", category: "Newborn" },
  { image: firstYear, title: "First Year", category: "First Year" },
  { image: toddler, title: "Toddlers", category: "Toddlers" },
  { image: preschool, title: "Pre Schoolers", category: "Pre Schoolers" },
  { image: schoolage, title: "School Age", category: "School Age" },
  { image: teens, title: "Teens", category: "Teens" },
];



export default function Forum() {
  const [discussions, setDiscussions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const discussionsPerPage = 9; 

  useEffect(() => {
    const fetchDiscussions = async (page) => {
      const res = await fetch(`/api/discussion/getdiscussions?page=${page}&limit=${discussionsPerPage}`);
      const data = await res.json();
      setDiscussions(data.discussions);
      setTotalPages(data.totalPages);
      
    }
    fetchDiscussions(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    
    setCurrentPage(page);
   
  }

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  }

  return (
    <div className='p-3'>
      <div className="flex justify-between items-center p-3">
        <p className='text-3xl mx-auto font-semibold text-center'>Discussion Categories</p>
        <button
          onClick={toggleNavbar}
          className="md:hidden focus:outline-none"
        >
          {isNavbarOpen ? (
            <IoIosArrowUp className="w-6 h-6 text-gray-600 dark:hover:text-gray-300" />
          ) : (
            <IoIosArrowDown className="w-6 h-6 text-gray-600 dark:hover:text-gray-300" />
          )}
        </button>
      </div>
      {isNavbarOpen && (
        <div className="md:hidden bg-gray-100 p-4 dark:bg-gray-800 ">
          {categories.map(({ title, category }) => (
            <Link 
              key={category}
              to={`/discussions?category=${encodeURIComponent(category)}`} 
              className="block  py-2 pl-3 pr-4 hover:bg-gray-200 dark:hover:bg-gray-700 w-full dark:text-gray-400 dark:hover:text-gray-200"
            >
              {title}
            </Link>
          ))}
        </div>
      )}
      <div className="hidden md:block">
      <div className='flex flex-wrap justify-center items-center gap-2 p-5 sm:p-1'>
        <Card image={pregnancy} title="Pregnancy" category="Pregnancy" />
        <Card image={newborn} title="Newborn" category="Newborn" />
        <Card image={firstYear} title="First Year" category="First Year" />
        <Card image={toddler} title="Toddlers" category="Toddlers" />
        <Card image={preschool} title="Pre Schoolers" category="Pre Schoolers" />
        <Card image={schoolage} title="School Age" category="School Age" />
        <Card image={teens} title="Teens" category="Teens" />
      </div>
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
            <div className="flex justify-center mt-4 ">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages }
            onPageChange={handlePageChange}
          />
        </div>
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