import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import PlanDetailsForm from './PlanDetailsForm'
import PlanUpgrades from './PlanUpgrades'

const AddManualPlan = () => {

    const [activeTabCompany, setActiveTabCompany] = useState('plan-details')
    return (
        <>

            <div className="container card p-3">
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex justify-content-around mb-3">
                            <button
                                className={`btn fw-bold  ${activeTabCompany === "plan-details"
                                    ? "btn-warning"
                                    : "btn-secondary"
                                    }`}
                                onClick={() => setActiveTabCompany("plan-details")}
                            >
                                Plan Details
                            </button>
                            <button
                                className={`btn fw-bold ${activeTabCompany === "plan-upgrades"
                                    ? "btn-warning"
                                    : "btn-secondary"
                                    }`}
                                onClick={() => setActiveTabCompany("plan-upgrades")}
                            >
                                Plan Upgrades
                            </button>
                            <button
                                className={`btn fw-bold ${activeTabCompany === "manage-plan-fee"
                                    ? "btn-warning"
                                    : "btn-secondary"
                                    }`}
                                onClick={() => setActiveTabCompany("manage-plan-fee")}
                            >
                                Manage Plan Fee
                            </button>
                            <button
                                className={`btn fw-bold ${activeTabCompany === "family-plan"
                                    ? "btn-warning"
                                    : "btn-secondary"
                                    }`}
                                onClick={() => setActiveTabCompany("family-plan")}
                            >
                                Family Plan
                            </button>
                            <button
                                className={`btn fw-bold ${activeTabCompany === "manual-addons-and-notes"
                                    ? "btn-warning"
                                    : "btn-secondary"
                                    }`}
                                onClick={() => setActiveTabCompany("manual-addons-and-notes")}
                            >
                                Manual Addons And Notes
                            </button>
                            <button
                                className={`btn fw-bold ${activeTabCompany === "plan-certificate"
                                    ? "btn-warning"
                                    : "btn-secondary"
                                    }`}
                                onClick={() => setActiveTabCompany("plan-certificate")}
                            >
                                Plan Certificate
                            </button>
                        </div>

                        {activeTabCompany === "plan-details" && (
                            <PlanDetailsForm />
                        )}
                        {activeTabCompany === "plan-upgrades" && (

                            <PlanUpgrades />

                        )}
                        {activeTabCompany === "fileClaims" && (
                            <ReactQuill className="quill-editor" />
                        )}
                        {activeTabCompany === "policyService" && (
                            <ReactQuill className="quill-editor" />
                        )}

                    </div>
                </div>
            </div>
        </>
    )
}

export default AddManualPlan