import "../../src/css/feather.css";
import "../../src/css/mdi/css/materialdesignicons.min.css";
import "../../src/css/ti-icons/css/themify-icons.css";
import "../../src/css/typicons/typicons.css";
import "../../src/css/simple-line-icons/css/simple-line-icons.css";
import "../../src/css/vendor.bundle.base.css";

import React, { useState } from "react";
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
} from "../constants/index";
import Slidebar from "../components/Slidebar";
import Statistics from "../components/dashboard/Statistics";
import OverviewGraph from "../components/dashboard/OverviewGraph";
import PendingRequests from "../components/dashboard/PendingRequests";
import RecentEvents from "../components/dashboard/RecentEvents";
import Activities from "../components/dashboard/Activities";
import Todos from "../components/dashboard/Todos";
import TypeOfAmount from "../components/dashboard/TypeOfAmount";
import LeaveReports from "../components/dashboard/LeaveReports";
import Leaderboard from "../components/dashboard/Leaderboard";
import { useDispatch, useSelector } from "react-redux";
import { toggleSlidebarReducer } from "../store/slices/slidebar";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

const Dashboard = () => {
  const { toggle } = useSelector((state) => state.slidebar);
  const dispatch = useDispatch();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openMail, setOpenMail] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const toggleSlideBarHandler = () => {
    dispatch(toggleSlidebarReducer());
  };
  return (
    <div>
      &lt;&gt;
      <div className="container-scroller">
        <NavBar />
        {/* partial */}
        <div
          className="container-fluid page-body-wrapper"
          style={{
            backgroundColor: "rgb(244,245,247)",
          }}
        >
          <Slidebar />

          {/* partial:partials/_settings-panel.html */}
          <div className="theme-setting-wrapper">
            <div id="settings-trigger">
              <i className="ti-settings" />
            </div>
            <div id="theme-settings" className="settings-panel">
              <i className="settings-close ti-close" />
              <p className="settings-heading">SIDEBAR SKINS</p>
              <div
                className="sidebar-bg-options selected"
                id="sidebar-light-theme"
              >
                <div className="img-ss rounded-circle bg-light border me-3" />
                Light
              </div>
              <div className="sidebar-bg-options" id="sidebar-dark-theme">
                <div className="img-ss rounded-circle bg-dark border me-3" />
                Dark
              </div>
              <p className="settings-heading mt-2">HEADER SKINS</p>
              <div className="color-tiles mx-0 px-4">
                <div className="tiles success" />
                <div className="tiles warning" />
                <div className="tiles danger" />
                <div className="tiles info" />
                <div className="tiles dark" />
                <div className="tiles default" />
              </div>
            </div>
          </div>
          <div id="right-sidebar" className="settings-panel">
            <i className="settings-close ti-close" />
            <ul
              className="nav nav-tabs border-top"
              id="setting-panel"
              role="tablist"
            >
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="todo-tab"
                  data-bs-toggle="tab"
                  href="#todo-section"
                  role="tab"
                  aria-controls="todo-section"
                  aria-expanded="true"
                >
                  TO DO LIST
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="chats-tab"
                  data-bs-toggle="tab"
                  href="#chats-section"
                  role="tab"
                  aria-controls="chats-section"
                >
                  CHATS
                </a>
              </li>
            </ul>
            <div className="tab-content" id="setting-content">
              <div
                className="tab-pane fade show active scroll-wrapper"
                id="todo-section"
                role="tabpanel"
                aria-labelledby="todo-section"
              >
                <div className="add-items d-flex px-3 mb-0">
                  <form className="form w-100">
                    <div className="form-group d-flex">
                      <input
                        type="text"
                        className="form-control todo-list-input"
                        placeholder="Add To-do"
                      />
                      <button
                        type="submit"
                        className="add btn btn-primary todo-list-add-btn"
                        id="add-task"
                      >
                        Add
                      </button>
                    </div>
                  </form>
                </div>
                <div className="list-wrapper px-3">
                  <ul className="d-flex flex-column-reverse todo-list">
                    <li>
                      <div className="form-check">
                        <label className="form-check-label">
                          <input className="checkbox" type="checkbox" />
                          Team review meeting at 3.00 PM
                        </label>
                      </div>
                      <i className="remove ti-close" />
                    </li>
                    <li>
                      <div className="form-check">
                        <label className="form-check-label">
                          <input className="checkbox" type="checkbox" />
                          Prepare for presentation
                        </label>
                      </div>
                      <i className="remove ti-close" />
                    </li>
                    <li>
                      <div className="form-check">
                        <label className="form-check-label">
                          <input className="checkbox" type="checkbox" />
                          Resolve all the low priority tickets due today
                        </label>
                      </div>
                      <i className="remove ti-close" />
                    </li>
                    <li className="completed">
                      <div className="form-check">
                        <label className="form-check-label">
                          <input
                            className="checkbox"
                            type="checkbox"
                            defaultChecked
                          />
                          Schedule meeting for next week
                        </label>
                      </div>
                      <i className="remove ti-close" />
                    </li>
                    <li className="completed">
                      <div className="form-check">
                        <label className="form-check-label">
                          <input
                            className="checkbox"
                            type="checkbox"
                            defaultChecked
                          />
                          Project review
                        </label>
                      </div>
                      <i className="remove ti-close" />
                    </li>
                  </ul>
                </div>
                <h4 className="px-3 text-muted mt-5 fw-light mb-0">Events</h4>
                <div className="events pt-4 px-3">
                  <div className="wrapper d-flex mb-2">
                    <i className="ti-control-record text-primary me-2" />
                    <span>Feb 11 2018</span>
                  </div>
                  <p className="mb-0 font-weight-thin text-gray">
                    Creating component page build a js
                  </p>
                  <p className="text-gray mb-0">The total number of sessions</p>
                </div>
                <div className="events pt-4 px-3">
                  <div className="wrapper d-flex mb-2">
                    <i className="ti-control-record text-primary me-2" />
                    <span>Feb 7 2018</span>
                  </div>
                  <p className="mb-0 font-weight-thin text-gray">
                    Meeting with Alisa
                  </p>
                  <p className="text-gray mb-0 ">Call Sarah Graves</p>
                </div>
              </div>
              {/* To do section tab ends */}
              <div
                className="tab-pane fade"
                id="chats-section"
                role="tabpanel"
                aria-labelledby="chats-section"
              >
                <div className="d-flex align-items-center justify-content-between border-bottom">
                  <p className="settings-heading border-top-0 mb-3 pl-3 pt-0 border-bottom-0 pb-0">
                    Friends
                  </p>
                  <small className="settings-heading border-top-0 mb-3 pt-0 border-bottom-0 pb-0 pr-3 fw-normal">
                    See All
                  </small>
                </div>
                <ul className="chat-list">
                  <li className="list active">
                    <div className="profile">
                      <img src={face1} alt="image" />
                      <span className="online" />
                    </div>
                    <div className="info">
                      <p>Thomas Douglas</p>
                      <p>Available</p>
                    </div>
                    <small className="text-muted my-auto">19 min</small>
                  </li>
                  <li className="list">
                    <div className="profile">
                      <img src={face2} alt="image" />
                      <span className="offline" />
                    </div>
                    <div className="info">
                      <div className="wrapper d-flex">
                        <p>Catherine</p>
                      </div>
                      <p>Away</p>
                    </div>
                    <div className="badge badge-success badge-pill my-auto mx-2">
                      4
                    </div>
                    <small className="text-muted my-auto">23 min</small>
                  </li>
                  <li className="list">
                    <div className="profile">
                      <img src={face3} alt="image" />
                      <span className="online" />
                    </div>
                    <div className="info">
                      <p>Daniel Russell</p>
                      <p>Available</p>
                    </div>
                    <small className="text-muted my-auto">14 min</small>
                  </li>
                  <li className="list">
                    <div className="profile">
                      <img src={face4} alt="image" />
                      <span className="offline" />
                    </div>
                    <div className="info">
                      <p>James Richardson</p>
                      <p>Away</p>
                    </div>
                    <small className="text-muted my-auto">2 min</small>
                  </li>
                  <li className="list">
                    <div className="profile">
                      <img src={face5} alt="image" />
                      <span className="online" />
                    </div>
                    <div className="info">
                      <p>Madeline Kennedy</p>
                      <p>Available</p>
                    </div>
                    <small className="text-muted my-auto">5 min</small>
                  </li>
                  <li className="list">
                    <div className="profile">
                      <img src={face6} alt="image" />
                      <span className="online" />
                    </div>
                    <div className="info">
                      <p>Sarah Graves</p>
                      <p>Available</p>
                    </div>
                    <small className="text-muted my-auto">47 min</small>
                  </li>
                </ul>
              </div>
              {/* chat tab ends */}
            </div>
          </div>
          {/* partial */}
          {/* partial:partials/_sidebar.html */}

          {/* partial */}
          <div className="main-panel col">
            <div className="content-wrapper">
              <div className="row">
                <div className="col-sm-12">
                  <div className="home-tab">
                    <div className="d-sm-flex align-items-center justify-content-between border-bottom">
                      <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item">
                          <a
                            className="nav-link active ps-0"
                            id="home-tab"
                            data-bs-toggle="tab"
                            href="#overview"
                            role="tab"
                            aria-controls="overview"
                            aria-selected="true"
                          >
                            Overview
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="profile-tab"
                            data-bs-toggle="tab"
                            href="#audiences"
                            role="tab"
                            aria-selected="false"
                          >
                            Audiences
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="contact-tab"
                            data-bs-toggle="tab"
                            href="#demographics"
                            role="tab"
                            aria-selected="false"
                          >
                            Demographics
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link border-0"
                            id="more-tab"
                            data-bs-toggle="tab"
                            href="#more"
                            role="tab"
                            aria-selected="false"
                          >
                            More
                          </a>
                        </li>
                      </ul>
                      <div>
                        <div className="btn-wrapper">
                          <a
                            href="#"
                            className="btn btn-otline-dark align-items-center"
                          >
                            <i className="icon-share" /> Share
                          </a>
                          <a href="#" className="btn btn-otline-dark">
                            <i className="icon-printer" /> Print
                          </a>
                          <a
                            href="#"
                            className="btn btn-primary text-white me-0"
                          >
                            <i className="icon-download" /> Export
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="tab-content tab-content-basic">
                      <div
                        className="tab-pane fade show active"
                        id="overview"
                        role="tabpanel"
                        aria-labelledby="overview"
                      >
                        {/* statistics component  */}
                        <Statistics />

                        <div className="row">
                          <div className="col-lg-8 d-flex flex-column">
                            {/* overview Graph  */}
                            <OverviewGraph />

                            {/* pending Requests components  */}
                            <PendingRequests />

                            {/* Recent Events  */}
                            <div className="row flex-grow">
                              <RecentEvents />
                              <Activities />
                            </div>
                          </div>
                          <div className="col-lg-4 d-flex flex-column">
                            <div className="row flex-grow">
                              <Todos />
                            </div>
                            <div className="row flex-grow">
                              <TypeOfAmount />
                            </div>
                            <div className="row flex-grow">
                              <LeaveReports />
                            </div>
                            <div className="row flex-grow">
                              <Leaderboard />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* content-wrapper ends */}

            {/* partial */}
          </div>

          {/* main-panel ends */}
        </div>
        {/* page-body-wrapper ends */}
      </div>
      {/* container-scroller */}
    </div>
  );
};

export default Dashboard;
