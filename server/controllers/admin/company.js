
const connection = require('../../utils/db')
const path = require('path')
const fs = require('fs')



const insertNewCompany = async (req, res) => {
    const { about = "", fileAClaim = "", policyService = "", companyName, companyStatus } = req.body;
    const ip = req.ip;
    const logo = req.file?.filename || 'default_logo.webp';
    const date = Date.now()
    try {
        console.log('this is ip ', ip)
        console.log('this is logo', req.file)
        if (!companyName) {
            return res.status(400).json({
                success: false,
                message: "please fill the name filed for company",
            });
        }
        const queryToFindCompany = `SELECT * FROM iwcntop_protect.company WHERE company_name =" ${companyName}" LIMIT 1;`

        // query to find same companies if that company already exists then we will throw the error that company exists already
        const promiseToFindCompany = await new Promise((resolve, reject) => {
            connection.execute(queryToFindCompany, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result[0])
                }
            })
        })

        console.log('this is companythat we found', promiseToFindCompany)
        if (promiseToFindCompany) {
            if (promiseToFindCompany.company_name == companyName) {
                return res.status(403).json({
                    success: false,
                    message: 'company with the same name exists already'
                })
            }
        }


        // proceding to insert company in database

        const queryToInsertCompanyInDatabase = `INSERT INTO iwcntop_protect.company(company_name,company_logo,status,file_claim, about, policy_service,ip, created_date) VALUES(?,?,?,?,?,?,?,?);`

        const values = [companyName, logo, companyStatus, fileAClaim, about, policyService, ip, date]
        const promiseToInsertCompany = await new Promise((resolve, reject) => {
            connection.execute(queryToInsertCompanyInDatabase, values, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })

        // sending response on successfull insertion of compnay

        res.status(200).json({
            success: true,
            message: `${companyName} saved successfully`,
            promiseToInsertCompany
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "something went wrong",
        });
    }
}


// controller to get companies 

const getAllComapnies = async (req, res) => {

    try {
        const queryToGetCompanies = `SELECT * FROM iwcntop_protect.company;`

        const promiseToGetCompanies = await new Promise((resolve, reject) => {
            connection.execute(queryToGetCompanies, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })

        if (promiseToGetCompanies) {
            res.status(200).json({
                success: true,
                message: 'companies fetched successfully',
                companies: promiseToGetCompanies
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "something went wrong",
            err: error.message
        });
    }
}
const getCompanyByStatus = async (req, res) => {
    const { status } = req.params;
    try {
        let queryToGetCompanies;
        if (status == '1' || status == '0') {
            queryToGetCompanies = `SELECT * FROM iwcntop_protect.company WHERE status = ${status};`
        } else {
            queryToGetCompanies = `SELECT * FROM iwcntop_protect.company ;`
        }

        const promiseToGetCompanies = await new Promise((resolve, reject) => {
            connection.execute(queryToGetCompanies, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })

        if (promiseToGetCompanies) {
            res.status(200).json({
                success: true,
                message: 'companies fetched successfully',
                companies: promiseToGetCompanies
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "something went wrong",
            err: error.message
        });
    }
}


// controller to get image of company

const getComapanyLogo = (req, res) => {
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

// get company by id 

const getCompanyById = async (req, res) => {
    const { companyId } = req.params;
    try {
        // 
        const queryToGetCompany = `SELECT * FROM iwcntop_protect.company WHERE id = ${companyId};`

        const promiseToGetCompany = await new Promise((resolve, reject) => {
            connection.execute(queryToGetCompany, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })

        if (promiseToGetCompany) {
            res.status(200).json({
                success: true,
                message: 'company fetched successfully',
                company: promiseToGetCompany[0]
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "something went wrong",
            err: error.message
        });
    }
}


const updateCompany = async (req, res) => {
    const { companyId } = req.params;
    const { company_name, file_claim = "", policy_service = "", about = "", status } = req.body;
    const logo = req.file?.filename || 'default_logo.webp';

    console.log('this is my image name', req.file?.filename)
    try {

        const queryToGetCompany = `SELECT * FROM iwcntop_protect.company WHERE id = ${companyId};`

        const promiseToGetCompany = await new Promise((resolve, reject) => {
            connection.execute(queryToGetCompany, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })

        if (promiseToGetCompany.length === 0) {
            console.log('this is value we got from promise', promiseToGetCompany);
            return res.status(404).json({
                success: false,
                message: "company not found",

            });
        }

        const queryToUpdateCompany = `
        UPDATE iwcntop_protect.company
        SET company_name = ?,
            company_logo = ?,
            file_claim = ?,
            policy_service = ?,
            about = ?,
            status = ?
        WHERE id = ?;
      `;

        connection.execute(queryToUpdateCompany, [company_name, logo, file_claim, policy_service, about, status, companyId], (err, results) => {
            if (err) {
                console.error('Error updating company:', err);
                // Handle the error
                throw new Error('Error while updating the company')
            } else {
                console.log('Company updated successfully:', results);
                // Process the successful update
                res.status(200).json({
                    success: true,
                    message: `Company ${promiseToGetCompany[0].company_name} Updated successfully`,

                })
            }
        });



    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "something went wrong while updating company",
            err: error.message
        });
    }
}


const deleteCompany = async (req, res) => {
    const { companyId } = req.params;
    try {
        const queryToDeleteCompany = `DELETE FROM iwcntop_protect.company WHERE id = ?`

        await connection.execute(queryToDeleteCompany, [companyId], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: "something went wrong while deleting company",

                });
            } else {
                res.status(200).json({
                    success: true,
                    message: `Company Deleted successfully`,

                })
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "something went wrong while deleting company",

        });
    }
}
module.exports = {
    insertNewCompany,
    getAllComapnies,
    getComapanyLogo,
    getCompanyByStatus,
    getCompanyById,
    updateCompany,
    deleteCompany
}