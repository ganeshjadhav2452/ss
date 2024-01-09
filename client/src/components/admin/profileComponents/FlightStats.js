import React, { useEffect, useState } from 'react'
import { get_flight_stats_url, update_flight_stats } from '../../../constants/api'
import axios from 'axios'
import toast from 'react-hot-toast'
const FlightStats = () => {

    const [formData, setFormData] = useState({
        flight_appkey: '',
        flight_appid: ''
    })


    const updateFormValues = (e) => {
        setFormData((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }


    const formSubmitHandler = async (e) => {
        e.preventDefault()

        try {
            const responseOfUpdateFlightStats = await axios.put(update_flight_stats, formData)

            toast.success('Flight Stats updated successfully')
        } catch (error) {
            console.log(error)
            toast.error('something went wrong while updating Flight Stats')
        }
    }


    const getFlightStats = async () => {
        try {
            const responseOfGetFlightStats = await axios.get(get_flight_stats_url)
            setFormData(responseOfGetFlightStats.data.flightStats)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getFlightStats()
    }, [])
    return (
        <div className="col-md-6 col-lg-10 grid-margin stretch-card  mt-3">
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Flight Stats</h4>
                    <form onSubmit={formSubmitHandler} className="forms-sample">
                        <div className="form-group row">
                            <label htmlFor="appIds" className="col-sm-3 col-form-label">App Id</label>
                            <div className="col-sm-9">
                                <input type="text"
                                    onChange={updateFormValues}
                                    value={formData.flight_appid}
                                    name='flight_appid'
                                    className="form-control" id="accountSID" placeholder="app Id" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="phoneNumber" className="col-sm-3 col-form-label">App Key</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" id="token"

                                    name='flight_appkey'
                                    onChange={updateFormValues}
                                    value={formData.flight_appkey}
                                    placeholder="app Key" />
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

export default FlightStats