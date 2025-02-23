import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/reducers/authSlice';
import { useNavigate } from 'react-router-dom';
import style from './navbar.module.scss';
import { RxDashboard } from "react-icons/rx";
import { FaRegHeart, FaRegUserCircle } from "react-icons/fa";
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.user);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    const handleRedirectToWishlist = () => {
        if (!user) {
            alert("You need to be logged in to access the wishlist.");
            navigate('/login');
        } else {
            navigate('/wishlist');
        }
    };

    const handleRedirectToDashboard = () => {
        if (!user) {
            alert("You need to be logged in to access the dashboard.");
            navigate('/login');
        } else {
            const enteredPassword = prompt("Please enter the password to access the Dashboard:");
            
            const correctPassword = "ziko135"; 

            if (enteredPassword === correctPassword) {
                navigate('/admin'); 
            } else {
                alert("Incorrect password! Please try again.");
            }
        }
    };



    const username = user && user.otherDetails ? user.otherDetails.username : 'User';  

    return (
        <div className={style.navbar}>
            <div className={style.navs}>
                <div className={style.logo} onClick={() => navigate('/')} >
                    <img
                        src="https://avatars.mds.yandex.net/i?id=ea1393619b18a08d766c8a4bcc8a2ec23d4b6e9e-10476199-images-thumbs&n=13"
                        alt="Logo"
                    />
                    <p>ReserveGo</p>
                </div>
                <div className={style.login}>
                    <li>
                        <FaRegHeart />
                        <button onClick={handleRedirectToWishlist}>Favorites</button>
                    </li>
                    <li>
                        <RxDashboard />
                        <button onClick={handleRedirectToDashboard}>Dashboard</button>
                    </li>
                  

                    {user ? (
                        <div className={style.userSection}>
                            <p className={style.welcomeText}>
                                Welcome, {username}!
                            </p>
                            <button onClick={handleLogout} className={style.logoutBtn}>Logout</button>
                        </div>
                    ) : (
                        <button onClick={() => navigate('/login')} className={style.loginBtn}>
                            <FaRegUserCircle /><p>Login</p>
                        </button>
                    )}
                </div>

                <div className={style.burger}>
                    <li className={style.toggle} onClick={() => setIsOpen(!isOpen)}>
                        <RxHamburgerMenu />
                    </li>
                    <Drawer open={isOpen} onClose={() => setIsOpen(false)} direction='right'>
                        <div className={style.burgerMenu}>
                            <li>
                                <FaRegHeart />
                                <button onClick={handleRedirectToWishlist}>Favorites</button>
                            </li>
                            <li>
                                <RxDashboard />
                                <button onClick={handleRedirectToDashboard}>Dashboard</button>
                            </li>
                            
                            {user ? (
                                <div className={style.userSection}>
                                    <p><FaRegUserCircle />Welcome, {username}!</p>
                                    <button onClick={handleLogout}>Logout</button>
                                </div>
                            ) : (
                                <button onClick={() => navigate('/login')}>
                                    <FaRegUserCircle /><p>Login</p>
                                </button>
                            )}
                        </div>
                    </Drawer>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
