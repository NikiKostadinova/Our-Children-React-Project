import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react';
// import {TextInput } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
// import { AiOutlineSearch } from 'react-icons/ai';
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
  const { theme } =useSelector((state) => state.theme);
  const navigate = useNavigate();
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
          navigate('/sign-in');
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
      {/* <form >
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='grey' pill>
        <AiOutlineSearch />
      </Button> */}
      <div className='flex gap-1 md:order-2'>
        <Button className='w-20 h-10 sm:inline' color='grey' pill onClick={() => dispatch(toggleTheme())}>
        {theme === 'light' ? <FaMoon /> : <FaSun />}
        </Button>
        {currentUser ? (
          <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt='user' img={currentUser.profilePicture} rounded/>
          }>
           <Dropdown.Header>
            <span className='block text-sm'>{currentUser.username}</span>
           </Dropdown.Header>
           <Link to={'/dashboard?tab=profile'}>
           <Dropdown.Item>Profile</Dropdown.Item>
           </Link>
           <Dropdown.Divider />
           <Dropdown.Item onClick={signOut}>Sign Out</Dropdown.Item>
          </Dropdown>
        ) :
          (
            <Link to='/sign-in'>
              <Button gradientDuoTone='pinkToOrange' outline>Sign In</Button>
            </Link>
          )
        }

        <Navbar.Toggle />
      </div >
      <Navbar.Collapse>
        <Navbar.Link active={path === '/'} as={'div'}>
          <Link to='/' className="nav-link">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/about'} as={'div'}>
          <Link to='/about' className="nav-link">About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/projects'} as={'div'}>
          <Link to='/projects' className="nav-link">Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar >
  )
}
