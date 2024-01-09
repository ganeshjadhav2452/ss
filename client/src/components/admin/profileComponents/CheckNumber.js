import React, { useEffect, useState } from 'react'
import { get_check_number, update_check_number, update_flight_stats } from '../../../constants/api'
import axios from 'axios'
import toast from 'react-hot-toast'

const CheckNumber = () => {

    const [formData, setFormData] = useState({
        check_number: ''

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
            const responseOfUpdateFlightStats = await axios.put(update_check_number, formData)

            toast.success('Check Number updated successfully')
        } catch (error) {
            console.log(error)
            toast.error('something went wrong while  updating Check Number ')
        }
    }


    const getCheckNumber = async () => {
        try {
            const responseOfGetCheckNumber = await axios.get(get_check_number)
            setFormData(responseOfGetCheckNumber.data.checkNumber)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getCheckNumber()
    }, [])
    return (
        <div className="col-md-6 col-lg-10 grid-margin stretch-card  mt-3">
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Twilio Credentials</h4>
                    <form onSubmit={formSubmitHandler} className="forms-sample">
                        <div className="form-group row">
                            <label htmlFor="checkNumber" className="col-sm-3 col-form-label">Check Number</label>
                            <div className="col-sm-9">
                                <input type="text"
                                    required
                                    onChange={updateFormValues}
                                    value={formData.check_number}
                                    name='check_number'
                                    className="form-control" id="checkNumber" placeholder="check Number" />
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

export default CheckNumber