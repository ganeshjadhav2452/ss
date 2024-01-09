import "../../src/css/feather.css";
import "../../src/css/mdi/css/materialdesignicons.min.css";
import "../../src/css/ti-icons/css/themify-icons.css";
import "../../src/css/typicons/typicons.css";
import "../../src/css/simple-line-icons/css/simple-line-icons.css";
import "../../src/css/vendor.bundle.base.css";

import React, { useEffect, useState } from "react";
import "../css/select.dataTables.min.css";
import "../css/style.css";
import "../css/simple-line-icons/css/simple-line-icons.css";
import "../css/ti-icons/css/themify-icons.css";
import "../css/typicons/typicons.css";
import {
    logoLight,
    logoMini,
    logoMiniReverse,
    logoSvg,
    face2,
    face3,
    face4,
    face5,
    face1,
    face6,
    face7,
    face8,
    face9,
    face10,
    face12,
    logo,
} from "../constants/index";

import { useDispatch, useSelector } from "react-redux";
import { toggleSlidebarReducer } from "../store/slices/slidebar";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { updateUser } from "../store/slices/authSlice";

// let user = localStorage.getItem('adminUser')
// user = JSON.parse(user)
// console.log('this is user', user)
const NavBar = () => {
    const { toggle } = useSelector((state) => state.slidebar);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [openDropdown, setOpenDropdown] = useState(false);
    const [openMail, setOpenMail] = useState(false);
    const [openNotification, setOpenNotification] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const navigate = useNavigate()
    const toggleSlideBarHandler = () => {
        dispatch(toggleSlidebarReducer());
    };

    function greet() {
        const currentTime = new Date();
        const currentHour = currentTime.getHours();

        let greeting;

        if (currentHour >= 5 && currentHour < 12) {
            greeting = 'Good morning';
        } else if (currentHour >= 12 && currentHour < 18) {
            greeting = 'Good afternoon';
        } else {
            greeting = 'Good evening';
        }

        return greeting;
    }

    // Example usage:
    const message = greet();
    console.log(message);

    const logoutClickHandler = () => {
        localStorage.removeItem('adminToken')
        localStorage.removeItem('adminUser')
        toast.success('logout successfull')
        navigate('/admin/login')
    }

    useEffect(function () {
        let user = localStorage.getItem('adminUser')
        user = JSON.parse(user)
        const token = localStorage.getItem('adminToken')
        console.log('this is user and token', { ...user, token })

        dispatch(updateUser({ ...user, token }))
    }, [])
    return (
        <>
            {/* partial:partials/_navbar.html */}
            <nav className="navbar default-layout col-lg-12 col-12 p-0 fixed-top d-flex align-items-top flex-row mb-5">
                <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-start">
                    <div className="me-3">
                        <button
                            onClick={toggleSlideBarHandler}
                            className="navbar-toggler navbar-toggler align-self-center"
                            type="button"
                            data-bs-toggle="minimize"
                        >
                            <span className="icon-menu" />
                        </button>
                    </div>
                    <div>
                        <a className="navbar-brand brand-logo" href="index.html">
                            <img src={logo} alt="logo" />
                        </a>

                        <a className="navbar-brand brand-logo-mini" href="index.html">
                            <img src={'https://protecttravel.com/new/uploads/backend/logo/1479475920.png?id=1643'} alt="logo" />
                        </a>
                    </div>
                </div>
                <div className="navbar-menu-wrapper d-flex align-items-top">
                    <ul className="navbar-nav">
                        <li className="nav-item font-weight-semibold d-none d-lg-block ms-0">
                            <h1 className="welcome-text">
                                {message},
                                <span className="text-black fw-bold">{user?.name?.charAt(0).toUpperCase() + user?.name?.slice(1)}</span>
                            </h1>

                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item dropdown d-none d-lg-block">
                            <a
                                className="nav-link dropdown-bordered dropdown-toggle dropdown-toggle-split"
                                id="messageDropdown"
                                href="#"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                onClick={() => setOpenDropdown(!openDropdown)}
                            >
                                {" "}
                                Select Category{" "}
                            </a>
                            <div
                                className={`dropdown-menu dropdown-menu-right navbar-dropdown preview-list pb-0 ${openDropdown && "dropdown-visible"
                                    }`}
                                aria-labelledby="messageDropdown"
                            >
                                <a className="dropdown-item py-3">
                                    <p className="mb-0 font-weight-medium float-left">
                                        Select category
                                    </p>
                                </a>
                                <div className="dropdown-divider" />
                                <a className="dropdown-item preview-item">
                                    <div className="preview-item-content flex-grow py-2">
                                        <p className="preview-subject ellipsis font-weight-medium text-dark">
                                            Bootstrap Bundle{" "}
                                        </p>
                                        <p className="fw-light small-text mb-0">
                                            This is a Bundle featuring 16 unique dashboards
                                        </p>
                                    </div>
                                </a>
                                <a className="dropdown-item preview-item">
                                    <div className="preview-item-content flex-grow py-2">
                                        <p className="preview-subject ellipsis font-weight-medium text-dark">
                                            Angular Bundle
                                        </p>
                                        <p className="fw-light small-text mb-0">
                                            Everything you’ll ever need for your Angular projects
                                        </p>
                                    </div>
                                </a>
                                <a className="dropdown-item preview-item">
                                    <div className="preview-item-content flex-grow py-2">
                                        <p className="preview-subject ellipsis font-weight-medium text-dark">
                                            VUE Bundle
                                        </p>
                                        <p className="fw-light small-text mb-0">
                                            Bundle of 6 Premium Vue Admin Dashboard
                                        </p>
                                    </div>
                                </a>
                                <a className="dropdown-item preview-item">
                                    <div className="preview-item-content flex-grow py-2">
                                        <p className="preview-subject ellipsis font-weight-medium text-dark">
                                            React Bundle
                                        </p>
                                        <p className="fw-light small-text mb-0">
                                            Bundle of 8 Premium React Admin Dashboard
                                        </p>
                                    </div>
                                </a>
                            </div>
                        </li>
                        <li className="nav-item d-none d-lg-block">
                            <div
                                id={`datepicker-popup`}
                                className="input-group date datepicker navbar-date-picker "
                            >
                                <span className="input-group-addon input-group-prepend border-right">
                                    <span className="icon-calendar input-group-text calendar-icon" />
                                </span>
                                <input type="text" className="form-control" />
                            </div>
                        </li>
                        <li className="nav-item">
                            <form className="search-form" action="#">
                                <i className="icon-search" />
                                <input
                                    type="search"
                                    className="form-control"
                                    placeholder="Search Here"
                                    title="Search here"
                                />
                            </form>
                        </li>
                        <li className="nav-item dropdown ">
                            <a
                                className="nav-link count-indicator"
                                id="notificationDropdown"
                                href="#"
                                data-bs-toggle="dropdown"
                                onClick={() => setOpenMail(!openMail)}
                            >
                                <i className="icon-mail icon-lg" />
                            </a>
                            <div
                                className={`dropdown-menu dropdown-menu-right navbar-dropdown preview-list pb-0 ${openMail && "dropdown-visible"
                                    }`}
                                aria-labelledby="notificationDropdown"
                            >
                                <a className="dropdown-item py-3 border-bottom">
                                    <p className="mb-0 font-weight-medium float-left">
                                        You have 4 new notifications{" "}
                                    </p>
                                    <span className="badge badge-pill badge-primary float-right">
                                        View all
                                    </span>
                                </a>
                                <a className="dropdown-item preview-item py-3">
                                    <div className="preview-thumbnail">
                                        <i className="mdi mdi-alert m-auto text-primary" />
                                    </div>
                                    <div className="preview-item-content">
                                        <h6 className="preview-subject fw-normal text-dark mb-1">
                                            Application Error
                                        </h6>
                                        <p className="fw-light small-text mb-0"> Just now </p>
                                    </div>
                                </a>
                                <a className="dropdown-item preview-item py-3">
                                    <div className="preview-thumbnail">
                                        <i className="mdi mdi-settings m-auto text-primary" />
                                    </div>
                                    <div className="preview-item-content">
                                        <h6 className="preview-subject fw-normal text-dark mb-1">
                                            Settings
                                        </h6>
                                        <p className="fw-light small-text mb-0">
                                            {" "}
                                            Private message{" "}
                                        </p>
                                    </div>
                                </a>
                                <a className="dropdown-item preview-item py-3">
                                    <div className="preview-thumbnail">
                                        <i className="mdi mdi-airballoon m-auto text-primary" />
                                    </div>
                                    <div className="preview-item-content">
                                        <h6 className="preview-subject fw-normal text-dark mb-1">
                                            New user registration
                                        </h6>
                                        <p className="fw-light small-text mb-0"> 2 days ago </p>
                                    </div>
                                </a>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link count-indicator"
                                id="countDropdown"
                                href="#"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                onClick={() => setOpenNotification(!openNotification)}
                            >
                                <i className="icon-bell" />
                                <span className="count" />
                            </a>
                            <div
                                className={`dropdown-menu dropdown-menu-right navbar-dropdown preview-list pb-0 ${openNotification && "dropdown-visible"
                                    }`}
                                aria-labelledby="countDropdown"
                            >
                                <a className="dropdown-item py-3">
                                    <p className="mb-0 font-weight-medium float-left">
                                        You have 7 unread mails{" "}
                                    </p>
                                    <span className="badge badge-pill badge-primary float-right">
                                        View all
                                    </span>
                                </a>
                                <div className="dropdown-divider" />
                                <a className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <img
                                            src={face10}
                                            alt="image"
                                            className="img-sm profile-pic"
                                        />
                                    </div>
                                    <div className="preview-item-content flex-grow py-2">
                                        <p className="preview-subject ellipsis font-weight-medium text-dark">
                                            Marian Garner{" "}
                                        </p>
                                        <p className="fw-light small-text mb-0">
                                            {" "}
                                            The meeting is cancelled{" "}
                                        </p>
                                    </div>
                                </a>
                                <a className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <img
                                            src={face12}
                                            alt="image"
                                            className="img-sm profile-pic"
                                        />
                                    </div>
                                    <div className="preview-item-content flex-grow py-2">
                                        <p className="preview-subject ellipsis font-weight-medium text-dark">
                                            David Grey{" "}
                                        </p>
                                        <p className="fw-light small-text mb-0">
                                            {" "}
                                            The meeting is cancelled{" "}
                                        </p>
                                    </div>
                                </a>
                                <a className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <img
                                            src={face1}
                                            alt="image"
                                            className="img-sm profile-pic"
                                        />
                                    </div>
                                    <div className="preview-item-content flex-grow py-2">
                                        <p className="preview-subject ellipsis font-weight-medium text-dark">
                                            Travis Jenkins{" "}
                                        </p>
                                        <p className="fw-light small-text mb-0">
                                            {" "}
                                            The meeting is cancelled{" "}
                                        </p>
                                    </div>
                                </a>
                            </div>
                        </li>
                        <li className="nav-item dropdown d-none d-lg-block user-dropdown">
                            <a
                                className="nav-link"
                                id="UserDropdown"
                                href="#"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <img
                                    className="img-xs rounded-circle"
                                    src={face12}
                                    alt="Profile image"
                                    onClick={() => setOpenProfile(!openProfile)}
                                />{" "}
                            </a>
                            <div
                                className={`dropdown-menu dropdown-menu-right navbar-dropdown ${openProfile && "dropdown-visible"
                                    }`}
                                aria-labelledby="UserDropdown"
                            >
                                <div className="dropdown-header text-center">
                                    <img
                                        className="img-md rounded-circle"
                                        src={face8}
                                        alt="Profile image"
                                    />
                                    <p className="mb-1 mt-3 font-weight-semibold">
                                        {user?.name?.charAt(0).toUpperCase() + user?.name?.slice(1)}
                                    </p>
                                    <p className="fw-light text-muted mb-0">
                                        {user?.email}
                                    </p>
                                </div>
                                <Link to={"/admin/manage-staff"} className="dropdown-item">
                                    <i className="dropdown-item-icon mdi mdi-account-outline text-primary me-2" />
                                    Staff
                                    <span className="badge badge-pill badge-danger">1</span>
                                </Link>
                                <Link to={"/admin/credentials"} className="dropdown-item">
                                    <i className="dropdown-item-icon mdi mdi-message-text-outline text-primary me-2" />{" "}
                                    Credentials
                                </Link>
                                <Link to={"/admin/settings"} className="dropdown-item">
                                    <i className="dropdown-item-icon mdi mdi-calendar-check-outline text-primary me-2" />{" "}
                                    Settings
                                </Link>

                                <p onClick={logoutClickHandler} className="dropdown-item">
                                    <i className="dropdown-item-icon mdi mdi-power text-primary me-2" />
                                    Sign Out
                                </p>
                            </div>
                        </li>
                    </ul>
                    <button
                        onClick={toggleSlideBarHandler}
                        className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
                        type="button"
                        data-bs-toggle="offcanvas"
                    >
                        <span className="mdi mdi-menu" />
                    </button>
                </div>
            </nav>
        </>
    )
}

export default NavBar