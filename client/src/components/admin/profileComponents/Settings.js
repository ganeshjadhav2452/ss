import React, { useState } from 'react'
import Slidebar from '../../Slidebar';
import NavBar from '../../NavBar';
import SiteSettings from './SiteSettings';
import ManageStates from './ManageStates';
import ChangeLogo from './ChangeLogo';
import Twilio from './Twilio';
import FlightStats from './FlightStats';
import CheckNumber from './CheckNumber';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('site-settings')

    const handleTabUpdate = (tabname) => {
        console.log('this is name', tabname)
        setActiveTab(tabname)
    }
    return (
        <div className="container-scroller  " style={{ backgroundColor: 'rgb(244,245,247)' }}>
            <NavBar />

            <div className="container-fluid page-body-wrapper ">

                <Slidebar />

                <div className="main-panel col d-flex align-items-center w-100" >
                    <div className="content-wrapper d-flex flex-column align-items-center ">
                        <nav className="navbar border rounded rounded-2 navbar-expand-lg navbar-light  bg-light row col-lg-10 ">


                            <div className="collapse navbar-collapse d-flex justify-content-around" id="navbarSupportedContent fw-bold">
                                <ul className="navbar-nav mr-auto d-flex justify-content-around">
                                    <li className="nav-item " onClick={() => handleTabUpdate('site-settings')} name="site-settings">
                                        <p className={`nav-link btn border border-dark m-1 ${activeTab == 'site-settings' && 'btn-success'}`} name="site-settings">
                                            Site Settings
                                        </p>
                                    </li>
                                    <li className="nav-item" onClick={() => handleTabUpdate('manage-state')} name="manage-state">
                                        <p className={`nav-link btn border border-dark m-1 ${activeTab == 'manage-state' && 'btn-success'}`} name="manage-state">
                                            Manage State
                                        </p>
                                    </li>
                                    <li className="nav-item" onClick={() => handleTabUpdate('change-logo')} name="change-logo">
                                        <p className={`nav-link btn border border-dark m-1 ${activeTab == 'change-logo' && 'btn-success'}`} name="change-logo">
                                            Change Logo
                                        </p>
                                    </li>
                                    <li className="nav-item" onClick={() => handleTabUpdate('twilio')} name="twilio">
                                        <p className=
                                            {`nav-link btn border border-dark m-1 ${activeTab == 'twilio' && 'btn-success'}`}>
                                            Twilio
                                        </p>
                                    </li>
                                    <li className="nav-item" onClick={() => handleTabUpdate('flight-stats')} name="flight-stats">
                                        <p className={`nav-link btn border border-dark m-1 ${activeTab == 'flight-stats' && 'btn-success'}`} name="flight-stats">
                                            Flight Stats
                                        </p>
                                    </li>
                                    <li className="nav-item" onClick={() => handleTabUpdate('check-number')} name="check-number">
                                        <p className={`nav-link btn border border-dark m-1 ${activeTab == 'check-number' && 'btn-success'}`} name="check-number">
                                            Check Number
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </nav>


                        {activeTab === 'site-settings' && (
                            <SiteSettings />

                        )}

                        {
                            activeTab === 'manage-state' && (
                                <ManageStates />
                            )
                        }
                        {
                            activeTab === 'change-logo' && (
                                <ChangeLogo />
                            )
                        }
                        {
                            activeTab === 'twilio' && (
                                <Twilio />
                            )
                        }
                        {
                            activeTab === 'flight-stats' && (
                                <FlightStats />
                            )
                        }
                        {
                            activeTab === 'check-number' && (
                                <CheckNumber />
                            )
                        }

                    </div>

                </div>
            </div>
        </div>
    );
}

export default Settings