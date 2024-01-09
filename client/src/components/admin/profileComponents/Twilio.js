import React, { useEffect, useState } from 'react'
import { get_twilio_settings, update_twilio_settings } from '../../../constants/api'
import axios from 'axios'
import toast from 'react-hot-toast'
const Twilio = () => {

    const [formData, setFormData] = useState({
        twilio_sid: "",
        twilio_token: "",
        twilio_phone: ""
    })

    const updateFormData = (e) => {
        setFormData((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const getTwilioSettingsFunction = async () => {
        try {
            const responseOfGetTwilioSettings = await axios.get(get_twilio_settings)
            console.log('this is twilio settings', responseOfGetTwilioSettings.data.twilio)
            setFormData(responseOfGetTwilioSettings.data.twilio)
        } catch (error) {
            console.log(error)
        }
    }


    const submitFormHandler = async (e) => {
        e.preventDefault()
        try {
            const responseOfUpdateTwilio = await axios.put(update_twilio_settings, formData)
            toast.success('twlio credentials updated successfully')
        } catch (error) {
            toast.error('something went wrong ')
        }
    }
    useEffect(() => {
        getTwilioSettingsFunction()
    }, [])
    return (
        <div className="col-md-6 col-lg-10 grid-margin stretch-card  mt-3">
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Twilio Credentials</h4>
                    <form onSubmit={submitFormHandler} className="forms-sample">
                        <div className="form-group row">
                            <label htmlFor="accountSID" className="col-sm-3 col-form-label">Account Sid</label>
                            <div className="col-sm-9">
                                <input type="text"
                                    onChange={updateFormData}
                                    value={formData.twilio_sid}
                                    name='twilio_sid'
                                    className="form-control" id="accountSID" placeholder="account SID" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="phoneNumber" className="col-sm-3 col-form-label">Token</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" id="token"
                                    onChange={updateFormData}
                                    value={formData.twilio_token}
                                    name='twilio_token'

                                    placeholder="token" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="phoneNumber" className="col-sm-3 col-form-label">Phone Number</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" id="phoneNumber"
                                    name='twilio_phone'
                                    onChange={updateFormData}
                                    value={formData.twilio_phone}
                                    placeholder="Phone Number" />
                            </div>
                        </div>

                        <div className="form-group row w-100 d-flex justify-content-end">
                            <div className="col-3 w-75 m-0">
                                <button type='submit' className='btn btn-warning from-control w-100'>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Twilio