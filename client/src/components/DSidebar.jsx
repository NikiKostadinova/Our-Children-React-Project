import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiUser, HiArrowSmRight, HiDocumentText } from 'react-icons/hi';
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOutSuccess } from "../redux/user/userSlice";
import { useSelector } from "react-redux";
import { MdOutlineMessage } from "react-icons/md";
import { MdOutlineDashboard } from "react-icons/md";

export default function DSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  },
    [location.search]);
  const signOut = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST'
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <Sidebar className="w-full md:w-56 shadow-md">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          <Link to='/dashboard?tab=profile'>
            <img src={currentUser.profilePicture} alt="user" className='flex mx-auto rounded-xl md:w-full md:h-full object-cover mb-3 shadow-md' />
            
           
            <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={currentUser.isAdmin ? 'Admin' : 'User'} labelColor='dark' as="div">
              Profile
            </Sidebar.Item>
          </Link>
          <Link to='/dashboard?tab=dash'>
            <Sidebar.Item active={tab === 'dash'} icon={MdOutlineDashboard} as="div">Dashboard</Sidebar.Item>
          </Link>
          {currentUser.isAdmin && (
            <Link to='/dashboard?tab=posts'>
              <Sidebar.Item active={tab === 'posts'} icon={HiDocumentText} as="div">Your Posts</Sidebar.Item>
            </Link>
          )}

          <Link to='/dashboard?tab=discussions'>
            <Sidebar.Item active={tab === 'discussions'} icon={MdOutlineMessage} as="div">Your Discussion</Sidebar.Item>
          </Link>

          <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer" onClick={signOut}>
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}
