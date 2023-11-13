import { Link, Outlet } from 'react-router-dom';
import './sidebar.css';
import {
    FaSistrix,
    FaPlus,
    FaTh,
    FaArrowLeft,
    FaArrowRight,
    FaExclamationCircle
} from "react-icons/fa";

import { BiStats } from "react-icons/bi"

import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from 'react';

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

    const [collapse, setCollapse] = useState(false)

    const isCollapsed = useMediaQuery({ query : '(max-width: 900px)' })

    const handleCollapse = () =>{
        setCollapse(!collapse)
    }

    useEffect(()=>{
        if (isCollapsed){
            setCollapse(true)
        }
        else{
            setCollapse(false)
        }
    },[isCollapsed])
    
       return (
        <main className='d-flex h-100'>
            <div className={collapse ? 'sidebar collapse-sidebar': isCollapsed ? 'sidebar collapse-sidebar-expand' : 'sidebar'}>
                <ul className='sidebar-list fw-bold d-flex flex-column align-items-center p-0 my-0 ms-0'>

                    <li className='sidebar-item text-center d-flex justify-content-center align-items-center text-white' onClick={handleCollapse}>
                        {collapse ? <FaArrowRight /> : <FaArrowLeft />}
                    </li>
                    
                    {
                        menuItem.map((item, index) => (
                            <li className='sidebar-item text-center' key={index}>
                                <Link className='d-flex justify-content-start align-items-center' to={item.path}>
                                    <div className='sidebar-icons d-flex ms-4'>{item.icon}</div>
                                    <div className= {collapse ? 'collapse-label' : 'sidebar-label' + ' mx-2'}>{item.name}</div>
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