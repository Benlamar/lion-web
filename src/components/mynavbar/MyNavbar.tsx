import { IconContext } from 'react-icons';
import { Link, Outlet } from 'react-router-dom'


import * as FaIcons from "react-icons/fa";
import './mynavbar.css';

export default function MyNavbar() {
    return (
        <>
            <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
                <div className='container-fluid'>
                    {/* <button className='sidebar-btn' type="button">
                    <FaIcons.FaBars/>
                </button> */}

                    <Link className="navbar-brand" to="/">Navbar</Link>
                </div>
            </nav>
            <Outlet />
        </>
    );
}