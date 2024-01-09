import React, { useEffect, useState } from 'react'
import { get_admin_permissions, update_admin_url } from '../../../constants/api';
import axios from 'axios';
import NavBar from '../../NavBar';
import Slidebar from '../../Slidebar';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditStaff = () => {
    const { staffId } = useParams()
    const [permissionsList, setPermissionsList] = useState([]);
    const [checkedItems, setCheckedItems] = useState([]);
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phone: "",
        email: "",
        password: "",
    });
    const { currentStaff } = useSelector((state) => state.staff);

    const handleUpdateFormValues = (e) => {
        setFormData((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });
    };
    // const [adminPermissions, setAdminPermissions] = useState([])
    const handleCheckboxChange = (event) => {
        const itemId = Number(event.target.name);
        const isChecked = event.target.checked;

        setCheckedItems(prevCheckedItems => {
            if (isChecked) {
                return [...prevCheckedItems, itemId];
            } else {
                return prevCheckedItems.filter(item => item !== itemId);
            }
        });
    };

    const getAdminPermissions = async () => {
        try {
            const permissionResponse = await axios.get(`${get_admin_permissions}`);
            setPermissionsList(permissionResponse.data.permissions);
        } catch (error) {
            console.log(error);
        }
    };
    const submitStaffHandler = async (e) => {
        e.preventDefault()

        const selectedPermissions = permissionsList.filter((permission) => checkedItems.includes(permission.id))

        const payload = {
            ...formData,
            permissions: selectedPermissions
        }
        try {
            const responseOfUpdatingAdmin = await axios.put(`${update_admin_url}/${staffId}`, payload)
            navigate('/admin/manage-staff')
            toast.success('admin updated successfully')

        } catch (error) {
            toast.error('something went wrong while updating ...')
        }
    }

    useEffect(() => {
        getAdminPermissions();

    }, []);

    useEffect(() => {
        setFormData({
            name: currentStaff.name,
            address: currentStaff.address,
            phone: currentStaff.phone,
            email: currentStaff.email,

        })

        let previousPremissions = []
        let permissions = JSON.parse(currentStaff.permissions)
        for (let i = 0; i < permissions.length; i++) {
            previousPremissions.push(permissions[i].id)
        }
        console.log('this is previous premissions of user', previousPremissions, permissions)
        setCheckedItems(previousPremissions)
    }, [currentStaff])

    return (
        <>
            <div className="container-scroller " style={{
                backgroundColor: "rgb(244,245,247)",
            }}>
                <NavBar />

                <div className="container-fluid page-body-wrapper" style={{
                    backgroundColor: "rgb(244,245,247)",
                }}>

                    <Slidebar />

                    <div className="main-panel col ">
                        <div className="content-wrapper ">

                            <div className="container card p-5">
                                <div className="w-100 d-flex justify-content-end ">
                                    <Link
                                        to={'/admin/manage-staff'}
                                        className="btn btn-danger "

                                    >
                                        Back
                                    </Link>
                                </div>
                                <h3 className='card-title'> Edit Staff</h3>
                                <form onSubmit={submitStaffHandler}>
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input
                                            required
                                            value={formData.name}
                                            onChange={handleUpdateFormValues}
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            id="name"
                                            placeholder="Admin Name"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="address">Address</label>
                                        <input
                                            value={formData.address}
                                            onChange={handleUpdateFormValues}
                                            type="text"
                                            name="address"
                                            className="form-control"
                                            id="address"
                                            placeholder="1234 Main St"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone">Phone</label>
                                        <input
                                            value={formData.phone}
                                            onChange={handleUpdateFormValues}
                                            type="tel"
                                            className="form-control"
                                            id="phone"
                                            name="phone"
                                            placeholder="123-456-7890"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            required
                                            value={formData.email}
                                            onChange={handleUpdateFormValues}
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            id="inputEmail"
                                            placeholder="name@example.com"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputPassword">Password</label>
                                        <input
                                            value={formData.password}
                                            onChange={handleUpdateFormValues}
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            id="inputPassword"
                                            placeholder="Password"
                                        />
                                    </div>
                                    <h3>Permissions:</h3>
                                    <div className="row w-100 ms-5 ">
                                        {permissionsList.map((permission, index) => (
                                            <div key={index} className="col-md-5 ">
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        checked={checkedItems.includes(permission.id)}
                                                        id={permission.id}
                                                        name={permission.id}
                                                        onChange={handleCheckboxChange}
                                                    />

                                                    <label
                                                        className="form-check-label"
                                                        htmlFor={`permission-${permission.id}`}
                                                    >
                                                        {permission.permission}
                                                    </label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <button type="submit" className="btn btn-primary">
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default EditStaff

