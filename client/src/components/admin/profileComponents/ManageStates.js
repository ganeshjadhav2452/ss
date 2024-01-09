import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

import { get_all_states, get_states_url, update_states_url } from '../../../constants/api';

const ManageStates = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [states, setStates] = useState([])
    console.log('selected states id', selectedOptions)

    const handleSelectChange = (event) => {
        const selectedValues = Array.from(event.target.selectedOptions, (option) => Number(option.value));
        setSelectedOptions(selectedValues);
    };
    const fetchedStates = async () => {
        try {
            const fetchStateResponse = await axios.get(get_states_url)

            const userSelectedStates = fetchStateResponse.data.selectedStates.states ? JSON.parse(fetchStateResponse.data.selectedStates.states) : []
            console.log('this is received states', userSelectedStates)
            const selectedStatesId = [];

            for (let i = 0; i < userSelectedStates.length; i++) {

                selectedStatesId.push(userSelectedStates[i].id)
            }

            setStates(fetchStateResponse.data.states)
            setSelectedOptions(selectedStatesId)

        } catch (error) {
            console.log(error)
        }
    }

    const handleStateUpdate = async () => {


        const selectedPermissions = states.filter((states) => selectedOptions.includes(states.id))
        try {
            const payload = {

                selectedStates: selectedPermissions
            }

            const responseOfUpdateStates = await axios.put(update_states_url, payload)

            console.log('this is response of updated states', responseOfUpdateStates)
            toast.success('States Updated Successfully')
        } catch (error) {
            console.log(error)
            toast.error('something went wrong while updating states')
        }
    }

    useEffect(() => {
        fetchedStates()
    }, [])
    return (
        <div className="col-md-6 col-lg-10 grid-margin stretch-card  mt-3">
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Manage States</h4>

                    <div className="form-group row d-flex align-items-center justify-content-center">


                        {/* <select
                            className='col-sm-9 col-lg-6'
                            multiple
                            value={selectedOptions}
                            onChange={handleSelectChange}
                        >
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>

                        </select> */}
                        <div className="col-lg-6 dropdown-menu-static-demo " style={{
                            border: 'none'
                        }}>
                            <div className="dropdown w-100  ">

                                <div className="dropdown-menu show w-100" aria-labelledby="dropdownMenuButton4 w-100">
                                    <select className="dropdown-header  w-100 rounded h-100 rounded-4" multiple
                                        value={selectedOptions}
                                        onChange={handleSelectChange}>
                                        {states?.map((state) => (<option
                                            className={`dropdown-item w-100 ${selectedOptions.includes(state.id) ? 'bg-light border' : ''}`}
                                            key={state.id}
                                            value={state.id}
                                            aria-readonly={selectedOptions.includes(state.id)}
                                            multiple

                                        >
                                            {state.stateName}
                                        </option>))
                                        }
                                    </select>
                                    <button className='btn btn-warning fw-bold m-2' onClick={handleStateUpdate}>Update</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>


    )
}

export default ManageStates

