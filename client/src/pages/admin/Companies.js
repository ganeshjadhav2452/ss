import React, { useEffect, useRef, useState } from "react";
import NavBar from "../../components/NavBar";
import Slidebar from "../../components/Slidebar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import '../../App.css'
import '../../index.css'
import axios from "axios";
import { get_all_companies, get_company_by_status, get_company_logo, insert_company_url } from "../../constants/api";
import toast from "react-hot-toast";
import exportToCSV from "../../external_modules/ExportToExcel";
import ReactToPrint from 'react-to-print';
import { Link } from "react-router-dom";



const ComponentToPrint = React.forwardRef((props, ref) => (
    <div ref={ref}>This is the content to print.</div>
));
const Companies = () => {
    const [active, setActive] = useState('3')
    const [activeTab, setActiveTab] = useState("manage-company");
    let count = 1
    const componentRef = useRef();

    const [text, setText] = useState({
        about: '',
        fileAClaim: '',
        policyService: ''
    });
    const [companyDetails, setCompanyDetails] = useState({
        companyName: '',
        companyLogo: '',
        companyStatus: ''
    })
    const [activeTabCompany, setActiveTabCompany] = useState("about");
    const [companies, setCompanies] = useState([])
    const [logo, setLogo] = useState(null)
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

    // set active or inactive

    const activeSelectChangeHandler = (e) => {
        setActive(e.target.value)
        console.log("this is status of active select", e.target.value)

    }
    const handleChangeAbout = (value) => {
        console.log('this is value', value)
        setText((prev) => {
            return {
                ...prev,
                about: value
            }
        });
    };
    const handleChangePolicyService = (value) => {

        setText((prev) => {
            return {
                ...prev,
                policyService: value
            }
        });
    };
    const handleChangeFileClaim = (value) => {

        setText((prev) => {
            return {
                ...prev,
                fileAClaim: value
            }
        });
    };

    const handleTabUpdate = (tabNmae) => {
        setActiveTab(tabNmae);
    };

    const insertCompanyHandler = async () => {
        const formDetails = {
            ...text,
            ...companyDetails
        }
        const formData = new FormData()

        Object.keys(formDetails).forEach((key) => {

            formData.append(key, formDetails[key])
        })
        formData.append('logo', logo)
        try {
            const insertCompanyResponse = await axios.post(insert_company_url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            },)
            toast.success(insertCompanyResponse.data.message)
            getCompaniesData()
        } catch (error) {
            console.log('error of file uploading', error)
            toast.error('sorry something went wrong , company cannot be inserted')
        }
    }


    const getCompaniesData = async () => {
        try {
            const responseOfGetCompanies = await axios.get(get_all_companies)
            console.log(responseOfGetCompanies.data)
            setCompanies(responseOfGetCompanies.data.companies)
        } catch (error) {
            console.log(error)
        }
    }

    const getCompaniesByActiveStatus = async () => {
        try {
            const responseOfGetCompanies = await axios.get(`${get_company_by_status}/${active}`)
            setCompanies(responseOfGetCompanies.data.companies)
        } catch (error) {
            console.log(error)
        }
    }

    const ExportCompaniesHandler = () => {
        exportToCSV(companies, 'customers')
    }

    const printDiv = (divName) => {
        let printContents = document.getElementById(divName).innerHTML;
        let originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;

        window.print();

        document.body.innerHTML = originalContents;
    }

    const setLogoHandler = (e) => {
        setLogo(e.target.files[0])
    }

    useEffect(() => {
        getCompaniesData()
    }, [])
    useEffect(() => {
        getCompaniesByActiveStatus()
    }, [active])
    console.log('this is active status', active)
    return (
        <>
            <div className="container-scroller " style={{
                backgroundColor: "rgb(244,245,247)"
            }}>
                <NavBar />

                <div className="container-fluid page-body-wrapper " style={{
                    backgroundColor: "rgb(244,245,247)"
                }}>
                    <Slidebar />

                    <div className="main-panel col ">
                        <div className="content-wrapper d-flex flex-column align-items-center  row col-lg-12 ">
                            <div className="d-flex justify-content-center m-1">
                                <nav className="navbar  rounded rounded-2 navbar-expand-lg navbar-light  bg-light row col-lg-12  ">
                                    <div
                                        className="collapse navbar-collapse d-flex justify-content-start "
                                        id="navbarSupportedContent fw-bold"
                                    >
                                        <ul className="navbar-nav mr-auto d-flex justify-content-around justify-content-center">
                                            <li
                                                className="nav-item "
                                                onClick={() => handleTabUpdate("manage-company")}
                                                name="site-settings"
                                            >
                                                <p
                                                    className={`nav-link btn border border-dark m-1 fw-bold ${activeTab == "manage-company" && "btn-success text-light"
                                                        }`}
                                                    name="manage-company"
                                                >
                                                    Manage Comapny
                                                </p>
                                            </li>
                                            <li
                                                className="nav-item "
                                                onClick={() => handleTabUpdate("add-company")}
                                                name="site-settings"
                                            >
                                                <p
                                                    className={`nav-link btn border border-dark m-1 fw-bold ${activeTab == "add-company" && "btn-success text-light "
                                                        }`}
                                                    name="site-settings"
                                                >
                                                    Add Company
                                                </p>
                                            </li>

                                            <li
                                                className="nav-item"
                                                // onClick={() => handleTabUpdate("export-company")}
                                                name="manage-state"
                                            >
                                                <p
                                                    className={`nav-link btn border border-dark m-1 fw-bold ${activeTab == "export-company" && "btn-success text-light  "
                                                        }`}
                                                    onClick={ExportCompaniesHandler}
                                                    name="manage-state"
                                                >
                                                    Export Company
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
                            {activeTab == "manage-company" && (
                                <div className="card">
                                    <div className="card-body ">
                                        <div className="w-100 d-flex justify-content-end">
                                            <ReactToPrint
                                                trigger={() => <button
                                                    onClick={() => this.printDiv('companyTable')}
                                                    className="btn btn-info "
                                                //onClick={() => setOpenForm(true)}
                                                >
                                                    Print
                                                </button>}
                                                content={() => componentRef.current}

                                            >


                                            </ReactToPrint>

                                        </div>
                                        <h4 className="card-title">Manage Company</h4>

                                        <div className="table-responsive" id="companyTable" ref={componentRef}>
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>SR.NO.</th>
                                                        <th>COMPANY NAME</th>
                                                        <th>COMPANY LOGO</th>
                                                        <th>STATUS </th>
                                                        <th>ACTION </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {companies.map((company) => (
                                                        <tr>

                                                            <td>{count++}</td>
                                                            <td>{company.company_name}</td>
                                                            <td><img src={`${get_company_logo}/${company.company_logo}`}
                                                                className="img rounded rounded-2 border company-logo" /></td>
                                                            <td className=" ">
                                                                <label className={`badge  ${company.status == '1' ? 'badge-success' : 'badge-danger'}`}>
                                                                    {company.status === 1 ? 'Active' : 'Inactive'}
                                                                </label>
                                                            </td>
                                                            <td>
                                                                <Link
                                                                    to={`/admin/companies/${company.id}`}
                                                                    // onClick={()=>viewClickHandler(company.id)}
                                                                    className="badge text-decoration-none badge-success view-btn ">
                                                                    View
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {activeTab === "add-company" && (
                                <div className="container card p-3">
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
                                                <ReactQuill className="quill-editor" value={text.about} onChange={handleChangeAbout} />
                                            )}
                                            {activeTabCompany === "companyDetails" && (
                                                // <ReactQuill className="companyDetails" value={text.companyDetails} onChange={handleChangeCompanyDetails} />
                                                <div className="container ">
                                                    <div className="row">
                                                        {/* Left Side: Company Name and Logo */}
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label htmlFor="companyName fw-bold text-dark">Company Name</label>
                                                                <input onChange={updateCompanyDetails} value={companyDetails.companyName} required type="text"
                                                                    name="companyName" className="form-control fw-bold text-dark" id="companyName" placeholder="Enter company name" />


                                                            </div>
                                                            <div className="form-group border bg-light ">
                                                                <label
                                                                    className="fw-bold  text-dark"
                                                                    htmlFor="companyLogo">Company Logo</label>
                                                                <input onChange={setLogoHandler}

                                                                    name="companyLogo" required type="file" className="form-control-file " id="companyLogo" />
                                                            </div>
                                                        </div>
                                                        {/* Right Side: Status Radio Buttons */}
                                                        <div className="col-md-6">
                                                            <div class="form-group">
                                                                <label for="status" class="fw-bold text-dark">Status</label>
                                                                <select
                                                                    onChange={updateCompanyDetails} value={companyDetails.companyStatus} required
                                                                    name="companyStatus" class="form-control fw-bold text-dark" id="status">
                                                                    <option value={2}>Inactive</option>
                                                                    <option value={1}>Active</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            )}
                                            {activeTabCompany === "fileClaims" && (
                                                <ReactQuill className="quill-editor" value={text.fileAClaim} onChange={handleChangeFileClaim} />
                                            )}
                                            {activeTabCompany === "policyService" && (
                                                <ReactQuill className="quill-editor" value={text.policyService} onChange={handleChangePolicyService} />
                                            )}
                                            <button onClick={insertCompanyHandler} className="btn btn-success mt-2">Save</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Companies;
