import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsGithub } from "react-icons/bs";
// import { BsTwitter, BsDribbble} from "react-icons/bs";
import logo1 from '../assets/logo.png'


export default function FooterComponent() {
    return (
        <Footer container className="border border-t-8 border-red-400">
            <div className="w-full max-w-7xl mx-auto">
                <div className="grid w-full justify-between sm:flex md:grid-cols-1">
                    <div className="mt-5 mr-10">
                        <Link to="/" className='flex self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'>
                            <img src={logo1} alt="Logo" className=' h-10 w-auto mr-3' />
                            <span className='font-extrabold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400'>Our Children</span>

                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-3">
                        <div>
                            <Footer.Title title="About" />
                            <Footer.LinkGroup col>
                                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">Our Children</Footer.Link>
                                <Footer.Link href="/about" target="_blank" rel="noopener noreferrer">About Us</Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title="Follow Us" />
                            <Footer.LinkGroup col>
                                <Footer.Link href="https://github.com/NikiKostadinova/Our-Children-React-Project" target="_blank" rel="noopener noreferrer">Github</Footer.Link>
                                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">Facebook</Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title="Legal" />
                            <Footer.LinkGroup col>
                                <Footer.Link href="#" >Privacy Policy</Footer.Link>
                                <Footer.Link href="#" >Terms &amp; Conditions</Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                    </div>
                </div>
                <Footer.Divider />
                <div className="w-full sm:flex sm:items-center sm:justify-between">
                    <Footer.Copyright href="#" by="Our Children" year={new Date().getFullYear()} />
                    <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                        <Footer.Icon href="#" icon={BsFacebook}  className="hover:text-red-400 dark:hover:text-red-400"/>
                        <Footer.Icon href="#" icon={BsInstagram} className="hover:text-red-400 dark:hover:text-red-400" />
                        {/* <Footer.Icon href="#" icon={BsTwitter} /> */}
                        <Footer.Icon href="https://github.com/NikiKostadinova" icon={BsGithub} className="hover:text-red-400 dark:hover:text-red-400" />
                        {/* <Footer.Icon href="#" icon={BsDribbble} /> */}
                    </div>
                </div>
            </div>
        </Footer>
    )
}
