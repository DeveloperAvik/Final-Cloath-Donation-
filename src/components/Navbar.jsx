import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";

function Navbar() {
    const { user, logOut } = useContext(AuthContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="flex justify-between items-center p-4">
            <div className="text-xl font-bold text-gray-800 hidden sm:block">
                ClothingKind
            </div>

            <div className="hidden md:flex sm:hidden space-x-5">
                <Link to="/" className="text-gray-600 hover:text-cyan-600">Home</Link>
                <Link to="/works" className="text-gray-600 hover:text-cyan-600">Our Works</Link>
                <Link to="/vision" className="text-gray-600 hover:text-cyan-600">Our Vision</Link>
                <Link to="/contactus" className="text-gray-600 hover:text-cyan-600">Contact Us</Link>
                {user && (
                    <Link to="/dashboard" className="text-gray-600 hover:text-cyan-600">Dashboard</Link>
                )}
            </div>

            <div className="md:hidden flex items-center">
                <button className="text-gray-600 hover:text-cyan-600" onClick={toggleMenu}>
                    <i className={`fas fa-bars text-2xl ${isMobileMenuOpen ? 'text-cyan-600' : 'text-gray-600'}`}></i>
                </button>
            </div>

            <div className="flex gap-2 items-center">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="User Avatar"
                                    src={user.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <Link to="/dashboard"><a>Profile</a></Link>
                            </li>
                            <li><Link to="/dashboard"><a>Settings</a></Link></li>
                            <li>
                                <button onClick={logOut} className="w-full text-left">Logout</button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <Link to="/auth/login" className="btn btn-neutral rounded-lg">
                        Login
                    </Link>
                )}
            </div>

            <div className={`md:hidden fixed inset-0 bg-white bg-opacity-90 z-50 ${isMobileMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
                <div className="flex flex-col items-center py-8 space-y-4">
                    <Link to="/" className="text-gray-600 hover:text-cyan-600" onClick={toggleMenu}>Home</Link>
                    <Link to="/about" className="text-gray-600 hover:text-cyan-600" onClick={toggleMenu}>About</Link>
                    <Link to="/works" className="text-gray-600 hover:text-cyan-600" onClick={toggleMenu}>Our Works</Link>
                    <Link to="/vision" className="text-gray-600 hover:text-cyan-600" onClick={toggleMenu}>Our Vision</Link>
                    <Link to="/contactus" className="text-gray-600 hover:text-cyan-600" onClick={toggleMenu}>Contact Us</Link>
                    {user && (
                        <Link to="/dashboard" className="text-gray-600 hover:text-cyan-600" onClick={toggleMenu}>Dashboard</Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
