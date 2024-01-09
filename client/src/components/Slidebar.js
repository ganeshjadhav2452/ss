import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import '../css/style.css'
import { Link } from 'react-router-dom'
const Slidebar = () => {
    const { toggle } = useSelector((state) => state.slidebar)
    const [activeTab, setActiveTab] = useState('')
    console.log(toggle)
    return (
        <>
            <nav className={` h-100 sidebar sidebar-offcanvas ${!toggle && 'sidebar-close'}`} id="sidebar" style={{
                height: '100vh',

            }}>
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/dashboard">
                            <i className="mdi mdi-grid-large menu-icon" />
                            {toggle && <span className="menu-title">Dashboard</span>}
                        </Link>
                    </li>

                    <li className="nav-item">
                        <a
                            className="nav-link"
                            data-bs-toggle="collapse"
                            href="#ui-basic"
                            aria-expanded="false"
                            aria-controls="ui-basic"
                        >
                            <i className="menu-icon mdi mdi-floor-plan" />
                            {toggle && <span className="menu-title">Plans</span>
                            }                            <i className="menu-arrow" />
                        </a>
                        <div className="collapse" id="ui-basic">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item">
                                    {" "}
                                    <Link className="nav-link" to="/admin/manual-plans">
                                        Manual Plans
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    {" "}
                                    <Link className="nav-link" to="/admin/api-plans">
                                        API Plans
                                    </Link>
                                </li>

                            </ul>
                        </div>
                    </li>
                    <li className="nav-item">
                        <Link
                            className="nav-link"

                            to="/admin/companies"
                            aria-expanded="false"

                        >
                            <i className="menu-icon mdi mdi-chart-line" />
                            {toggle && <span className="menu-title">Companies</span>}

                        </Link>

                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            data-bs-toggle="collapse"
                            href="#form-elements"
                            aria-expanded="false"
                            aria-controls="form-elements"
                        >
                            <i className="menu-icon mdi mdi-card-text-outline" />
                            {toggle && <span className="menu-title">Commission</span>}
                            <i className="menu-arrow" />
                        </a>
                        <div className="collapse" id="form-elements">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin/commission-received-reports">
                                        Commission Received Reports
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin/paid-commission-reports">
                                        Paid Commission Reports
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item">
                        <Link
                            className="nav-link"

                            to="/admin/affiliates"
                            aria-expanded="false"

                        >
                            <i className="menu-icon mdi mdi-chart-line" />
                            {toggle && <span className="menu-title">Affiliates</span>}

                        </Link>

                    </li>
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            data-bs-toggle="collapse"
                            to="/admin/bookings"
                            aria-expanded="false"
                            aria-controls="tables"
                        >
                            <i className="menu-icon mdi mdi-table" />
                            {toggle && <span className="menu-title">Bookings</span>}

                        </Link>

                    </li>
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            data-bs-toggle="collapse"
                            to="/admin/quotes"
                            aria-expanded="false"
                            aria-controls="icons"
                        >
                            <i className="menu-icon mdi mdi-layers-outline" />
                            {toggle && <span className="menu-title">Quotes</span>}

                        </Link>

                    </li>
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            data-bs-toggle="collapse"
                            to="/admin/messaging"
                            aria-expanded="false"
                            aria-controls="icons"
                        >
                            <i class="mdi mdi-message-outline" style={{
                                fontSize: '20px',
                                marginRight: '1rem',
                                color: ' rgb(72,72,72)'
                            }}></i>

                            {toggle && <span className="menu-title">Messaging</span>}

                        </Link>

                    </li>
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            data-bs-toggle="collapse"
                            to="/admin/logins"
                            aria-expanded="false"
                            aria-controls="icons"
                        >

                            <i className="menu-icon mdi mdi-account-box-outline" />
                            {toggle && <span className="menu-title">Logins</span>}

                        </Link>

                    </li>
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            data-bs-toggle="collapse"
                            to="/admin/blogs"
                            aria-expanded="false"
                            aria-controls="icons"
                        >
                            <i class="mdi mdi-file-document-outline" style={{
                                fontSize: '20px',
                                marginRight: '1rem',
                                color: ' rgb(72,72,72)'
                            }} ></i>


                            {toggle && <span className="menu-title">Blogs</span>}

                        </Link>

                    </li>
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            data-bs-toggle="collapse"
                            to="/admin/contact-queries"
                            aria-expanded="false"
                            aria-controls="icons"
                        >
                            <i class="mdi mdi-database-search-outline" style={{
                                fontSize: '20px',
                                marginRight: '1rem',
                                color: ' rgb(72,72,72)'
                            }}></i>

                            {toggle && <span className="menu-title">Contact Queries</span>}

                        </Link>

                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            data-bs-toggle="collapse"
                            href="#form-elements"
                            aria-expanded="false"
                            aria-controls="form-elements"
                        >
                            <i className="menu-icon mdi mdi-card-text-outline" />


                            {toggle && <span className="menu-title">Reports</span>}
                            <i className="menu-arrow" />
                        </a>
                        <div className="collapse" id="form-elements">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin/visitor-reports">
                                        Visiotor Reports
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin/contries-to-which-people-are-quoting">
                                        Contries To Which People are quoting
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin/contries-to-which-people-are-traveling">
                                        Contries To Which People are Traveling
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin/report-for-quote">
                                        Are Report For Quote
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin/report-for-purchase">
                                        Are Report For Purchase
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>

                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            data-bs-toggle="collapse"
                            to="/admin/contacts"
                            aria-expanded="false"
                            aria-controls="auth"
                        >
                            <i className="menu-icon mdi mdi-account-circle-outline" />

                            {toggle && <span className="menu-title">Contacts</span>}

                        </Link>

                    </li>

                    <li className="nav-item">
                        <a
                            className="nav-link"
                            data-bs-toggle="collapse"
                            href="#auth"
                            aria-expanded="false"
                            aria-controls="auth"
                        >

                            <i class="mdi mdi-login" style={{
                                fontSize: '20px',
                                marginRight: '1rem',
                                color: ' rgb(72,72,72)'
                            }}></i>
                            {toggle && <span className="menu-title">Logout</span>}

                        </a>

                    </li>

                </ul>
            </nav>
        </>
    )
}

export default Slidebar