import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react';

import { Link, useLocation } from 'react-router-dom';

import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signOutSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import logo1 from '../assets/logo.png'


export default function Header() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);
  const { theme } = useSelector((state) => state.theme);
  const navigate = useNavigate();
  const logOut = async () => {
    try {
      const res = await fetch('/api/user/logout', {
        method: 'POST'
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
        navigate('/login');
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <Navbar className='border-b-2 p-4 flex justify-between items-center'>
      <Link to="/" className='flex self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <img src={logo1} alt="Logo" className=' h-10 w-auto mr-3' />
        <span className='hidden sm:inline font-extrabold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400 '>Our Children</span>

      </Link>

      <div className='flex gap-1 md:order-2'>
        <Button className='w-20 h-10 sm:inline' color='grey' pill onClick={() => dispatch(toggleTheme())}>
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt='user' img={currentUser.profilePicture} rounded />
            }>
            <Dropdown.Header>
              <span className='block text-sm'>{currentUser.username}</span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=dash'}>
              <Dropdown.Item>Dashboard</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={logOut}>Log Out</Dropdown.Item>
          </Dropdown>
        ) :
          (
            <Link to='/login'>
              <Button gradientDuoTone='pinkToOrange' outline>Login</Button>
            </Link>
          )
        }

        <Navbar.Toggle />
      </div >
      <Navbar.Collapse>
        <Link to='/' className="nav-link">
          <Navbar.Link active={path === '/'} as={'div'} className={`${path === '/' ? 'bg-red-300 text-white dark:bg-red-400 ' : 'text-gray-700 dark:text-gray-300'} py-2 px-4 rounded-md`}>
            Home
          </Navbar.Link>
        </Link>
        <Link to='/about' className="nav-link">
          <Navbar.Link active={path === '/about'} as={'div'} className={`${path === '/about' ? 'bg-red-300 text-white dark:bg-red-400 ' : 'text-gray-700 dark:text-gray-300'} py-2 px-4 rounded-md`}>
            About
          </Navbar.Link>
        </Link>
        <Link to='/allposts' className="nav-link">
          <Navbar.Link active={path === '/allposts'}  as={'div'} className={`${path === '/allposts' ? 'bg-red-300 text-white dark:bg-red-400 ' : 'text-gray-700 dark:text-gray-300'} py-2 px-4 rounded-md`} >
            Posts
          </Navbar.Link>
        </Link>
        <Link to='/forum' className="nav-link">
          <Navbar.Link active={path === '/forum'} as={'div'} className={`${path === '/forum' ? 'bg-red-300 text-white dark:bg-red-400 ' : 'text-gray-700 dark:text-gray-300'} py-2 px-4 rounded-md`}>
            Forum
          </Navbar.Link>
        </Link>
      </Navbar.Collapse>
    </Navbar >
  )
}
