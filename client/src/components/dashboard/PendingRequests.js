import React from 'react'
import { face2, face3, face4, face5, face1 } from "../../constants/index";

const PendingRequests = () => {
    return (
        <>
            <div className="row flex-grow">
                <div className="col-12 grid-margin stretch-card">
                    <div className="card card-rounded">
                        <div className="card-body">
                            <div className="d-sm-flex justify-content-between align-items-start">
                                <div>
                                    <h4 className="card-title card-title-dash">
                                        Pending Requests
                                    </h4>
                                    <p className="card-subtitle card-subtitle-dash">
                                        You have 50+ new requests
                                    </p>
                                </div>
                                <div>
                                    <button
                                        className="btn btn-primary btn-lg text-white mb-0 me-0"
                                        type="button"
                                    >
                                        <i className="mdi mdi-account-plus" />
                                        Add new member
                                    </button>
                                </div>
                            </div>
                            <div className="table-responsive  mt-1">
                                <table className="table select-table">
                                    <thead>
                                        <tr>
                                            <th>
                                                <div className="form-check form-check-flat mt-0">
                                                    <label className="form-check-label">
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input"
                                                            aria-checked="false"
                                                        />
                                                        <i className="input-helper" />
                                                    </label>
                                                </div>
                                            </th>
                                            <th>Customer</th>
                                            <th>Company</th>
                                            <th>Progress</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="form-check form-check-flat mt-0">
                                                    <label className="form-check-label">
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input"
                                                            aria-checked="false"
                                                        />
                                                        <i className="input-helper" />
                                                    </label>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="d-flex ">
                                                    <img src={face1} alt />
                                                    <div>
                                                        <h6>Brandon Washington</h6>
                                                        <p>Head admin</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <h6>Company name 1</h6>
                                                <p>company type</p>
                                            </td>
                                            <td>
                                                <div>
                                                    <div className="d-flex justify-content-between align-items-center mb-1 max-width-progress-wrap">
                                                        <p className="text-success">
                                                            79%
                                                        </p>
                                                        <p>85/162</p>
                                                    </div>
                                                    <div className="progress progress-md">
                                                        <div
                                                            className="progress-bar bg-success"
                                                            role="progressbar"
                                                            style={{ width: "85%" }}
                                                            aria-valuenow={25}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="badge badge-opacity-warning">
                                                    In progress
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="form-check form-check-flat mt-0">
                                                    <label className="form-check-label">
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input"
                                                            aria-checked="false"
                                                        />
                                                        <i className="input-helper" />
                                                    </label>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="d-flex">
                                                    <img src={face2} alt />
                                                    <div>
                                                        <h6>Laura Brooks</h6>
                                                        <p>Head admin</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <h6>Company name 1</h6>
                                                <p>company type</p>
                                            </td>
                                            <td>
                                                <div>
                                                    <div className="d-flex justify-content-between align-items-center mb-1 max-width-progress-wrap">
                                                        <p className="text-success">
                                                            65%
                                                        </p>
                                                        <p>85/162</p>
                                                    </div>
                                                    <div className="progress progress-md">
                                                        <div
                                                            className="progress-bar bg-success"
                                                            role="progressbar"
                                                            style={{ width: "65%" }}
                                                            aria-valuenow={65}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="badge badge-opacity-warning">
                                                    In progress
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="form-check form-check-flat mt-0">
                                                    <label className="form-check-label">
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input"
                                                            aria-checked="false"
                                                        />
                                                        <i className="input-helper" />
                                                    </label>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="d-flex">
                                                    <img src={face3} alt />
                                                    <div>
                                                        <h6>Wayne Murphy</h6>
                                                        <p>Head admin</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <h6>Company name 1</h6>
                                                <p>company type</p>
                                            </td>
                                            <td>
                                                <div>
                                                    <div className="d-flex justify-content-between align-items-center mb-1 max-width-progress-wrap">
                                                        <p className="text-success">
                                                            65%
                                                        </p>
                                                        <p>85/162</p>
                                                    </div>
                                                    <div className="progress progress-md">
                                                        <div
                                                            className="progress-bar bg-warning"
                                                            role="progressbar"
                                                            style={{ width: "38%" }}
                                                            aria-valuenow={38}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="badge badge-opacity-warning">
                                                    In progress
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="form-check form-check-flat mt-0">
                                                    <label className="form-check-label">
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input"
                                                            aria-checked="false"
                                                        />
                                                        <i className="input-helper" />
                                                    </label>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="d-flex">
                                                    <img src={face4} alt />
                                                    <div>
                                                        <h6>Matthew Bailey</h6>
                                                        <p>Head admin</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <h6>Company name 1</h6>
                                                <p>company type</p>
                                            </td>
                                            <td>
                                                <div>
                                                    <div className="d-flex justify-content-between align-items-center mb-1 max-width-progress-wrap">
                                                        <p className="text-success">
                                                            65%
                                                        </p>
                                                        <p>85/162</p>
                                                    </div>
                                                    <div className="progress progress-md">
                                                        <div
                                                            className="progress-bar bg-danger"
                                                            role="progressbar"
                                                            style={{ width: "15%" }}
                                                            aria-valuenow={15}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="badge badge-opacity-danger">
                                                    Pending
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="form-check form-check-flat mt-0">
                                                    <label className="form-check-label">
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input"
                                                            aria-checked="false"
                                                        />
                                                        <i className="input-helper" />
                                                    </label>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="d-flex">
                                                    <img src={face5} alt />
                                                    <div>
                                                        <h6>Katherine Butler</h6>
                                                        <p>Head admin</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <h6>Company name 1</h6>
                                                <p>company type</p>
                                            </td>
                                            <td>
                                                <div>
                                                    <div className="d-flex justify-content-between align-items-center mb-1 max-width-progress-wrap">
                                                        <p className="text-success">
                                                            65%
                                                        </p>
                                                        <p>85/162</p>
                                                    </div>
                                                    <div className="progress progress-md">
                                                        <div
                                                            className="progress-bar bg-success"
                                                            role="progressbar"
                                                            style={{ width: "65%" }}
                                                            aria-valuenow={65}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="badge badge-opacity-success">
                                                    Completed
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PendingRequests