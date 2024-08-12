import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';


import Dashboard from './pages/Dashboard';
import Forum from './pages/Forum';
import Header from './components/Header';
import FooterComponent from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import AddPost from './pages/AddPost';
import EditPost from './pages/EditPost';
import Post from './pages/Post';
import TopOfThePage from './components/TopOfThePage';
import StartDiscussion from './pages/StartDiscussion';
import Discussion from './pages/Discussion';
import DiscussionsByCategory from './pages/DiscussionsByCategory';
import EditDiscussion from './pages/EditDiscussion';
import AllPosts from './pages/AllPosts';
import PostByCategory from './pages/PostsByCategory';
import Register from './pages/Register';
import LogIn from './pages/LogIn';
import ContactUs from './pages/ContactUs';





export default function App() {
  return (
    <BrowserRouter>
    <TopOfThePage />
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />        
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-discussion" element={<StartDiscussion />} />
          <Route path='/edit-discussion/:discussionId' element={< EditDiscussion />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/add-new-post" element={<AddPost />} />
          <Route path="/edit-post/:postId" element={<EditPost />} />

        </Route>
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/allposts" element={<AllPosts />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/post/:postSlug" element={<Post />} />
        <Route path="/discussions" element={<DiscussionsByCategory />} />
        <Route path="/posts" element={<PostByCategory />} />
        <Route path="/discussion/:discussionSlug" element={<Discussion />} />


      </Routes>
      <FooterComponent />

    </BrowserRouter>
  )
}