const connection = require('../../utils/db')
const states = require('../../constants/states')
const path = require('path')
const fs = require('fs')
const getStates = (req, res) => {
    try {

        const queryToFetchedStates = `SELECT states FROM  iwcntop_protect.settings ;`

        connection.execute(queryToFetchedStates, (err, result) => {
            if (err) {
                console.log(err)
                res.status(500).json({
                    success: false,
                    message: 'something went wrong while fetching states',

                })
            } else {

                res.status(200).json({
                    success: true,
                    message: 'states fetched successfully',
                    selectedStates: result[0],
                    states: states
                })
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'something went wrong while fetching states',

        })
    }

}


const getSiteSettings = async (req, res) => {
    try {

        const queryToGetSiteSettings = `SELECT site_title,meta_description,meta_keywords,email,website,fax,phone,address FROM iwcntop_protect.settings ;`

        connection.execute(queryToGetSiteSettings, (err, result) => {
            if (err) {
                console.log(err)
                throw new Error('failed to fetch settings')
            } else {
                return res.status(200).json({
                    success: true,
                    message: 'settings fetched successfully',
                    siteSettings: result
                })
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: `something went wrong`,
        });

    }
}


const updateSiteSettings = async (req, res) => {
    const {
        site_title,
        meta_description,
        meta_keywords,
        email,
        website,
        fax,
        phone,
        address,
    } = req.body;
    try {

        const queryToUpdateSiteSettings = `UPDATE  iwcntop_protect.settings SET  site_title = ?,
        meta_description = ?,
        meta_keywords = ?,
        email = ?,
        website = ?,
        fax = ?,
        phone = ?,
        address = ? ; `

        connection.execute(queryToUpdateSiteSettings, [site_title,
            meta_description,
            meta_keywords,
            email,
            website,
            fax,
            phone,
            address], (err, result) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({
                        success: false,
                        message: `something went wrong`,
                    });

                } else {

                    return res.status(200).json({
                        success: true,
                        message: `site settings updated successfully`,
                    });

                }
            })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: `something went wrong while updating settings`,
        });

    }
}


const updateStates = async (req, res) => {
    let { selectedStates } = req.body;
    console.log('this is states that we received')
    selectedStates = JSON.stringify(selectedStates)
    try {
        const queryToUpdateStates = `UPDATE  iwcntop_protect.settings SET states = ?;`

        connection.execute(queryToUpdateStates, [selectedStates], (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: false,
                    message: `something went wrong while updating states`,
                });
            } else {
                return res.status(200).json({
                    success: true,
                    message: `states updated successfully`,
                    result
                });
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: `something went wrong while updating states`,
        });
    }
}



const getLogo = async (req, res) => {
    try {
        const queryToGetLogo = `SELECT logo FROM iwcntop_protect.settings ;`

        connection.execute(queryToGetLogo, (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: false,
                    message: `something went wrong `,
                });
            } else {
                return res.status(200).json({
                    success: true,
                    message: `logo fetched`,
                    logo: result[0]
                });
            }
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: `something went wrong while getting states`,
        });
    }
}

const getSettingsLogo = (req, res) => {
    const imageName = req.params.imageName;

    const imagePath = path.join(__dirname, '../../images/company_logo', imageName);
    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {

            console.error(err);
            res.status(404).send('Image not found');
        } else {

            res.sendFile(imagePath);
        }
    });
};



const change_settings_logo = async (req, res) => {
    const logo = req.file.filename
    // || 'default_logo.webp';
    try {
        const queryToUpdateLogo = `UPDATE  iwcntop_protect.settings SET logo = ?;`

        connection.execute(queryToUpdateLogo, [logo], (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: false,
                    message: `something went wrong `,
                });
            } else {
                return res.status(200).json({
                    success: true,
                    message: `logo updated successfully`,

                });
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `something went wrong `,
        });
    }
}

const getTwilioSettings = async (req, res) => {
    try {
        const queryToGetTwilioSettings = `SELECT twilio_sid,twilio_token,twilio_phone FROM iwcntop_protect.settings ;`

        connection.execute(queryToGetTwilioSettings, (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: false,
                    message: `something went wrong `,
                });
            } else {
                return res.status(200).json({
                    success: true,
                    message: `twilio credentials fetched`,
                    twilio: result[0]
                });
            }
        })
    } catch (error) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: `something went wrong `,
        });
    }
}


const update_twilio_settings = async (req, res) => {
    const { twilio_phone, twilio_token, twilio_sid } = req.body;
    console.log('this is twlio we got from fe', { twilio_phone, twilio_token, twilio_sid })
    try {
        const fieldsToUpdate = [
            twilio_phone ? `twilio_phone = "${twilio_phone}" ` : null,
            twilio_token ? `twilio_token ="${twilio_token}" ` : null,
            twilio_sid ? `twilio_sid = "${twilio_sid}"` : null

        ].filter(Boolean).join(', ');

        const queryToUpdateTwilioSettings = `UPDATE iwcntop_protect.settings SET ${fieldsToUpdate}  ;`;

        connection.execute(queryToUpdateTwilioSettings, (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: false,
                    message: `something went wrong `,
                });
            } else {
                return res.status(200).json({
                    success: true,
                    message: `twilio credentials updated successfully`,

                });
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `something went wrong `,
        });
    }
}



const getFlightStats = async (req, res) => {
    try {
        const queryToGetFlightStats = `SELECT flight_appkey,
        flight_appid FROM iwcntop_protect.settings ;`

        connection.execute(queryToGetFlightStats, (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: false,
                    message: `something went wrong `,
                });
            } else {
                return res.status(200).json({
                    success: true,
                    message: `Flight Stats fetched`,
                    flightStats: result[0]
                });
            }
        })
    } catch (error) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: `something went wrong `,
        });
    }
}


const updateFlightStats = async (req, res) => {
    const { flight_appkey, flight_appid } = req.body;
    console.log('this is twlio we got from fe', { flight_appkey, flight_appid })
    try {
        const fieldsToUpdate = [
            flight_appkey ? `flight_appkey = "${flight_appkey}" ` : null,
            flight_appid ? `flight_appid ="${flight_appid}" ` : null


        ].filter(Boolean).join(', ');

        const queryTpUpdateFlightStats = `UPDATE iwcntop_protect.settings SET ${fieldsToUpdate}  ;`;

        connection.execute(queryTpUpdateFlightStats, (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: false,
                    message: `something went wrong `,
                });
            } else {
                return res.status(200).json({
                    success: true,
                    message: `Flight Stats updated successfully`,

                });
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `something went wrong `,
        });
    }
}

const getCheckNumber = async (req, res) => {
    try {
        const queryToGetFlightStats = `SELECT check_number FROM iwcntop_protect.settings ;`

        connection.execute(queryToGetFlightStats, (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: false,
                    message: `something went wrong `,
                });
            } else {
                return res.status(200).json({
                    success: true,
                    message: `check number fetched`,
                    checkNumber: result[0]
                });
            }
        })
    } catch (error) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: `something went wrong `,
        });
    }
}


const updateCheckNumber = async (req, res) => {
    const { check_number } = req.body;
    console.log('this is twlio we got from fe', { check_number })
    try {
        const fieldsToUpdate = [
            check_number ? `check_number = "${check_number}" ` : null,



        ].filter(Boolean).join(', ');

        const queryToUpdateCheckNumber = `UPDATE iwcntop_protect.settings SET ${fieldsToUpdate}  ;`;

        connection.execute(queryToUpdateCheckNumber, (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: false,
                    message: `something went wrong `,
                });
            } else {
                return res.status(200).json({
                    success: true,
                    message: `check number updated successfully`,

                });
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `something went wrong `,
        });
    }
}
module.exports = {
    getStates,
    getSiteSettings,
    updateSiteSettings,
    updateStates,
    getLogo,
    getSettingsLogo,
    change_settings_logo,
    getTwilioSettings,
    update_twilio_settings,
    getFlightStats,
    updateFlightStats,
    getCheckNumber,
    updateCheckNumber

};