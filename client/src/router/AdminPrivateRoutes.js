import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Outlet, useLocation } from "react-router-dom";
import { verify_admin_url } from "../constants/api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const token = localStorage.getItem('adminToken')
const AdminPrivateRoutes = () => {

    const [verified, setVerified] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const { user } = useSelector((state) => state.auth)
    console.log('this is user from redux', user)

    if (token === undefined && location.pathname == '/admin') {
        console.log('this is token', token, typeof token)
        navigate('/admin/login')
    } else if (token && location.pathname == '/admin') {
        navigate('/admin/dashboard')
    } else {
        verifyAdminRequest()
    }
    async function verifyAdminRequest() {
        try {
            const verifyResponse = await axios.get(verify_admin_url, {
                headers: {
                    authorization: token ? token : user.token
                }
            })

            if (verifyResponse.data.success) {

                setVerified(true)
            } else {
                toast.error('verification failed please relogin')
                setVerified(false)
            }
        } catch (error) {
            // toast.error(error.message)
            setVerified(false)
        }
    }






    return verified ? <Outlet /> : <div>loading</div>

}


export default AdminPrivateRoutes; 