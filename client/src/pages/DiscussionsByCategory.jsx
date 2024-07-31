import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DiscussionDisplay from '../components/DiscussionDisplay';

export default function DiscussionsByCategory() {
  const [discussions, setDiscussions] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category') || '';
  

  useEffect(() => {

    const fetchDiscussionsByCategory = async () => {
      try {
        
        const res = await fetch(`/api/discussion/getdiscussions?category=${encodeURIComponent(category)}`);
        const data = await res.json();
        setDiscussions(data.discussions);
      } catch (error) {
        console.error('Error fetching discussions:', error);
      }
    };

    fetchDiscussionsByCategory();
  }, [category]);

  return (
    <div className="max-w-8xl mx-auto p-3 flex flex-col gap-8 py-7">
      {discussions && discussions.length > 0 ? (
        <div className="flex flex-col gap-5">
          <h2 className="text-3xl font-semibold text-center">{category || 'All Categories'}</h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {discussions.map((discussion) => (
              <DiscussionDisplay key={discussion._id} discussion={discussion} />
            ))}
          </div>
        </div>
      ) : (
        <div className=' h-screen flex flex-col items-center'>
            <p className='text-3xl'>{category}</p>
        <p className="text-center mt-20 text-lg">There are no discussions in this category yet!</p>
        <p className="text-center text-lg"> Be the first to start a discussion!</p>
        <Link to="/add-discussion" className="text-red-400 text-lg">Sart Discussion</Link>  
        </div>
      )}
    </div>
  );
}
