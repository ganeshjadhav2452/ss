const countries = require('../../constants/countries')

const getCountries = async (req, res) => {
    try {
        res.status(200).json({
            message: 'countries fetched successfully',
            countries: countries
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: `something went wrong`,
        });
    }
}


module.exports = {
    getCountries
}