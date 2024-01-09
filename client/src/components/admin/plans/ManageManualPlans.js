import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const initialFilters = {
    planName: ''
};

const data = [
    { id: 1, planName: 'Plan A', companyName: 'Company A', companyNickName: 'Co. A', status: 'Active', mode: 'Mode A' },
    { id: 2, planName: 'Plan B', companyName: 'Company B', companyNickName: 'Co. B', status: 'Inactive', mode: 'Mode B' },
    { id: 3, planName: 'Plan C', companyName: 'Company C', companyNickName: 'Co. C', status: 'Active', mode: 'Mode C' },
    { id: 4, planName: 'Plan D', companyName: 'Company D', companyNickName: 'Co. D', status: 'Inactive', mode: 'Mode D' },
    { id: 5, planName: 'Plan E', companyName: 'Company E', companyNickName: 'Co. E', status: 'Active', mode: 'Mode E' },
    { id: 6, planName: 'Plan F', companyName: 'Company F', companyNickName: 'Co. F', status: 'Inactive', mode: 'Mode F' },
    { id: 7, planName: 'Plan G', companyName: 'Company G', companyNickName: 'Co. G', status: 'Active', mode: 'Mode G' },
    { id: 8, planName: 'Plan H', companyName: 'Company H', companyNickName: 'Co. H', status: 'Inactive', mode: 'Mode H' },
    { id: 9, planName: 'Plan I', companyName: 'Company I', companyNickName: 'Co. I', status: 'Active', mode: 'Mode I' },
    { id: 10, planName: 'Plan J', companyName: 'Company J', companyNickName: 'Co. J', status: 'Inactive', mode: 'Mode J' },
    { id: 11, planName: 'Plan K', companyName: 'Company K', companyNickName: 'Co. K', status: 'Active', mode: 'Mode K' },
    { id: 12, planName: 'Plan L', companyName: 'Company L', companyNickName: 'Co. L', status: 'Inactive', mode: 'Mode L' },
    { id: 13, planName: 'Plan M', companyName: 'Company M', companyNickName: 'Co. M', status: 'Active', mode: 'Mode M' },
    { id: 14, planName: 'Plan N', companyName: 'Company N', companyNickName: 'Co. N', status: 'Inactive', mode: 'Mode N' },
    { id: 15, planName: 'Plan O', companyName: 'Company O', companyNickName: 'Co. O', status: 'Active', mode: 'Mode O' },
    { id: 16, planName: 'Plan P', companyName: 'Company P', companyNickName: 'Co. P', status: 'Inactive', mode: 'Mode P' },
    { id: 17, planName: 'Plan Q', companyName: 'Company Q', companyNickName: 'Co. Q', status: 'Active', mode: 'Mode Q' },
    { id: 18, planName: 'Plan R', companyName: 'Company R', companyNickName: 'Co. R', status: 'Inactive', mode: 'Mode R' },
    { id: 19, planName: 'Plan S', companyName: 'Company S', companyNickName: 'Co. S', status: 'Active', mode: 'Mode S' },
    { id: 20, planName: 'Plan T', companyName: 'Company T', companyNickName: 'Co. T', status: 'Inactive', mode: 'Mode T' }
    // Add more rows as needed
];


const ManageManualPlans = () => {
    const [filters, setFilters] = useState(initialFilters);

    const onPlanNameInputChange = (e) => {
        const { value } = e.target;
        setFilters({ ...filters, planName: value });
    };

    const filteredData = data.filter(item =>
        item.planName.toLowerCase().includes(filters.planName.toLowerCase())
    );

    return (
        <div className='card col-lg-12  p-3'>
            <div className='card-title'>Manage Manual Plans</div>
            <div className="p-mb-4 mb-3  d-flex  justify-content-end align-items-end w-100">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText
                        className='rounded rounded-4'
                        placeholder="Search by Plan Name"
                        value={filters.planName}
                        onChange={onPlanNameInputChange}
                    />
                </span>
            </div>
            <DataTable
                value={filteredData}
                paginator
                rows={5}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                rowsPerPageOptions={[5, 10, 20]}
            >
                <Column field="id" header="Sr. No." sortable />
                <Column field="planName" header="Plan Name" sortable />
                <Column field="companyName" header="Company Name" sortable />
                <Column field="companyNickName" header="Company Nick Name" sortable />
                <Column field="status" header="Status" sortable />
                <Column field="mode" header="Mode" sortable />
                <Column header="Action" body={() => <button className="p-button p-button-primary">Action</button>} />
            </DataTable>
        </div>
    );
};

export default ManageManualPlans;
