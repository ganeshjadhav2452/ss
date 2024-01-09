import React, { useState } from 'react'
import NavBar from '../../../components/NavBar'
import Slidebar from '../../../components/Slidebar'
import ManageManualPlans from '../../../components/admin/plans/ManageManualPlans'
import AddManualPlan from '../../../components/admin/plans/AddManualPlan'

const ManualPlans = () => {
    const [activeTab, setActiveTab] = useState("manage-manual-plans");


    const activeSelectChangeHandler = (e) => {
        setActiveTab(e.target.value)


    }

    const handleTabUpdate = (tabNmae) => {
        setActiveTab(tabNmae);
    };
    return (
        <>
            <div className="container-scroller " style={{
                backgroundColor: "rgb(244,245,247)"
            }}>
                <NavBar />

                <div className="container-fluid page-body-wrapper">

                    <Slidebar />

                    <div className="main-panel col ">
                        <div className="content-wrapper ">
                            <div className="d-flex justify-content-center m-1 row">
                                <nav className="navbar  rounded rounded-2 navbar-expand-lg navbar-light  bg-light row col-lg-12  ">
                                    <div
                                        className="collapse navbar-collapse d-flex justify-content-start "
                                        id="navbarSupportedContent fw-bold"
                                    >
                                        <ul className="navbar-nav mr-auto d-flex justify-content-around justify-content-center">
                                            <li
                                                className="nav-item "
                                                onClick={() => handleTabUpdate("manage-manual-plans")}
                                                name="manage-manual-plans"
                                            >
                                                <p
                                                    className={`nav-link btn border border-dark m-1 fw-bold ${activeTab == "manage-manual-plans" && "btn-success text-light"
                                                        }`}
                                                    name="manage-manual-plans"
                                                >
                                                    Manage Manual Plans
                                                </p>
                                            </li>
                                            <li
                                                className="nav-item "
                                                onClick={() => handleTabUpdate("add-manual-plan")}
                                                name="site-settings"
                                            >
                                                <p
                                                    className={`nav-link btn border border-dark m-1 fw-bold ${activeTab == "add-manual-plan" && "btn-success text-light "
                                                        }`}
                                                    name="add-manual-plan"
                                                >
                                                    Add Company
                                                </p>
                                            </li>


                                            <li className="nav-item flex-end ">
                                                <select
                                                    className=" rounded rounded-4 form-select form-select-sm m-1 "
                                                    aria-label=".form-select-lg example"

                                                    onChange={activeSelectChangeHandler}
                                                >
                                                    <option value={"3"}>All</option>
                                                    <option value="1">Active</option>
                                                    <option value="0">Inactive</option>

                                                </select>
                                            </li>
                                        </ul>
                                    </div>
                                </nav>
                            </div>

                            <div className='row'>
                                {
                                    activeTab === 'manage-manual-plans' && <ManageManualPlans />
                                }
                                {
                                    activeTab === 'add-manual-plan' && <AddManualPlan />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ManualPlans