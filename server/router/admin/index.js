const express = require('express')
const { login, create_admin, adminPermission } = require('../../controllers/admin/auth')
const verifyAdmin = require('../../middlewares/verifiyAdmin')
const { insertNewCompany, getAllComapnies, getComapanyLogo, getCompanyByStatus, getCompanyById, updateCompany, deleteCompany } = require('../../controllers/admin/company')
const { getCountries } = require('../../controllers/admin/plans')
const { getStates, getSiteSettings, updateSiteSettings, updateStates, getLogo, getSettingsLogo, change_settings_logo, getTwilioSettings, update_twilio_settings, getFlightStats, updateFlightStats, getCheckNumber, updateCheckNumber } = require('../../controllers/admin/settings')
const router = express.Router()
const upload = require('../../middlewares/companyMulter')
const { createStaff, get_all_staff, deleteStaff, updateStaff } = require('../../controllers/admin/staff')
const { updatePassword, updateEmail } = require('../../controllers/admin/credentials')



// auth routes 

// login route
router.post('/login', login)

// create staff / admin route
router.post('/create_admin', create_admin)


// verify admin route

router.get('/verify', verifyAdmin, (req, res) => {
    res.json({
        success: true,
        message: 'Admin Verified'
    })
})

router.get('/get-permissions', adminPermission)
router.get('/get_states', getStates)
router.get('/get_countries', getCountries)

// route to handle company
router.post('/insert-company', verifyAdmin, upload.single('logo'), insertNewCompany)
router.get('/get_companies', verifyAdmin, getAllComapnies)
router.get('/get_company_logo/:imageName', getComapanyLogo)
router.get('/get_company_by_status/:status', verifyAdmin, getCompanyByStatus)
router.get('/get_company/:companyId', verifyAdmin, getCompanyById)
router.post('/update_company/:companyId', verifyAdmin, upload.single('company_logo'), updateCompany)
router.delete('/delete_company/:companyId', verifyAdmin, deleteCompany)

// routes to handle staff and settings
router.post('/create_staff', verifyAdmin, createStaff)
router.get('/get_staff_list', verifyAdmin, get_all_staff)
router.delete('/delete_staff/:staffId', verifyAdmin, deleteStaff)
router.put('/update_staff/:staffId', verifyAdmin, updateStaff)
router.put('/update_password', verifyAdmin, updatePassword)
router.put('/update_email', verifyAdmin, updateEmail)


// site settings route
router.get('/get_site_settings', verifyAdmin, getSiteSettings)
router.put('/update_site_settings', verifyAdmin, updateSiteSettings)
router.put('/update_states', verifyAdmin, updateStates)
router.get('/get_logo', verifyAdmin, getLogo)
router.get('/get_settings_logo/:imageName', getSettingsLogo)
router.put('/update_settings_logo', verifyAdmin, upload.single('logo'), change_settings_logo)
router.get('/get_twilio_settings', verifyAdmin, getTwilioSettings)
router.put('/update_twilio_credentials', verifyAdmin, update_twilio_settings)
router.get('/get_flight_stats', verifyAdmin, getFlightStats)
router.put('/update_flight_stats', verifyAdmin, updateFlightStats)
router.get('/get_check_number', verifyAdmin, getCheckNumber)
router.put('/update_check_number', verifyAdmin, updateCheckNumber)
// exporting the router

module.exports = router;