import React from "react";
const OverviewGraph = () => {
    return (
        <>
            <div className="row flex-grow">
                <div className="col-12 grid-margin stretch-card">
                    <div className="card card-rounded">
                        <div className="card-body">
                            <div className="d-sm-flex justify-content-between align-items-start">
                                <div>
                                    <h4 className="card-title card-title-dash">
                                        Market Overview
                                    </h4>
                                    <p className="card-subtitle card-subtitle-dash">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit
                                    </p>
                                </div>
                                <div>
                                    <div className="dropdown">
                                        <button
                                            className="btn btn-secondary dropdown-toggle toggle-dark btn-lg mb-0 me-0"
                                            type="button"
                                            id="dropdownMenuButton2"
                                            data-bs-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >
                                            {" "}
                                            This month{" "}
                                        </button>
                                        <div
                                            className="dropdown-menu"
                                            aria-labelledby="dropdownMenuButton2"
                                        >
                                            <h6 className="dropdown-header">Settings</h6>
                                            <a className="dropdown-item" href="#">
                                                Action
                                            </a>
                                            <a className="dropdown-item" href="#">
                                                Another action
                                            </a>
                                            <a className="dropdown-item" href="#">
                                                Something else here
                                            </a>
                                            <div className="dropdown-divider" />
                                            <a className="dropdown-item" href="#">
                                                Separated link
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-sm-flex align-items-center mt-1 justify-content-between">
                                <div className="d-sm-flex align-items-center mt-4 justify-content-between">
                                    <h2 className="me-2 fw-bold">$36,2531.00</h2>
                                    <h4 className="me-2">USD</h4>
                                    <h4 className="text-success">(+1.37%)</h4>
                                </div>
                                <div className="me-3">
                                    <div id="marketing-overview-legend" />
                                </div>
                            </div>
                            <div className="chartjs-bar-wrapper mt-3">
                                <canvas id="marketingOverview" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OverviewGraph;
