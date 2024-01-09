import React, { useEffect, useState } from 'react'
import { get_site_settings_url, update_site_settings_url } from '../../../constants/api'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'
const SiteSettings = () => {
    const [siteSettings, setSiteSettings] = useState({
        site_title: "",
        meta_description: "",
        meta_keywords: "",
        email: "",
        website: "",
        fax: "",
        phone: "",
        address: ""
    })

    const updateFormSettings = (e) => {
        setSiteSettings((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const getSiteSettings = async () => {

        try {
            const responseOfSiteSettings = await axios.get(get_site_settings_url)

            setSiteSettings(responseOfSiteSettings.data.siteSettings[0])
            console.log('this is response of site setting', responseOfSiteSettings.data.siteSettings[0].phone)
        } catch (error) {
            console.log(error)
        }
    }

    const siteSettingUpdateHandler = async (e) => {
        e.preventDefault()
        const payload = {
            ...siteSettings
        }
        try {
            const responseOfUpdateSiteSettings = await axios.put(update_site_settings_url, payload)

            toast.success('site setting updated successfully')
        } catch (error) {
            console.log(error)
            toast.error('something went wrong while updating site settings')
        }
    }

    useEffect(() => {
        getSiteSettings()

    }, [])
    return (
        <div className="col-md-6 col-lg-10 grid-margin stretch-card  mt-3">
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Manage Sites</h4>

                    <form onSubmit={siteSettingUpdateHandler} className="forms-sample">
                        <div className="form-group row">
                            <label htmlFor="siteTitle" className="col-sm-3 col-form-label">Site Title</label>
                            <div className="col-sm-9">
                                <input type="text"
                                    onChange={updateFormSettings}
                                    value={siteSettings.site_title}
                                    name='site_title'
                                    className="form-control" id="siteTitle" placeholder="Site Title" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="exampleInputEmail2" className="col-sm-3 col-form-label">Meta Description</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" id="exampleInputEmail2"
                                    onChange={updateFormSettings}
                                    value={siteSettings.meta_description}
                                    name='meta_description'
                                    placeholder="metaDescription" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="exampleInputMobile" className="col-sm-3 col-form-label">Meta Keywords</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" id="exampleInputMobile"
                                    name='meta_keywords'
                                    onChange={updateFormSettings}
                                    value={siteSettings.meta_keywords} placeholder="Meta Keywords" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="exampleInputPassword2" className="col-sm-3 col-form-label">Site Email</label>
                            <div className="col-sm-9">
                                <input type="email" className="form-control"
                                    onChange={updateFormSettings}
                                    name='email'
                                    value={siteSettings.email} id="exampleInputPassword2" placeholder="Site Email" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="exampleInputConfirmPassword2" className="col-sm-3 col-form-label">Website</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control"
                                    onChange={updateFormSettings}
                                    name='website'
                                    value={siteSettings.website} id="exampleInputConfirmPassword2" placeholder="Website" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="exampleInputConfirmPassword2" className="col-sm-3 col-form-label">FAX</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control"
                                    onChange={updateFormSettings}
                                    name='fax'
                                    value={siteSettings.fax} id="exampleInputConfirmPassword2" placeholder="FAX" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="exampleInputConfirmPassword2" className="col-sm-3 col-form-label">Phone Number</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control"
                                    onChange={updateFormSettings}
                                    name='phone'
                                    value={siteSettings.phone} id="exampleInputConfirmPassword2" placeholder="Phone Number" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="exampleInputConfirmPassword2" className="col-sm-3 col-form-label">Address</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control"
                                    onChange={updateFormSettings}
                                    name='address'
                                    value={siteSettings.address} id="exampleInputConfirmPassword2" placeholder="address" />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary me-2">Submit</button>
                        <Link to={'/admin/dashboard'} className="btn btn-light">Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SiteSettings