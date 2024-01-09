import React, { useEffect, useState } from "react";
import NavBar from "../../NavBar";
import Slidebar from "../../Slidebar";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { update_email_url, update_password_url } from "../../../constants/api";

const Credential = () => {
    const { user } = useSelector((state) => state.auth)
    const [formData, setFormData] = useState({
        email: '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    })
    console.log('this is user in credentials', user)

    const updateFormData = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const userNameSubmitHandler = async (e) => {
        const payload = {
            email: formData.email
        }
        e.preventDefault()
        try {
            const responseOfChangeEmail = await axios.put(update_email_url, payload)
            console.log('this is response of change email', responseOfChangeEmail)
            toast.success('email changed successfully')
        } catch (error) {
            toast.error('something went wrong while updating username')
        }
    }

    const passwordSubmitHandler = async (e) => {
        e.preventDefault()
        if (formData.newPassword != formData.confirmPassword) {
            return toast.error('New password and confirm password should be same')
        } else if (formData.newPassword == formData.confirmPassword && formData.oldPassword == formData.newPassword) {
            return toast.error('new password can not be same as old password')

        }


        const payload = {
            oldPassword: formData.oldPassword,
            newPassword: formData.newPassword
        }

        try {

            const responseOfPasswordChange = await axios.put(update_password_url, payload)
            console.log('response of change password', responseOfPasswordChange)
            toast.success('password changed successfully')
        } catch (error) {

        }
    }
    useEffect(() => {
        setFormData({
            email: user.email
        })
    }, [user])
    return (
        <>
            <div className="container-scroller ">
                <NavBar />

                <div className="container-fluid page-body-wrapper">

                    <Slidebar />

                    <div className="main-panel col ">
                        <div className="content-wrapper ">
                            <div
                                className="col d-flex  w-100 flex-column align-items-center bg-light card h-75"

                            >
                                <h2 className="h2 fw-bold  m-3"> credentials</h2>
                                <div className="row d-flex flex-row w-100">
                                    <div className="col">
                                        <form onSubmit={userNameSubmitHandler}>
                                            <div className="mb-3">
                                                <label htmlFor="username" className="form-label" >
                                                    Username:
                                                </label>
                                                <input value={formData.email}
                                                    onChange={updateFormData} placeholder="email" type="email" className="form-control" id="username" name="email" />

                                                <button type="submit" className="btn btn-primary mt-2">
                                                    Update Username
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="col">
                                        <form onSubmit={passwordSubmitHandler} className="">
                                            <div className="mb-3 ">
                                                <label htmlFor="oldPassword" className="form-label">
                                                    Old Password:
                                                </label>
                                                <input
                                                    name="oldPassword"
                                                    value={formData.oldPassword}
                                                    onChange={updateFormData}
                                                    type="password"
                                                    className="form-control"
                                                    id="oldPassword"
                                                    placeholder="Old Password"
                                                />
                                            </div>
                                            <div className="mb-3 ">
                                                <label htmlFor="newPassword" className="form-label">
                                                    New Password:
                                                </label>
                                                <input
                                                    name="newPassword"
                                                    value={formData.newPassword}
                                                    onChange={updateFormData}
                                                    type="password"
                                                    className="form-control"
                                                    id="newPassword"
                                                    placeholder="New Password"
                                                />
                                            </div>
                                            <div className="mb-3 ">
                                                <label htmlFor="confirmPassword" className="form-label">
                                                    Confirm Password:
                                                </label>
                                                <input
                                                    name="confirmPassword"
                                                    value={formData.confirmPassword}
                                                    onChange={updateFormData}
                                                    placeholder="confirm password"
                                                    type="password"
                                                    className="form-control"
                                                    id="confirmPassword"
                                                />
                                            </div>
                                            <button type="submit" className="btn btn-primary mt-2">
                                                Update Password
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Credential;
