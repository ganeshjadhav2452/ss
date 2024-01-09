import React from 'react'

const LeaveReports = () => {
    return (
        <>
            <div className="col-12 grid-margin stretch-card">
                <div className="card card-rounded">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div>
                                        <h4 className="card-title card-title-dash">
                                            Leave Report
                                        </h4>
                                    </div>
                                    <div>
                                        <div className="dropdown">
                                            <button
                                                className="btn btn-secondary dropdown-toggle toggle-dark btn-lg mb-0 me-0"
                                                type="button"
                                                id="dropdownMenuButton3"
                                                data-bs-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                {" "}
                                                Month Wise{" "}
                                            </button>
                                            <div
                                                className="dropdown-menu"
                                                aria-labelledby="dropdownMenuButton3"
                                            >
                                                <h6 className="dropdown-header">
                                                    week Wise
                                                </h6>
                                                <a
                                                    className="dropdown-item"
                                                    href="#"
                                                >
                                                    Year Wise
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <canvas id="leaveReport" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LeaveReports