import React from 'react'
import CreatableSelect from 'react-select';
import { planUpgradeOption } from '../../../constants';
const PlanUpgrades = () => {
    return (
        <div className="row grid-margin stretch-card">
            <div className="col-lg-8 col-md-6 grid-margin">
                <div className="form-group  ">
                    <label>Company</label>
                    <CreatableSelect options={planUpgradeOption} onChange={''} />

                </div>
            </div>
        </div>
    )
}

export default PlanUpgrades