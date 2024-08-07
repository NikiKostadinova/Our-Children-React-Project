import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DSidebar from '../components/DSidebar'
import Profile from "../components/Profile";

import DashComponent from "../components/DashComponent";
import AllDiscussions from "../components/AllDiscussions";

import AllPostsDisplay from "../components/AllPostsDisplay";


export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  },
    [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* Sidebar */}
        <DSidebar />
      </div>
      {/* profile... */}
      {tab === 'profile' && <Profile />}
      {/* {posts ...} */}
      {tab === 'posts' && <AllPostsDisplay />}
      {/* {discussions ...} */}
      {tab === 'discussions' && <AllDiscussions />}
      {/* dashboard component */}
      {tab === 'dash' && <DashComponent />}
    </div>
  )
}
