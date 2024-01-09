import React, { useEffect, useState } from 'react'
import Slidebar from '../components/Slidebar'
import NavBar from '../components/NavBar'
import ReactQuill from 'react-quill'
import '../index.css'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { delete_company_url, get_company_details, update_company_url } from '../constants/api'
import toast from 'react-hot-toast'

const CompanyDetails = () => {
    const [active, setActive] = useState('3')
    const [isEdit, setIsEdit] = useState(false);
    const navigate = useNavigate()
    const [isReadOnly, setIsReadyOnly] = useState(true)
    const [isDisabled, setIsDisabled] = useState(true)
    let count = 1
    const { companyId } = useParams()

    const handleTabUpdate = (tabname) => {
        setActive(tabname)
    }
    const [text, setText] = useState({
        about: '',
        fileAClaim: '',
        policyService: ''
    });
    const [companyDetails, setCompanyDetails] = useState({
        company_name: '',
        companyLogo: '',
        status: ''
    })
    const [company, setCompany] = useState({})
    const [activeTabCompany, setActiveTabCompany] = useState("about");

    const [logo, setLogo] = useState(null)



    const [textAbout, setTextAbout] = useState('');
    const [textFileClaim, setTextFileClaim] = useState('');
    const [textPolicyService, setTextPolicyService] = useState('');


    const handleLogoChange = (e) => {
        setLogo(e.target.files[0]);
    };
    // ... (other functions and code)
    const updateReadOnly = () => {
        setIsReadyOnly(!isEdit)
        setIsDisabled(!isEdit)
    }


    const updateAboutHandler = (value) => {
        setTextAbout(value)
    }

    const updatePolicyServiceHandler = (value) => {
        setTextPolicyService(value)
    }
    const updateFileClaimHandler = (value) => {
        setTextFileClaim(value)
    }


    const updateCompanyDetails = (e) => {
        setCompanyDetails((prev) => {
            if (e.target.name == 'companyLogo') {
                let logo = e.target.files[0]

                return {
                    ...prev,
                    [e.target.name]: logo
                }
            } else {
                return {
                    ...prev,
                    [e.target.name]: e.target.value
                }
            }
        })
    }


    const getCompanyDetails = async () => {
        try {
            const responseOfGetCompany = await axios.get(`${get_company_details}/${companyId}`)

            console.log('this is company details ', responseOfGetCompany.data.company)
            setCompany(responseOfGetCompany.data.company)
            setTextAbout(responseOfGetCompany.data.company.about)
            setTextFileClaim(responseOfGetCompany.data.company.file_claim)
            setTextPolicyService(responseOfGetCompany.data.company.policy_service)
            setCompanyDetails(responseOfGetCompany.data.company)
        } catch (error) {
            console.log(error)

        }
    }
    const updateCompanyHandler = async () => {


        const payload = {
            ...companyDetails,
            about: textAbout,
            company_logo: logo,
            policy_service: textPolicyService,
            file_claim: textFileClaim

        }
        console.log('this is updated details', payload)
        try {
            const responseOfUpdateCompany = await axios.post(`${update_company_url}/${companyId}`, payload)

            console.log('this is response of update company', responseOfUpdateCompany)
            toast.success(responseOfUpdateCompany.data.message)
            getCompanyDetails()
            navigate('/admin/companies')
        } catch (error) {
            console.log(error)
            console.log('this is error of update company', error)
        }
    }

    const deleteClickHandler = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete?");

        if (confirmDelete) {
            try {
                const deleteCompanyResponse = await axios.delete(`${delete_company_url}/${companyId}`)

                toast.success('Company Deleted Successfully')
                navigate('/admin/companies')
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        getCompanyDetails()
    }, [])
    useEffect(() => {
        updateReadOnly()
    }, [isEdit])
    return (
        <>
            <div className="container-scroller " style={{
                backgroundColor: "rgb(244,245,247)"
            }}>
                <NavBar />

                <div className="container-fluid page-body-wrapper" style={{
                    backgroundColor: "rgb(244,245,247)"
                }} >

                    <Slidebar />

                    <div className="main-panel col ">
                        <div className="content-wrapper ">

                            <div className="d-flex justify-content-center m-1">
                                <nav className="navbar  rounded rounded-2 navbar-expand-lg navbar-light  bg-light row col-lg-12  ">
                                    <div
                                        className="collapse navbar-collapse d-flex justify-content-end "
                                        id="navbarSupportedContent fw-bold"
                                    >
                                        <ul className="navbar-nav mr-auto d-flex justify-content-around justify-content-center">
                                            <li
                                                className="nav-item "
                                                onClick={() => handleTabUpdate("manage-company")}
                                                name="site-settings"
                                            >
                                                <Link
                                                    to={'/admin/companies'}
                                                    className={`nav-link btn border border-dark m-1 fw-bold btn-info text-light`}
                                                    name="manage-company"
                                                >
                                                    Back
                                                </Link>
                                            </li>
                                            <li
                                                className="nav-item "
                                                onClick={() => handleTabUpdate("add-company")}
                                                name="site-settings"
                                            >
                                                <p
                                                    className={`nav-link btn border border-dark m-1 fw-bold btn-success text-light `}
                                                    onClick={() => {
                                                        setIsEdit(!isEdit)

                                                    }}
                                                    name="site-settings"
                                                >
                                                    Edit
                                                </p>
                                            </li>

                                            <li
                                                className="nav-item"
                                                // onClick={() => handleTabUpdate("export-company")}
                                                name="manage-state"
                                            >
                                                <p
                                                    className={`nav-link btn border border-dark m-1 fw-bold btn-danger text-light `}
                                                    onClick={deleteClickHandler}
                                                    // onClick={ExportCompaniesHandler}
                                                    name="manage-state"
                                                >
                                                    Delete
                                                </p>
                                            </li>


                                        </ul>
                                    </div>
                                </nav>
                            </div>

                            {!isEdit && <div className="m-3 row grid-margin stretch-card d-flex flex-row  h-25
                            ">
                                <div className='row w-25 col'>
                                    <div className="  card d-flex flex-row row col">
                                        <div className='h-25 w-50 col-6 '>
                                            Last policy sold


                                        </div>
                                        <div className='h-50 w-50 col-6   '>Total amount of sale
                                        </div>
                                        <div className='h-50 w-50 col-6  '>Total number of plans
                                        </div>
                                        <div className='h-50 w-50 col-6  '>Total policy sold
                                        </div>


                                    </div>
                                </div>
                                <div className="col-8 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body">


                                            <div className="table-responsive">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th>Plan Name</th>
                                                            <th>Last Purchase Policy</th>
                                                            <th>Last Sale</th>
                                                            <th>Total Sale</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>Navigator for Crew</td>
                                                            <td>Not sold</td>
                                                            <td>$0</td>
                                                            <td>$ 0</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Navigator for Student</td>
                                                            <td>Not sold</td>
                                                            <td>$0</td>
                                                            <td>$ 0</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Trekker Choice</td>
                                                            <td>Not sold</td>
                                                            <td>$0</td>
                                                            <td>$ 0</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Trekker Essential</td>
                                                            <td>Not sold</td>
                                                            <td>$0</td>
                                                            <td>$ 0</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Voyager Choice</td>
                                                            <td>Not sold</td>
                                                            <td>$0</td>
                                                            <td>$ 0</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                            {!isEdit && <> <br /><br /><br /><br /><br /><br /><br /></>}

                            <div className={`container col-12 card p-3 mt-5 update-company  ${isEdit && 'mt-0'}`} >
                                <div className="row">
                                    <div className="col-12">
                                        <div className="d-flex justify-content-around mb-3">
                                            <button
                                                className={`btn fw-bold  ${activeTabCompany === "about"
                                                    ? "btn-warning"
                                                    : "btn-secondary"
                                                    }`}
                                                onClick={() => setActiveTabCompany("about")}
                                            >
                                                About
                                            </button>
                                            <button
                                                className={`btn fw-bold ${activeTabCompany === "companyDetails"
                                                    ? "btn-warning"
                                                    : "btn-secondary"
                                                    }`}
                                                onClick={() => setActiveTabCompany("companyDetails")}
                                            >
                                                Company Details
                                            </button>
                                            <button
                                                className={`btn fw-bold ${activeTabCompany === "fileClaims"
                                                    ? "btn-warning"
                                                    : "btn-secondary"
                                                    }`}
                                                onClick={() => setActiveTabCompany("fileClaims")}
                                            >
                                                File a Claim
                                            </button>
                                            <button
                                                className={`btn fw-bold ${activeTabCompany === "policyService"
                                                    ? "btn-warning"
                                                    : "btn-secondary"
                                                    }`}
                                                onClick={() => setActiveTabCompany("policyService")}
                                            >
                                                Policy Service
                                            </button>
                                        </div>
                                        {activeTabCompany === "about" && (
                                            <ReactQuill readOnly={isReadOnly} className="quill-editor" value={textAbout} onChange={updateAboutHandler} />
                                        )}
                                        {activeTabCompany === "companyDetails" && (
                                            // <ReactQuill className="companyDetails" value={text.companyDetails} onChange={handleChangeCompanyDetails} />
                                            <div className="container ">
                                                <div className="row">
                                                    {/* Left Side: Company Name and Logo */}
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="companyName fw-bold text-dark">Company Name</label>
                                                            {/* <input disabled={isDisabled} onChange={(e) => handleCompanyDetails(e, 'company_name')} */}
                                                            <input
                                                                disabled={isDisabled}
                                                                onChange={updateCompanyDetails}
                                                                value={companyDetails.company_name}
                                                                required type="text"
                                                                name="company_name" className="form-control fw-bold text-dark" id="companyName" placeholder="Enter company name" />


                                                        </div>
                                                        <div className="form-group border bg-light ">
                                                            <label
                                                                className="fw-bold  text-dark"
                                                                htmlFor="companyLogo">Company Logo</label>
                                                            <input
                                                                disabled={isDisabled}
                                                                onChange={handleLogoChange}

                                                                name="companyLogo" required type="file" className="form-control-file " id="companyLogo" />
                                                        </div>
                                                    </div>
                                                    {/* Right Side: Status Radio Buttons */}
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label for="status" className="fw-bold text-dark">Status</label>
                                                            <select
                                                                disabled={isDisabled}
                                                                onChange={updateCompanyDetails} value={companyDetails.status} required
                                                                name="status" className="form-control fw-bold text-dark" id="status">
                                                                <option value={2}>Inactive</option>
                                                                <option value={1}>Active</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        )}
                                        {activeTabCompany === "fileClaims" && (
                                            <ReactQuill readOnly={isReadOnly} className="quill-editor" value={textFileClaim} onChange={updateFileClaimHandler} />
                                        )}
                                        {activeTabCompany === "policyService" && (
                                            <ReactQuill readOnly={isReadOnly} className="quill-editor" value={textPolicyService} onChange={updatePolicyServiceHandler} />
                                        )}
                                        <button disabled={isDisabled} onClick={updateCompanyHandler} className="btn btn-success mt-2">Save</button>
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

export default CompanyDetails