import React from 'react'
import NavBar from '../../components/NavBar'
import Slidebar from '../../components/Slidebar'

const Messaging = () => {
    return (
        <>
            <div className="container-scroller ">
                <NavBar />

                <div className="container-fluid page-body-wrapper">

                    <Slidebar />

                    <div className="main-panel col ">
                        <div className="content-wrapper ">

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Messaging