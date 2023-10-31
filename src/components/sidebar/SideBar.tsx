import { Link, Outlet } from 'react-router-dom';
import './sidebar.css';
import {
    FaSistrix,
    FaPlus,
    FaTh,
    FaBars,
    FaArrowLeft,
    FaExclamationCircle
} from "react-icons/fa";

import { BiStats } from "react-icons/bi"

export default function SideBar() {
    const menuItem = [
        {
            path: "/",
            name: "Detect",
            icon: <BiStats />
        },
        {
            path: "/add",
            name: "Add New",
            icon: <FaPlus />
        },
        {
            path: "/view",
            name: "View",
            icon: <FaSistrix />
        },
        {
            path: "/records",
            name: "Records",
            icon: <FaTh />
        },
        {
            path: "/about",
            name: "About",
            icon: <FaExclamationCircle />
        },
    ]

    return (
        <main className='d-flex h-100'>
            <div className='sidebar pt-1'>
                <ul className='sidebar-list fw-bold d-flex flex-column align-items-center p-0 my-0 ms-0'>
                    <li className='sidebar-item text-center d-flex justify-content-center align-items-center text-white'>
                        <FaArrowLeft />
                    </li>
                    {
                        menuItem.map((item, index) => (
                            <li className='sidebar-item text-center' key={index}>
                                <Link className='d-flex justify-content-start align-items-center' to={item.path}>
                                    <div className='sidebar-icons d-flex ms-4'>{item.icon}</div>
                                    <div className='sidebar-label mx-2'>{item.name}</div>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>

            <Outlet />
        </main>
    );
}