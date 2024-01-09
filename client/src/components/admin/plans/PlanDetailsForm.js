import React, { useEffect, useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import CreatableSelect from 'react-select';
import { get_all_companies, get_countries, get_states_url } from "../../../constants/api";
import axios from 'axios'


const PlanDetailsForm = () => {

  const [statesList, setStatesList] = useState([])
  const [companyList, setCompanyList] = useState([])
  const [countriesList, setCountriesList] = useState([])
  console.log('this is companylist', companyList)
  const [missedConnectionAddMore, setMissedConnectionAddMore] = useState([]);
  const [nonMedicalEvacuationAddMore, setnonMedicalEvacuationAddMore] =
    useState([]);
  const [baggageDelayAddMore, setBaggageDelayAddMore] = useState([]);
  const [flightAccidentalAddMore, setFlightAccidentalAddMore] = useState([]);
  const [add24HourAssistantAddMore, setHourAssistantAddMore] = useState([]);
  const [inactive_states, setInactive_states] = useState([]);
  const [cc_type, setcc_type] = useState([]);
  const [inactive_country, setInactive_countries] = useState([]);
  const [formData, setFormData] = useState({
    company: {},
    plan_name: "",
    plan_nickname: "",
    plan_fees: "",
    api_details: "",
    status: false,
    cc_type: "",
    max_tour_time: "",
    option_extend_day: "",
    price_extend_day: "",
    plan_commission: "",
    plan_certificate_all: "",
    underwritten_by: "",
    plan_certificate_all: "",
    refund_policy: "",
    policy_exclusion: "",
    checkout_msg: "",
    mode: "",
    am_best_rating: "",
    start_plan_on_day_of_departure: false,
  });
  // states of second part of form which will go in plan_coverage table

  const [cancellation_and_delay, setcancellation_and_delay] = useState("");
  const [trip_cancellation, settrip_cancellation] = useState({});
  const [trip_interruption, settrip_interruption] = useState({});
  const [cancel_for_any_reason, setcancel_for_any_reason] = useState({});
  const [cancel_for_work_reason, setcancel_for_work_reason] = useState({});
  const [travel_delay, settravel_delay] = useState({});
  const [medical, setMedical] = useState("");
  const [emergency_medical, setemergency_medical] = useState({});
  const [medical_deductible, setmedical_deductible] = useState({});
  const [pre_existing_condition, setpre_existing_condition] = useState({});
  const [pre_existing_look_back, setpre_existing_look_back] = useState({});
  const [medical_evacuation, setmedical_evacuation] = useState([]);
  const [company, setCompany] = useState([])
  const [baggage, setbaggage] = useState([]);
  const [baggageLoss, setbaggageLoss] = useState([]);

  const [accidentalDeath, setaccidentalDeath] = useState({})
  const [accidentalDeathAndDismemberment, setaccidentalDeathAndDismemberment] =
    useState([]);
  const [commonCarrierAccidentalDeath, setcommonCarrierAccidentalDeath] =
    useState([]);

  const [otherBenefits, setotherBenefits] = useState([]);
  const [rental_car_damage, setrental_car_damage] = useState([]);
  const [hoursAssistanceValue, hoursAssistatnceValue] = useState([]);
  const [missed_connectionValue, setmissed_connectionValue] = useState([
    {
      header: "",
      value: "",
      serial: "",
    },
  ]);
  const [non_medical_evacuationValue, setnon_medical_evacuationValue] = useState([
    {
      header: "",
      value: "",
      serial: "",
    },
  ]);
  const [baggageDelayValue, setbaggageDelayValue] = useState({});
  const [flightAccidentalDeathValue, setflightAccidentalDeathValue] = useState([]);
  // dynamic inputes fields
  const [missed_connection, setmissed_connection] = useState([
    {
      header: "",
      value: "",
      serial: "",
    },
  ]);
  const [non_medical_evacuation, setnon_medical_evacuation] = useState([
    {
      header: "",
      value: "",
      serial: "",
    },
  ]);
  const [baggageDelay, setbaggageDelay] = useState([
    {
      header: "",
      value: "",
      serial: "",
    },
  ]);
  const [flightAccidentalDeath, setflightAccidentalDeath] = useState([
    {
      header: "",
      value: "",
      serial: "",
    },
  ]);
  const [assistance24Hour, setassistance24Hour] = useState([
    {
      header: "",
      value: "",
      serial: "",
    },
  ]);

  // dynamic input fields value update functions
  const handleChange = (e, i) => {
    const inputdata = [...missed_connection];

    const obj = {
      ...missed_connection[i],
      [e.target.name]: e.target.value,
    };
    inputdata[i] = obj;
    setmissed_connection(inputdata);
  };
  const non_medical_evacuation_change_handler = (e, i) => {
    const inputdata = [...non_medical_evacuation];

    const obj = {
      ...non_medical_evacuation[i],
      [e.target.name]: e.target.value,
    };
    inputdata[i] = obj;
    setnon_medical_evacuation(inputdata);
  };
  const baggageDelay_change_handler = (e, i) => {
    const inputdata = [...baggageDelay];

    const obj = {
      ...baggageDelay[i],
      [e.target.name]: e.target.value,
    };
    inputdata[i] = obj;
    setbaggageDelay(inputdata);
  };
  const flightAccidentalDeath_change_handler = (e, i) => {
    const inputdata = [...flightAccidentalDeath];

    const obj = {
      ...flightAccidentalDeath[i],
      [e.target.name]: e.target.value,
    };
    inputdata[i] = obj;
    setflightAccidentalDeath(inputdata);
  };
  const assistance24Hour_change_handler = (e, i) => {
    const inputdata = [...assistance24Hour];

    const obj = {
      ...assistance24Hour[i],
      [e.target.name]: e.target.value,
    };
    inputdata[i] = obj;
    setassistance24Hour(inputdata);
  };

  // state update variables
  const handleSelectCompanyChange = (newValue, actionMeta) => {

    setCompany(newValue);
    console.log('Selected company:', newValue, actionMeta);
  };
  const handleSelectInactiveStatesChange = (newValue, actionMeta) => {

    setInactive_states(newValue);
    console.log('Selected company:', newValue, actionMeta);
  };
  const handleSelectInactiveCountriesChange = (newValue, actionMeta) => {

    setInactive_countries(newValue);
    console.log('Selected company:', newValue, actionMeta);
  };
  const updateCancellationAndDelay = (e) => {
    setcancellation_and_delay(e.target.value);
  };

  const updateTripIntruption = (e) => {
    settrip_interruption((prev) => {
      if (e.target.name == 'filter') {
        return {
          ...prev,
          [e.target.name]: e.target.checked
        }
      } else {
        return {
          ...prev,
          [e.target.name]: e.target.value
        }
      }

    });
  };
  const updateTripCancellation = (e) => {
    settrip_cancellation((prev) => {
      if (e.target.name == 'filter') {
        return {
          ...prev,
          [e.target.name]: e.target.checked
        }
      } else {
        return {
          ...prev,
          [e.target.name]: e.target.value
        }
      }
    });
  };
  const updateCancelForAnyReason = (e) => {
    setcancel_for_any_reason((prev) => {
      if (e.target.name == 'filter') {
        return {
          ...prev,
          [e.target.name]: e.target.checked
        }
      } else {
        return {
          ...prev,
          [e.target.name]: e.target.value
        }
      }
    });
  };
  const updateCancelForWork = (e) => {
    setcancel_for_work_reason((prev) => {
      if (e.target.name == 'filter') {
        return {
          ...prev,
          [e.target.name]: e.target.checked
        }
      } else {
        return {
          ...prev,
          [e.target.name]: e.target.value
        }
      }
    });
  };
  const updateForTravelDelay = (e) => {
    settravel_delay((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const updateMedical = (e) => {
    setMedical(e.target.value);
  };
  const updateMissedConnection = (e) => {
    setmissed_connectionValue((prev) => {
      if (e.target.name == 'filter') {
        return {
          ...prev,
          [e.target.name]: e.target.checked
        }
      } else {
        return {
          ...prev,
          [e.target.name]: e.target.value
        }
      }
    });
  };
  const updateEmergencyMedical = (e) => {
    setemergency_medical((prev) => {
      if (e.target.name == 'filter') {
        return {
          ...prev,
          [e.target.name]: e.target.checked
        }
      } else {
        return {
          ...prev,
          [e.target.name]: e.target.value
        }
      }
    });
  };
  const updateMedicalDeductible = (e) => {
    setmedical_deductible((prev) => {
      if (e.target.name == 'no_deductible') {
        return {
          ...prev,
          [e.target.name]: e.target.checked
        }
      } else {
        return {
          ...prev,
          [e.target.name]: e.target.value
        }
      }
    });
  };
  const updatePreExistingCondition = (e) => {
    setpre_existing_condition((prev) => {
      if (e.target.name == 'filter') {
        return {
          ...prev,
          [e.target.name]: e.target.checked
        }
      } else {
        return {
          ...prev,
          [e.target.name]: e.target.value
        }
      }
    });
  };
  const updatePreExistingLookBack = (e) => {
    setpre_existing_look_back((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const updatemedicalEvacuation = (e) => {
    setmedical_evacuation((prev) => {
      if (e.target.name == 'filter') {
        return {
          ...prev,
          [e.target.name]: e.target.checked
        }
      } else {
        return {
          ...prev,
          [e.target.name]: e.target.value
        }
      }
    });
  };
  const updateNonMedicalEvacuation = (e) => {
    setnon_medical_evacuationValue((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const updateBaggage = (e) => {
    setbaggage((prev) => {
      if (e.target.name == 'filter') {
        return {
          ...prev,
          [e.target.name]: e.target.checked
        }
      } else {
        return {
          ...prev,
          [e.target.name]: e.target.value
        }
      }
    });
  };
  const updateBaggageLoss = (e) => {
    setbaggageLoss((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const updateBaggageDelayValue = (e) => {
    setbaggageDelayValue((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const updateAccidentalDeath = (e) => {
    setaccidentalDeath((prev) => {
      if (e.target.name == 'filter') {
        return {
          ...prev,
          [e.target.name]: e.target.checked
        }
      } else {
        return {
          ...prev,
          [e.target.name]: e.target.value
        }
      }
    });
  };
  const updateAccidentalDeathAndDismemberment = (e) => {
    setaccidentalDeathAndDismemberment((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const updateCommonCarrierAccidentalDeath = (e) => {
    setcommonCarrierAccidentalDeath((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const updateFlightAccidentalDeathAndDismemberment = (e) => {
    setflightAccidentalDeathValue((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const updateRentalCarDamange = (e) => {
    setrental_car_damage((prev) => {
      if (e.target.name == 'filter') {
        return {
          ...prev,
          [e.target.name]: e.target.checked
        }
      } else {
        return {
          ...prev,
          [e.target.name]: e.target.value
        }
      }
    });
  };
  const update24HoursAssistantValue = (e) => {
    hoursAssistatnceValue((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const updateOtherBenifits = (e) => {
    setotherBenefits(e.target.value);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    if (checked) {
      setcc_type([...cc_type, name]); // Add the checkbox value to the array if checked
    } else {
      setcc_type(cc_type.filter((item) => item !== name)); // Remove the checkbox value from the array if unchecked
    }
  };
  const updateFormData = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const remove24HourAssistant = (idx) => {
    let newArr = [];
    for (let i = 0; i < add24HourAssistantAddMore.length; i++) {
      if (i == idx) continue;
      newArr.push(0);
    }
    setHourAssistantAddMore(newArr);
  };
  const removeFlightAccidental = (idx) => {
    let newArr = [];
    for (let i = 0; i < flightAccidentalAddMore.length; i++) {
      if (i == idx) continue;
      newArr.push(0);
    }
    setFlightAccidentalAddMore(newArr);
  };
  const removeMissedConnection = (idx) => {
    let newArr = [];
    for (let i = 0; i < missedConnectionAddMore.length; i++) {
      if (i == idx) continue;
      newArr.push(0);
    }
    setMissedConnectionAddMore(newArr);
  };
  const removeBaggageDelay = (idx) => {
    let newArr = [];
    for (let i = 0; i < baggageDelayAddMore.length; i++) {
      if (i == idx) continue;
      newArr.push(0);
    }
    setBaggageDelayAddMore(newArr);
  };
  const removeNoneMedicalEvacuation = (idx) => {
    let newArr = [];
    for (let i = 0; i < nonMedicalEvacuationAddMore.length; i++) {
      if (i == idx) continue;
      newArr.push(0);
    }
    setnonMedicalEvacuationAddMore(newArr);
  };
  const update24HourAssistant = (e) => {
    setHourAssistantAddMore((prev) => {
      return [...prev, []];
    });
  };
  const updateFlightAccidental = (e) => {
    setFlightAccidentalAddMore((prev) => {
      return [...prev, []];
    });
  };
  const updateBaggageDelay = (e) => {
    setBaggageDelayAddMore((prev) => {
      return [...prev, []];
    });
  };
  const updateSetMissedConnectionAddMore = (e) => {
    setMissedConnectionAddMore((prev) => {
      return [...prev, []];
    });
  };
  const updateNonMedicalEvacuationAddMore = (e) => {
    setnonMedicalEvacuationAddMore((prev) => {
      return [...prev, []];
    });
  };


  const getCompanyList = async () => {
    try {
      const responseOfGetCompanies = await axios.get(get_all_companies)

      console.log('this is company list ', responseOfGetCompanies.data.companies)

      let newArr = []

      for (let i = 0; i < responseOfGetCompanies.data.companies.length; i++) {
        let obj = {}
        obj.label = responseOfGetCompanies.data.companies[i].company_name
        obj.value = responseOfGetCompanies.data.companies[i].company_name
        obj.id = responseOfGetCompanies.data.companies[i].id
        console.log('this is obj', obj)
        newArr.push(obj)

      }
      setCompanyList(newArr)


    } catch (error) {
      console.log(error)
    }
  }


  const getStatesList = async () => {
    try {
      const responseOfGetStatesList = await axios.get(get_states_url)

      let newArr = []

      for (let i = 0; i < responseOfGetStatesList.data.states.length; i++) {
        let obj = {}
        obj.label = responseOfGetStatesList.data.states[i].stateName
        obj.value = responseOfGetStatesList.data.states[i].stateName
        obj.id = responseOfGetStatesList.data.states[i].id
        console.log('this is obj', obj)
        newArr.push(obj)

      }
      setStatesList(newArr)

    } catch (error) {
      console.log(error)

    }
  }

  const getCountryList = async () => {
    try {
      const response = await axios.get(get_countries)

      let newArr = []

      for (let i = 0; i < response.data.countries.length; i++) {
        let obj = {}
        obj.label = response.data.countries[i].countryName
        obj.value = response.data.countries[i].countryName
        obj.id = response.data.countries[i].id
        console.log('this is obj', obj)
        newArr.push(obj)

      }
      setCountriesList(newArr)
    } catch (error) {

    }
  }
  useEffect(() => {
    getCompanyList()
    getStatesList()
    getCountryList()
  }, [])
  const formsubmitHandler = async (e) => {
    e.preventDefault();
    // ... (your existing state declarations)

    // Add console.log statements to check the initial state values

    console.log('inactive_states:', inactive_states);
    console.log('cc_type:', cc_type);
    console.log('inactive_country:', inactive_country);
    console.log('formData:', formData);
    console.log('cancellation_and_delay:', cancellation_and_delay);
    console.log('trip_cancellation:', trip_cancellation);
    console.log('trip_interruption:', trip_interruption);
    console.log('cancel_for_any_reason:', cancel_for_any_reason);
    console.log('cancel_for_work_reason:', cancel_for_work_reason);
    console.log('travel_delay:', travel_delay);
    console.log('medical:', medical);
    console.log('emergency_medical:', emergency_medical);
    console.log('medical_deductible:', medical_deductible);
    console.log('pre_existing_condition:', pre_existing_condition);
    console.log('pre_existing_look_back:', pre_existing_look_back);
    console.log('medical_evacuation:', medical_evacuation);
    console.log('baggage:', baggage);
    console.log('baggageLoss:', baggageLoss);
    console.log('accidentalDeath:', accidentalDeath);
    console.log('accidentalDeathAndDismemberment:', accidentalDeathAndDismemberment);
    console.log('commonCarrierAccidentalDeath:', commonCarrierAccidentalDeath);
    console.log('otherBenefits:', otherBenefits);
    console.log('rental_car_damage:', rental_car_damage);
    console.log('hoursAssistanceValue:', hoursAssistanceValue);
    console.log('missed_connection:', missed_connection);
    console.log('non_medical_evacuation:', non_medical_evacuation);
    console.log('baggageDelay:', baggageDelay);
    console.log('flightAccidentalDeath:', flightAccidentalDeath);
    console.log('assistance24Hour:', assistance24Hour);


    try {
    } catch (error) { }
  };
  return (
    <div className="col-12 grid-margin stretch-card">
      <div className="col-12 grid-margin">
        <div className="">
          <div className="card-body">
            <h4 className="card-title">Add Plan</h4>
            <form onSubmit={formsubmitHandler} className="form-sample ">
              <div className="row">
                <div className="col-md-3">
                  <div className="form-group">
                    <label>Company</label>
                    <CreatableSelect options={companyList} onChange={handleSelectCompanyChange} value={company} />

                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label>Inactive Countries</label>
                    <CreatableSelect isMulti options={countriesList} onChange={handleSelectInactiveCountriesChange} />
                    {/* <select multiple className="form-control">
                      {[...Array(20)].map((_, index) => (
                        <option key={index}>Category {index + 1}</option>
                      ))}
                    </select>  */}
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label>Plan Names</label>
                    <input
                      value={formData.plan_name}
                      onChange={updateFormData}
                      name="plan_name"
                      type="text"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label>Plan Nick Name</label>
                    <input
                      value={formData.plan_nickname}
                      onChange={updateFormData}
                      name="plan_nickname"
                      type="text"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label>Plan Fees</label>
                    <input
                      name="plan_fees"
                      value={formData.plan_fees}
                      onChange={updateFormData}
                      type="text"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label>Inactive State</label>
                    <CreatableSelect isMulti options={statesList} onChange={handleSelectInactiveStatesChange} />

                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label>Plan Commission</label>
                    <input
                      name="plan_commission"
                      value={formData.plan_commission}
                      onChange={updateFormData}
                      type="text"
                      className="form-control"
                    />
                  </div>
                </div>
                {/* <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Address 1</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label>State</label>
                                        <input  type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label>Address 2</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label>Postcode</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label>City</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label>Country</label>
                                        <select className="form-control">
                                            <option>America</option>
                                            <option>Italy</option>
                                            <option>Russia</option>
                                            <option>Britain</option>
                                        </select>
                                    </div>
                                </div> */}
                <div className="col-md-3">
                  <div className="form-group">
                    <label>Underwritten by :</label>
                    <input
                      name="underwritten_by"
                      value={formData.underwritten_by}
                      onChange={updateFormData}
                      type="text"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label>AM Best rating :</label>
                    <input
                      name="am_best_rating"
                      value={formData.am_best_rating}
                      onChange={updateFormData}
                      type="text"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label>Refund Policy :</label>
                    <input
                      name="refund_policy"
                      value={formData.refund_policy}
                      onChange={updateFormData}
                      type="text"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label>Policy Exclusions Text:</label>
                    <input
                      name="policy_exclusion"
                      value={formData.policy_exclusion}
                      onChange={updateFormData}
                      type="text"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label>Max Tour Time Days:</label>
                    <input
                      name="max_tour_time"
                      value={formData.max_tour_time}
                      onChange={updateFormData}
                      type="text"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="form-group">
                    <label>Optional Extend Days:</label>
                    <input
                      name="option_extend_day"
                      value={formData.option_extend_day}
                      onChange={updateFormData}
                      type="number"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="form-group">
                    <label>Price Per Extend Day:</label>
                    <input
                      name="price_extend_day"
                      value={formData.price_extend_day}
                      onChange={updateFormData}
                      type="number"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-2 ms-4">
                  <div className="form-group ">
                    <div className="form-check ">
                      <input
                        value={formData.start_plan_on_day_of_departure}
                        onChange={updateFormData}
                        className="form-check-input m-0"
                        type="checkbox"
                        id="checkbox1"
                        name="start_plan_on_day_of_departure"
                      />
                      <label className="form-check-label" htmlFor="checkbox1">
                        Do you want to start plan on same day of departure?:
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row d-flex ">
                <div className="col-lg-6">
                  <div className="form-group ms-4">
                    <label>Mode</label>
                    <div className="form-check">
                      <input
                        onChange={updateFormData}
                        value="live"
                        checked={formData.mode === "live"}
                        className="form-check-input"
                        type="radio"
                        name="mode"
                        id="live"
                      />
                      <label className="form-check-label" htmlFor="live">
                        Live
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        onChange={updateFormData}
                        value="test"
                        checked={formData.mode === "test"}
                        className="form-check-input"
                        type="radio"
                        name="mode"
                        id="test"
                      />
                      <label className="form-check-label" htmlFor="test">
                        Test
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="checkoutMessage">Checkout Message:</label>
                    <div className="card flex justify-content-center">
                      <InputTextarea
                        name="checkout_msg"
                        value={formData.checkout_msg}
                        onChange={updateFormData}
                        rows={5}
                        cols={30}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6    ">
                  <div className="form-group">
                    <label>Status:</label>
                    <div className="form-check">
                      <input
                        onChange={updateFormData}
                        value={"active"}
                        checked={formData.status === "active"}
                        className="form-check-input"
                        type="radio"
                        name="status"
                        id="active"
                      />
                      <label className="form-check-label" htmlFor="active">
                        Active
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        onChange={updateFormData}
                        value={"deactive"}
                        checked={formData.status === "deactive"}
                        className="form-check-input"
                        type="radio"
                        name="status"
                        id="deactive"
                      />
                      <label className="form-check-label" htmlFor="deactive">
                        Deactive
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>CC Types</label>
                    <div className=" d-flex flex-row justify-content-around  m-3 ">
                      <div className="d-flex align-items-center justify-content-center">
                        <Checkbox
                          inputId="ingredient1"
                          name="America Express"
                          value="America Express"
                          onChange={handleCheckboxChange}
                          checked={cc_type.includes("America Express")}
                        />
                        <label htmlFor="ingredient1" className=" m-3">
                          America Express
                        </label>
                      </div>
                      <div className="d-flex align-items-center justify-content-center">
                        <Checkbox
                          inputId="ingredient2"
                          name="Visa"
                          value="Visa"
                          onChange={handleCheckboxChange}
                          checked={cc_type.includes("Visa")}
                        />
                        <label htmlFor="ingredient2" className=" m-3">
                          Visa
                        </label>
                      </div>
                      <div className="d-flex align-items-center justify-content-center">
                        <Checkbox
                          inputId="ingredient3"
                          name="Mastercard"
                          value="Mastercard"
                          onChange={handleCheckboxChange}
                          checked={cc_type.includes("Mastercard")}
                        />
                        <label htmlFor="ingredient3" className=" m-3">
                          Mastercard
                        </label>
                      </div>
                    </div>
                    <div className=" d-flex flex-row justify-content-around  m-3 ">
                      <div className="d-flex align-items-center justify-content-center">
                        <Checkbox
                          inputId="ingredient1"
                          name="Discover"
                          value="Discover"
                          onChange={handleCheckboxChange}
                          checked={cc_type.includes("Discover")}
                        />
                        <label htmlFor="ingredient1" className=" m-3">
                          Discover
                        </label>
                      </div>
                      <div className="d-flex align-items-center justify-content-center">
                        <Checkbox
                          inputId="ingredient4"
                          name="Diners Club"
                          value="Diners Club"
                          onChange={handleCheckboxChange}
                          checked={cc_type.includes("Diners Club")}
                        />
                        <label htmlFor="ingredient4" className=" m-3">
                          Diners Club
                        </label>
                      </div>
                      <div className="d-flex align-items-center justify-content-center">
                        <Checkbox
                          inputId="ingredient4"
                          name="JCB"
                          value="JCB"
                          onChange={handleCheckboxChange}
                          checked={cc_type.includes("JCB")}
                        />
                        <label htmlFor="ingredient4" className=" m-3">
                          JCB
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <hr />
              <>
                <div className="row d-flex flex-column justify-content-center align-items-center">
                  <p className="fw-bold">Plan Coverages</p>
                  <div className="col-lg-12">
                    <div className="row">
                      <label className="col-lg-4 fw-bold">Coverage Name</label>
                      <label className="col-lg-6 fw-bold">
                        Coverage Amount
                      </label>
                      <label className="col-lg-2 fw-bold">
                        Coverage Add To Filter
                      </label>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="row">
                      <label className="col-lg-3 ">Cancellation & Delay</label>
                      <div className="col-lg-7">
                        {" "}
                        <div className="row d-flex justify-content-around">
                          <InputText
                            id="integer"
                            type="text"
                            className="col-12 rounded rounded-4"
                            value={cancellation_and_delay}
                            onChange={updateCancellationAndDelay}
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 "></div>
                    </div>

                    <div className="row mt-3">
                      <label className="col-lg-3 ">Trip Interruption</label>
                      <div className="col-lg-7">
                        {" "}
                        <div className="row d-flex justify-content-around">
                          <InputText
                            value={trip_interruption.value}
                            onChange={updateTripIntruption}
                            id="integer"
                            type="text"
                            name="value"
                            className="col-7 rounded rounded-4"
                          />
                          <InputText
                            value={trip_interruption.percentage}
                            onChange={updateTripIntruption}
                            id="integer"
                            type="text"
                            name="percentage"
                            className="col-2 rounded rounded-4 "
                            placeholder="%"
                          />
                          <InputText
                            id="integer"
                            type="text"
                            value={trip_interruption.serial}
                            onChange={updateTripIntruption}
                            name="serial"
                            className="col-2 rounded rounded-4"
                            placeholder="Serial"
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 d-flex justify-content-center ">
                        <Checkbox
                          inputId="ingredient1"
                          name="filter"
                          checked={trip_interruption.filter}
                          onChange={updateTripIntruption}
                        />
                      </div>
                    </div>
                    <div className="row mt-3">
                      <label className="col-lg-3 ">Trip Cancellation</label>
                      <div className="col-lg-7">
                        <div className="row d-flex justify-content-around">
                          <InputText
                            name="value"
                            onChange={updateTripCancellation}
                            value={trip_cancellation.value}
                            type="text"
                            id="integer"
                            className="col-7 rounded rounded-4"
                          />
                          <InputText
                            id="integer"
                            name="percentage"
                            onChange={updateTripCancellation}
                            value={trip_cancellation.percentage}
                            type="text"
                            className="col-2 rounded rounded-4 "
                            placeholder="%"
                          />
                          <InputText
                            name="serial"
                            onChange={updateTripCancellation}
                            value={trip_cancellation.serial}
                            type="text"
                            id="integer"
                            keyfilter="int"
                            className="col-2 rounded rounded-4"
                            placeholder="Serial"
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 d-flex justify-content-center ">
                        <Checkbox
                          name="filter"
                          onChange={updateTripCancellation}
                          checked={trip_cancellation.filter}
                          type="checkbox"
                          inputId="ingredient1"
                        />
                      </div>
                    </div>
                    <div className="row mt-3">
                      <label className="col-lg-3 ">Cancel For Any Reason</label>
                      <div className="col-lg-7">
                        {" "}
                        <div className="row d-flex justify-content-around">
                          <InputText
                            id="integer"
                            name="value"
                            onChange={updateCancelForAnyReason}
                            value={cancel_for_any_reason.value}
                            type="text"
                            className="col-3 rounded rounded-4"
                          />
                          <InputText
                            id="integer"
                            name="day1"
                            onChange={updateCancelForAnyReason}
                            value={cancel_for_any_reason.day1}
                            type="text"
                            className="col-2 rounded rounded-4 "
                            placeholder="Day1"
                          />
                          <InputText
                            name="day2"
                            onChange={updateCancelForAnyReason}
                            value={cancel_for_any_reason.day2}
                            type="text"
                            id="integer"
                            keyfilter="int"
                            className="col-2 rounded rounded-4 "
                            placeholder="Day2"
                          />
                          <InputText
                            id="integer"
                            name="percentage"
                            onChange={updateCancelForAnyReason}
                            value={cancel_for_any_reason.percentage}
                            type="text"
                            className="col-2 rounded rounded-4 "
                            placeholder="%"
                          />
                          <InputText
                            id="integer"
                            name="serial"
                            onChange={updateCancelForAnyReason}
                            value={cancel_for_any_reason.serial}
                            type="text"
                            className="col-2 rounded rounded-4"
                            placeholder="Serial"
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 d-flex justify-content-center ">
                        <Checkbox
                          name="filter"
                          onChange={updateCancelForAnyReason}
                          checked={cancel_for_any_reason.filter}
                          type="text"
                          inputId="ingredient1"
                        />
                      </div>
                    </div>
                    <div className="row mt-3">
                      <label className="col-lg-3 ">
                        Cancel For Work Reason
                      </label>
                      <div className="col-lg-7">
                        {" "}
                        <div className="row d-flex justify-content-around">
                          <InputText
                            name="value"
                            onChange={updateCancelForWork}
                            value={cancel_for_work_reason.value}
                            type="text"
                            id="integer"
                            keyfilter="int"
                            className="col-3 rounded rounded-4"
                          />
                          <InputText
                            id="integer"
                            name="day1"
                            onChange={updateCancelForWork}
                            value={cancel_for_work_reason.day1}
                            className="col-2 rounded rounded-4 "
                            placeholder="Day1"
                          />
                          <InputText
                            name="day2"
                            onChange={updateCancelForWork}
                            value={cancel_for_work_reason.day2}
                            type="text"
                            id="integer"
                            className="col-2 rounded rounded-4 "
                            placeholder="Day2"
                          />
                          <InputText
                            name="percentage"
                            onChange={updateCancelForWork}
                            value={cancel_for_work_reason.percentage}
                            type="text"
                            id="integer"
                            className="col-2 rounded rounded-4 "
                            placeholder="%"
                          />
                          <InputText
                            id="integer"
                            name="serial"
                            onChange={updateCancelForWork}
                            value={cancel_for_work_reason.serial}
                            type="text"
                            className="col-2 rounded rounded-4"
                            placeholder="Serial"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <label className="col-lg-3 ">Travel Delay</label>
                      <div className="col-lg-7">
                        {" "}
                        <div className="row d-flex justify-content-around">
                          <InputText
                            id="integer"
                            name="value"
                            onChange={updateForTravelDelay}
                            value={travel_delay.value}
                            type="text"
                            className="col-9 rounded rounded-4"
                          />

                          <InputText
                            id="integer"
                            name="serial"
                            onChange={updateForTravelDelay}
                            value={travel_delay.serial}
                            type="text"
                            className="col-2 rounded rounded-4"
                            placeholder="Serial"
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 d-flex justify-content-center ">
                        <Checkbox
                          inputId="ingredient1"
                          name="filter"
                          onChange={updateCancelForWork}
                          checked={cancel_for_work_reason.filter}
                        />
                      </div>
                    </div>
                    <div className="row mt-3">
                      <label className="col-lg-3 ">Missed Connection</label>
                      <div className="col-lg-7">
                        {" "}
                        <div className="row d-flex justify-content-around align-items-center">
                          <InputText
                            name="value"
                            onChange={updateMissedConnection}
                            value={missed_connectionValue.value}
                            type="text"
                            id="integer"
                            className="col-7 rounded rounded-4"
                          />

                          <InputText
                            id="integer"
                            name="serial"
                            onChange={updateMissedConnection}
                            value={missed_connection.serial}
                            type="text"
                            className="col-2 rounded rounded-4 "
                            placeholder="Serial"
                          />
                          <Checkbox
                            className="col-2"
                            inputId="ingredient1"
                            name="filter"
                            onChange={updateMissedConnection}
                            checked={missed_connection.filter}
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 d-flex justify-content-center ">
                        <button
                          onClick={updateSetMissedConnectionAddMore}
                          type="button"
                          class="btn btn-success"
                        >
                          Add More
                        </button>
                      </div>
                    </div>
                    {missedConnectionAddMore.map((val, idx) => (
                      <div className="row mt-3">
                        <InputText
                          id="integer"
                          type="text"
                          name="header"
                          className="col-lg-3 rounded rounded-4"
                          onChange={(e) => handleChange(e, idx)}
                        />
                        <div className="col-lg-7">
                          {" "}
                          <div className="row d-flex justify-content-around align-items-center">
                            <InputText
                              name="value"
                              id="integer"
                              type="text"
                              className="col-9 rounded rounded-4"
                              onChange={(e) => handleChange(e, idx)}
                            />

                            <InputText
                              name="serial"
                              id="integer"
                              type="text"
                              className="col-2 rounded rounded-4 "
                              placeholder="Serial"
                              onChange={(e) => handleChange(e, idx)}
                            />
                          </div>
                        </div>
                        <div className="col-lg-2 d-flex justify-content-center ">
                          <button
                            onClick={() => removeMissedConnection(idx)}
                            type="button"
                            class="btn btn-danger"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="row mt-3">
                      <label className="col-lg-3 ">Medical</label>
                      <div className="col-lg-7">
                        {" "}
                        <div className="row d-flex justify-content-around">
                          <InputText
                            name="value"
                            onChange={updateMedical}
                            value={medical.value}
                            type="text"
                            id="integer"
                            className="col-12 rounded rounded-4"
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 d-flex justify-content-center align-items-center "></div>
                    </div>
                    <div className="row mt-3">
                      <label className="col-lg-3 ">Emergency Medical</label>
                      <div className="col-lg-7">
                        <div className="row d-flex justify-content-around">
                          <InputText
                            id="integer"
                            name="value"
                            onChange={updateEmergencyMedical}
                            value={emergency_medical.value}
                            type="text"
                            className="col-9 rounded rounded-4"
                          />

                          <InputText
                            id="integer"
                            name="serial"
                            onChange={updateEmergencyMedical}
                            value={emergency_medical.serial}
                            type="text"
                            className="col-2 rounded rounded-4"
                            placeholder="Serial"
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 d-flex justify-content-center ">
                        <Checkbox
                          inputId="ingredient1"
                          name="filter"
                          onChange={updateEmergencyMedical}
                          checked={emergency_medical.filter}
                        />
                      </div>
                    </div>
                    <div className="row mt-3">
                      <label className="col-lg-3 ">Medical Deductible</label>
                      <div className="col-lg-7">
                        <div className="row d-flex justify-content-around">
                          <InputText
                            id="integer"
                            name="value"
                            onChange={updateMedicalDeductible}
                            value={medical_deductible.value}
                            type="text"
                            className="col-9 rounded rounded-4"
                          />

                          <InputText
                            id="integer"
                            name="serial"
                            onChange={updateMedicalDeductible}
                            value={medical_deductible.serial}
                            type="text"
                            className="col-2 rounded rounded-4"
                            placeholder="Serial"
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 d-flex justify-content-center ">
                        <Checkbox
                          inputId="ingredient1"
                          name="no_deductible"
                          checked={medical_deductible.no_deductible}
                          onChange={updateMedicalDeductible}
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-end w-100">
                      <label className=" float-left">
                        {" "}
                        Check if no deductible
                      </label>
                    </div>
                    <div className="row mt-3">
                      <label className="col-lg-3 ">
                        Pre-Existing Condition
                      </label>
                      <div className="col-lg-7">
                        {" "}
                        <div className="row d-flex justify-content-around">
                          <InputText
                            name="value"
                            value={pre_existing_condition.value}
                            onChange={updatePreExistingCondition}
                            type="text"
                            id="integer"
                            className="col-5 rounded rounded-4"
                          />
                          <InputText
                            id="integer"
                            name="day1"
                            value={pre_existing_condition.day1}
                            onChange={updatePreExistingCondition}
                            type="text"
                            className="col-2 rounded rounded-4 "
                            placeholder="Day1"
                          />
                          <InputText
                            id="integer"
                            name="day2"
                            value={pre_existing_condition.day2}
                            onChange={updatePreExistingCondition}
                            type="text"
                            className="col-2 rounded rounded-4 "
                            placeholder="Day2"
                          />

                          <InputText
                            id="integer"
                            name="serial"
                            value={pre_existing_condition.serial}
                            onChange={updatePreExistingCondition}
                            type="text"
                            className="col-2 rounded rounded-4"
                            placeholder="Serial"
                          />
                        </div>
                      </div>

                      <div className="col-lg-2 d-flex justify-content-center ">
                        <Checkbox
                          inputId="ingredient1"
                          name="filter"
                          checked={pre_existing_condition.filter}
                          onChange={updatePreExistingCondition}
                        />
                      </div>
                    </div>
                    <div className="row mt-3">
                      <label className="col-lg-3 ">
                        Pre-Existing Look Back
                      </label>
                      <div className="col-lg-7">
                        {" "}
                        <div className="row d-flex justify-content-around">
                          <InputText
                            name="value"
                            value={pre_existing_look_back.value}
                            onChange={updatePreExistingLookBack}
                            type="text"
                            id="integer"
                            className="col-9 rounded rounded-4"
                          />

                          <InputText
                            id="integer"
                            name="serial"
                            value={pre_existing_look_back.serial}
                            onChange={updatePreExistingLookBack}
                            type="text"
                            className="col-2 rounded rounded-4"
                            placeholder="Serial"
                          />
                        </div>
                      </div>

                      <div className="col-lg-2 d-flex justify-content-center "></div>
                    </div>
                    <div className="row mt-3">
                      <label className="col-lg-3 ">
                        Medical Evacuation & Repatriation
                      </label>
                      <div className="col-lg-7">
                        {" "}
                        <div className="row d-flex justify-content-around">
                          <InputText
                            name="value"
                            value={medical_evacuation.value}
                            onChange={updatemedicalEvacuation}
                            type="text"
                            id="integer"
                            className="col-9 rounded rounded-4"
                          />

                          <InputText
                            id="integer"
                            name="serial"
                            value={medical_evacuation.serial}
                            onChange={updatemedicalEvacuation}
                            type="text"
                            className="col-2 rounded rounded-4"
                            placeholder="Serial"
                          />
                        </div>
                      </div>

                      <div className="col-lg-2 d-flex justify-content-center ">
                        <Checkbox
                          inputId="ingredient1"
                          name="filter"
                          checked={medical_evacuation.filter}
                          onChange={updatemedicalEvacuation}
                        />
                      </div>
                    </div>
                    <div className="row mt-3">
                      <label className="col-lg-3 ">
                        Non medical Evacuation{" "}
                      </label>
                      <div className="col-lg-7">
                        {" "}
                        <div className="row d-flex justify-content-around align-items-center">
                          <InputText
                            id="integer"
                            type="text"
                            value={non_medical_evacuationValue.value}
                            name="value"
                            onChange={updateNonMedicalEvacuation}
                            className="col-9 rounded rounded-4"
                          />

                          <InputText
                            id="integer"
                            type="text"
                            name="serial"
                            value={non_medical_evacuationValue.serial}
                            onChange={updateNonMedicalEvacuation}
                            className="col-2 rounded rounded-4 "
                            placeholder="Serial"
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 d-flex justify-content-center ">
                        <button
                          onClick={updateNonMedicalEvacuationAddMore}
                          type="button"
                          class="btn btn-success"
                        >
                          Add More
                        </button>
                      </div>
                    </div>
                    {nonMedicalEvacuationAddMore.map((val, idx) => (
                      <div className="row mt-3">
                        <InputText
                          id="integer"
                          type="text"
                          name="header"
                          className="col-lg-3 rounded rounded-4"
                          onChange={(e) =>
                            non_medical_evacuation_change_handler(e, idx)
                          }
                        />
                        <div className="col-lg-7">
                          {" "}
                          <div className="row d-flex justify-content-around align-items-center">
                            <InputText
                              id="integer"
                              name="value"
                              type="text"
                              className="col-9 rounded rounded-4"
                              onChange={(e) =>
                                non_medical_evacuation_change_handler(e, idx)
                              }
                            />

                            <InputText
                              id="integer"
                              type="text"
                              className="col-2 rounded rounded-4 "
                              name="serial"
                              placeholder="Serial"
                              onChange={(e) =>
                                non_medical_evacuation_change_handler(e, idx)
                              }
                            />
                          </div>
                        </div>
                        <div className="col-lg-2 d-flex justify-content-center ">
                          <button
                            onClick={() => removeNoneMedicalEvacuation(idx)}
                            type="button"
                            class="btn btn-danger"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="row mt-3">
                      <label className="col-lg-3 ">Baggage</label>
                      <div className="col-lg-7">
                        {" "}
                        <div className="row d-flex justify-content-around">
                          <InputText

                            name="value"
                            value={baggage.value}
                            onChange={updateBaggage}
                            id="integer"
                            type="text"
                            className="col-12 rounded rounded-4"
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 d-flex justify-content-center ">
                        <Checkbox
                          inputId="ingredient1"
                          name="filter"
                          checked={baggage.filter}
                          onChange={updateBaggage}

                        />
                      </div>
                    </div>
                    <div className="row mt-3">
                      <label className="col-lg-3 ">Baggage Loss</label>
                      <div className="col-lg-7">
                        {" "}
                        <div className="row d-flex justify-content-around">
                          <InputText
                            id="integer"
                            name="value"
                            value={baggageLoss.value}
                            onChange={updateBaggageLoss}

                            type="text"
                            className="col-9 rounded rounded-4"
                          />

                          <InputText
                            id="integer"
                            name="serial"
                            value={baggageLoss.serial}
                            onChange={updateBaggageLoss}

                            type="text"
                            className="col-2 rounded rounded-4"
                            placeholder="Serial"
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 d-flex justify-content-center "></div>
                    </div>
                    <div className="row mt-3">
                      <label className="col-lg-3 ">Baggage Delay</label>
                      <div className="col-lg-7">
                        {" "}
                        <div className="row d-flex justify-content-around">
                          <InputText
                            id="integer"
                            name="value"
                            value={baggageDelayValue.value}
                            onChange={updateBaggageDelayValue}

                            type="text"
                            className="col-9 rounded rounded-4"
                          />

                          <InputText
                            id="integer"
                            name="serial"
                            value={baggageDelayValue.serial}
                            onChange={updateBaggageDelayValue}

                            type="text"
                            className="col-2 rounded rounded-4"
                            placeholder="Serial"
                          />
                        </div>
                      </div>

                      <div className="col-lg-2 d-flex justify-content-center ">
                        <button
                          onClick={updateBaggageDelay}
                          type="button"
                          class="btn btn-success"
                        >
                          Add More
                        </button>
                      </div>
                    </div>
                    {baggageDelayAddMore.map((val, idx) => (
                      <div className="row mt-3">
                        <InputText
                          name="header"
                          id="integer"
                          type="text"
                          onChange={(e) => baggageDelay_change_handler(e, idx)}
                          className="col-lg-3 rounded rounded-4"
                        />
                        <div className="col-lg-7">
                          {" "}
                          <div className="row d-flex justify-content-around align-items-center">
                            <InputText
                              name="value"
                              id="integer"
                              type="text"
                              className="col-9 rounded rounded-4"
                              onChange={(e) =>
                                baggageDelay_change_handler(e, idx)
                              }
                            />

                            <InputText
                              name="serial"
                              id="integer"
                              type="text"
                              className="col-2 rounded rounded-4 "
                              placeholder="Serial"
                              onChange={(e) =>
                                baggageDelay_change_handler(e, idx)
                              }
                            />
                          </div>
                        </div>
                        <div className="col-lg-2 d-flex justify-content-center ">
                          <button
                            onClick={() => removeBaggageDelay(idx)}
                            type="button"
                            class="btn btn-danger"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="row mt-3">
                      <label className="col-lg-3 ">Accidental Death</label>
                      <div className="col-lg-7">
                        {" "}
                        <div className="row d-flex justify-content-around">
                          <InputText
                            id="integer"
                            name="value"
                            value={accidentalDeath.value}
                            onChange={updateAccidentalDeath}

                            type="text"
                            className="col-12 rounded rounded-4"
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 d-flex justify-content-center ">
                        <Checkbox
                          inputId="ingredient1"
                          name="filter"
                          checked={accidentalDeath.filter}
                          onChange={updateAccidentalDeath}
                        />
                      </div>
                    </div>
                    <div className="row mt-3">
                      <label className="col-lg-3 ">
                        24 Hour Accidental Death & Dismemberment
                      </label>
                      <div className="col-lg-7">
                        {" "}
                        <div className="row d-flex justify-content-around">
                          <InputText
                            id="integer"
                            name="value"
                            value={accidentalDeathAndDismemberment.value}
                            onChange={updateAccidentalDeathAndDismemberment}

                            type="text"
                            className="col-9 rounded rounded-4"
                          />

                          <InputText
                            id="integer"
                            name="serial"
                            value={accidentalDeathAndDismemberment.serial}
                            onChange={updateAccidentalDeathAndDismemberment}

                            type="text"
                            className="col-2 rounded rounded-4"
                            placeholder="Serial"
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 d-flex justify-content-center "></div>
                    </div>
                    <div className="row mt-3">
                      <label className="col-lg-3 ">
                        Common Carrier Accidental Death & Dismemberment
                      </label>
                      <div className="col-lg-7">
                        {" "}
                        <div className="row d-flex justify-content-around">
                          <InputText

                            id="integer"
                            name="value"
                            value={commonCarrierAccidentalDeath.value}
                            onChange={updateCommonCarrierAccidentalDeath}

                            type="text"
                            className="col-9 rounded rounded-4"
                          />

                          <InputText
                            id="integer"
                            name="serial"
                            value={commonCarrierAccidentalDeath.serial}
                            onChange={updateCommonCarrierAccidentalDeath}

                            type="text"
                            className="col-2 rounded rounded-4"
                            placeholder="Serial"
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 d-flex justify-content-center "></div>
                    </div>
                    <div className="row mt-3">
                      <label className="col-lg-3 ">
                        Flight Accidental Death & Dismemberment
                      </label>
                      <div className="col-lg-7">
                        {" "}
                        <div className="row d-flex justify-content-around">
                          <InputText
                            name="value"
                            value={flightAccidentalDeathValue.value}
                            onChange={updateFlightAccidentalDeathAndDismemberment}

                            type="text"
                            id="integer"

                            className="col-9 rounded rounded-4"
                          />

                          <InputText
                            id="integer"
                            name="serial"
                            value={flightAccidentalDeathValue.serial}
                            onChange={updateFlightAccidentalDeathAndDismemberment}

                            type="text"
                            className="col-2 rounded rounded-4"
                            placeholder="Serial"
                          />
                        </div>
                      </div>

                      <div className="col-lg-2 d-flex justify-content-center ">
                        <button
                          onClick={updateFlightAccidental}
                          type="button"
                          class="btn btn-success"
                        >
                          Add More
                        </button>
                      </div>
                    </div>
                    {flightAccidentalAddMore.map((val, idx) => (
                      <div className="row mt-3">
                        <InputText
                          name="header"
                          id="integer"
                          type="text"
                          className="col-lg-3 rounded rounded-4"
                          onChange={(e) =>
                            flightAccidentalDeath_change_handler(e, idx)
                          }
                        />
                        <div className="col-lg-7">
                          {" "}
                          <div className="row d-flex justify-content-around align-items-center">
                            <InputText
                              name="value"
                              id="integer"
                              type="text"
                              className="col-9 rounded rounded-4"
                              onChange={(e) =>
                                flightAccidentalDeath_change_handler(e, idx)
                              }
                            />

                            <InputText
                              name="serial"
                              id="integer"
                              type="text"
                              className="col-2 rounded rounded-4 "
                              placeholder="Serial"
                              onChange={(e) =>
                                flightAccidentalDeath_change_handler(e, idx)
                              }
                            />
                          </div>
                        </div>
                        <div className="col-lg-2 d-flex justify-content-center ">
                          <button
                            onClick={() => removeFlightAccidental(idx)}
                            type="button"
                            class="btn btn-danger"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="row mt-3">
                      <label className="col-lg-3 ">Other Benefits</label>
                      <div className="col-lg-7">
                        {" "}
                        <div className="row d-flex justify-content-around">
                          <InputText
                            id="integer"
                            name="value"
                            value={otherBenefits.value}
                            onChange={updateOtherBenifits}

                            type="text"
                            className="col-12 rounded rounded-4"
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 d-flex justify-content-center align-items-center "></div>
                    </div>
                    <div className="row mt-3">
                      <label className="col-lg-3 ">Rental Car Damage</label>
                      <div className="col-lg-7">
                        {" "}
                        <div className="row d-flex justify-content-around">
                          <InputText

                            id="integer"
                            name="value"
                            value={rental_car_damage.value}
                            onChange={updateRentalCarDamange}

                            type="text"
                            className="col-9 rounded rounded-4"
                          />

                          <InputText
                            id="integer"
                            name="serial"
                            value={rental_car_damage.serial}
                            onChange={updateRentalCarDamange}

                            type="text"
                            className="col-2 rounded rounded-4"
                            placeholder="Serial"
                          />
                        </div>
                      </div>

                      <div className="col-lg-2 d-flex justify-content-center ">
                        <Checkbox
                          inputId="ingredient1"
                          name="filter"
                          onChange={updateRentalCarDamange}
                          checked={rental_car_damage.filter}
                        />
                      </div>
                    </div>
                    <div className="row mt-3">
                      <label className="col-lg-3 ">24 Hours Assistance</label>
                      <div className="col-lg-7">
                        {" "}
                        <div className="row d-flex justify-content-around">
                          <InputText
                            id="integer"
                            name="value"
                            value={hoursAssistanceValue.value}
                            onChange={update24HoursAssistantValue}

                            type="text"
                            className="col-9 rounded rounded-4"
                          />

                          <InputText
                            id="integer"
                            name="serial"
                            value={hoursAssistanceValue.serial}
                            onChange={update24HoursAssistantValue}

                            type="text"
                            className="col-2 rounded rounded-4"
                            placeholder="Serial"
                          />
                        </div>
                      </div>

                      <div className="col-lg-2 d-flex justify-content-center ">
                        <button
                          onClick={update24HourAssistant}
                          type="button"
                          class="btn btn-success"
                        >
                          Add More
                        </button>
                      </div>
                    </div>
                    {add24HourAssistantAddMore.map((val, idx) => (
                      <div className="row mt-3">
                        <InputText
                          name="header"
                          id="integer"
                          type="text"
                          className="col-lg-3 rounded rounded-4"
                          onChange={(e) =>
                            assistance24Hour_change_handler(e, idx)
                          }
                        />
                        <div className="col-lg-7">
                          {" "}
                          <div className="row d-flex justify-content-around align-items-center">
                            <InputText
                              name="value"
                              id="integer"
                              type="text"
                              className="col-9 rounded rounded-4"
                              onChange={(e) =>
                                assistance24Hour_change_handler(e, idx)
                              }
                            />

                            <InputText
                              name="serial"
                              id="integer"
                              type="text"
                              className="col-2 rounded rounded-4 "
                              placeholder="Serial"
                              onChange={(e) =>
                                assistance24Hour_change_handler(e, idx)
                              }
                            />
                          </div>
                        </div>
                        <div className="col-lg-2 d-flex justify-content-center ">
                          <button
                            onClick={() => remove24HourAssistant(idx)}
                            type="button"
                            class="btn btn-danger"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
              <button className="btn btn-warning w-100  mt-4">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanDetailsForm;
