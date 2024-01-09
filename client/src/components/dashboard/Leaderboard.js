import React from 'react'
import { face2, face3, face4, face5, face1 } from "../../constants/index";

const Leaderboard = () => {
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
                                            Top Performer
                                        </h4>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <div className="wrapper d-flex align-items-center justify-content-between py-2 border-bottom">
                                        <div className="d-flex">
                                            <img
                                                className="img-sm rounded-10"
                                                src={face1}
                                                alt="profile"
                                            />
                                            <div className="wrapper ms-3">
                                                <p className="ms-1 mb-1 fw-bold">
                                                    Brandon Washington
                                                </p>
                                                <small className="text-muted mb-0">
                                                    162543
                                                </small>
                                            </div>
                                        </div>
                                        <div className="text-muted text-small">
                                            1h ago
                                        </div>
                                    </div>
                                    <div className="wrapper d-flex align-items-center justify-content-between py-2 border-bottom">
                                        <div className="d-flex">
                                            <img
                                                className="img-sm rounded-10"
                                                src={face2}
                                                alt="profile"
                                            />
                                            <div className="wrapper ms-3">
                                                <p className="ms-1 mb-1 fw-bold">
                                                    Wayne Murphy
                                                </p>
                                                <small className="text-muted mb-0">
                                                    162543
                                                </small>
                                            </div>
                                        </div>
                                        <div className="text-muted text-small">
                                            1h ago
                                        </div>
                                    </div>
                                    <div className="wrapper d-flex align-items-center justify-content-between py-2 border-bottom">
                                        <div className="d-flex">
                                            <img
                                                className="img-sm rounded-10"
                                                src={face3}
                                                alt="profile"
                                            />
                                            <div className="wrapper ms-3">
                                                <p className="ms-1 mb-1 fw-bold">
                                                    Katherine Butler
                                                </p>
                                                <small className="text-muted mb-0">
                                                    162543
                                                </small>
                                            </div>
                                        </div>
                                        <div className="text-muted text-small">
                                            1h ago
                                        </div>
                                    </div>
                                    <div className="wrapper d-flex align-items-center justify-content-between py-2 border-bottom">
                                        <div className="d-flex">
                                            <img
                                                className="img-sm rounded-10"
                                                src={face4}
                                                alt="profile"
                                            />
                                            <div className="wrapper ms-3">
                                                <p className="ms-1 mb-1 fw-bold">
                                                    Matthew Bailey
                                                </p>
                                                <small className="text-muted mb-0">
                                                    162543
                                                </small>
                                            </div>
                                        </div>
                                        <div className="text-muted text-small">
                                            1h ago
                                        </div>
                                    </div>
                                    <div className="wrapper d-flex align-items-center justify-content-between pt-2">
                                        <div className="d-flex">
                                            <img
                                                className="img-sm rounded-10"
                                                src={face5}
                                                alt="profile"
                                            />
                                            <div className="wrapper ms-3">
                                                <p className="ms-1 mb-1 fw-bold">
                                                    Rafell John
                                                </p>
                                                <small className="text-muted mb-0">
                                                    Alaska, USA
                                                </small>
                                            </div>
                                        </div>
                                        <div className="text-muted text-small">
                                            1h ago
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Leaderboard