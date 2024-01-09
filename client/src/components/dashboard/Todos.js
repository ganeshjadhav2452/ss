import React from 'react'

const Todos = () => {
    return (
        <>
            <div className="col-12 grid-margin stretch-card">
                <div className="card card-rounded">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h4 className="card-title card-title-dash">
                                        Todo list
                                    </h4>
                                    <div className="add-items d-flex mb-0">
                                        {/* <input type="text" class="form-control todo-list-input" placeholder="What do you need to do today?"> */}
                                        <button className="add btn btn-icons btn-rounded btn-primary todo-list-add-btn text-white me-0 pl-12p">
                                            <i className="mdi mdi-plus" />
                                        </button>
                                    </div>
                                </div>
                                <div className="list-wrapper">
                                    <ul className="todo-list todo-list-rounded">
                                        <li className="d-block">
                                            <div className="form-check w-100">
                                                <label className="form-check-label">
                                                    <input
                                                        className="checkbox"
                                                        type="checkbox"
                                                    />{" "}
                                                    Lorem Ipsum is simply dummy
                                                    text of the printing{" "}
                                                    <i className="input-helper rounded" />
                                                </label>
                                                <div className="d-flex mt-2">
                                                    <div className="ps-4 text-small me-3">
                                                        24 June 2020
                                                    </div>
                                                    <div className="badge badge-opacity-warning me-3">
                                                        Due tomorrow
                                                    </div>
                                                    <i className="mdi mdi-flag ms-2 flag-color" />
                                                </div>
                                            </div>
                                        </li>
                                        <li className="d-block">
                                            <div className="form-check w-100">
                                                <label className="form-check-label">
                                                    <input
                                                        className="checkbox"
                                                        type="checkbox"
                                                    />{" "}
                                                    Lorem Ipsum is simply dummy
                                                    text of the printing{" "}
                                                    <i className="input-helper rounded" />
                                                </label>
                                                <div className="d-flex mt-2">
                                                    <div className="ps-4 text-small me-3">
                                                        23 June 2020
                                                    </div>
                                                    <div className="badge badge-opacity-success me-3">
                                                        Done
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="form-check w-100">
                                                <label className="form-check-label">
                                                    <input
                                                        className="checkbox"
                                                        type="checkbox"
                                                    />{" "}
                                                    Lorem Ipsum is simply dummy
                                                    text of the printing{" "}
                                                    <i className="input-helper rounded" />
                                                </label>
                                                <div className="d-flex mt-2">
                                                    <div className="ps-4 text-small me-3">
                                                        24 June 2020
                                                    </div>
                                                    <div className="badge badge-opacity-success me-3">
                                                        Done
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="border-bottom-0">
                                            <div className="form-check w-100">
                                                <label className="form-check-label">
                                                    <input
                                                        className="checkbox"
                                                        type="checkbox"
                                                    />{" "}
                                                    Lorem Ipsum is simply dummy
                                                    text of the printing{" "}
                                                    <i className="input-helper rounded" />
                                                </label>
                                                <div className="d-flex mt-2">
                                                    <div className="ps-4 text-small me-3">
                                                        24 June 2020
                                                    </div>
                                                    <div className="badge badge-opacity-danger me-3">
                                                        Expired
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todos