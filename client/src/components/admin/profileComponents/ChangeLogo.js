import React, { useEffect, useState } from 'react'
import { get_logo_url, get_settings_logo, update_settings_logo_url } from '../../../constants/api'
import axios from 'axios'
import toast from 'react-hot-toast'
const ChangeLogo = () => {
    const [oldLogo, setOldLogo] = useState('')
    const [logo, setLogo] = useState({})
    const [image, setImage] = useState('')
    const getLogo = async () => {
        try {
            const responseOfGetLogo = await axios.get(get_logo_url)
            console.log(responseOfGetLogo.data.logo)
            setOldLogo(responseOfGetLogo.data.logo.logo)
        } catch (error) {
            console.log(error)
        }
    }


    const updateSettingsLogo = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('logo', logo)
        try {
            const responseOfUpdateLogo = await axios.put(update_settings_logo_url, formData)
            toast.success('logo updated successfully')
        } catch (error) {
            console.log(error)
            toast.error('something went wrong while updating logo')
        }
    }

    const updateLogoState = (e) => {
        setLogo(e.target.files[0])
        setImage(URL.createObjectURL(e.target.files[0]))
    }
    useEffect(() => {
        getLogo()
    }, [])
    return (
        <div className="col-md-6 col-lg-10 grid-margin stretch-card  mt-3 h-50">
            <div className="card">
                <div className="card-body ">
                    <h4 className="card-title ">Change Logo  </h4>

                    <h6 className='text-dark fw-bold text-center m-0'>Upload Logo</h6>
                    <div className='row  w-100 d-flex justify-content-center align-items-center  h-100'>
                        <form onSubmit={updateSettingsLogo} className='col-10 d-flex flex-column h-100 m-3 align-items-center'>
                            {oldLogo && !image && <img src={`${get_settings_logo}/${oldLogo}`} alt='logo' className='img w-25 h-25 border m-3 rounded rounded-2' />}
                            {image && <img src={image} alt='logo' className='img w-25 h-25 border m-3 rounded rounded-2' />}
                            <input required onChange={updateLogoState} type="file" class="m-4 bg-warning rounded rounded-3" id="customFile" />
                            <button type='submit' className='btn btn-warning '>Update</button>
                        </form>

                    </div>
                </div>
            </div>
        </div>


    )
}

export default ChangeLogo