import { useEffect, useState } from 'react';
import { useAuthAPI } from "../hooks/useAuthAPI"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faLocationCrosshairs
} from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import WorkingDay from '../components/WorkingDay'
import Skeleton from 'react-loading-skeleton'

const Settings = () => {
    const [ company, setCompany ] = useState(null)
    const [ companyDraft, setCompanyDraft ] = useState(null)
    const { callAPI, isLoading, error, errorData, setErrorData } = useAuthAPI()
    const googleEmbedPublicKey = "AIzaSyCHWYWN14Dm_oKiMTObkKCWKBObXJ9rWQk"

    useEffect(()=>{
        const fetchCompanyDetails = async () => {
            const response = await callAPI({
                method: "GET",
                apiRoute: "/api/admin/company/details",
                payload: ""
            }) 
            
            if (response) {
                setCompany(response)
                setCompanyDraft(response)
            }
        }
        
        fetchCompanyDetails()
    },[callAPI])

    const geoCode = async () => {
        const response = await callAPI({
            method: "GET",
            apiRoute: `/api/admin/geocode/${encodeURI(companyDraft.contactUsDetails.Address)}`,
            payload: ""
        }) 
        
        if (response) {
            setCompanyDraft({...companyDraft, contactUsDetails: {
                ...companyDraft.contactUsDetails,
                lat: response.results[0].geometry.location.lat,
                lng: response.results[0].geometry.location.lng,
            }})
        }
    }

    const resetDraft = () => {
        setCompanyDraft(company)
        setErrorData(null)
    }

    const updateCompany = async () => {
        const companyUpdate = await callAPI({
            method: "PATCH",
            apiRoute: `/api/admin/company/update`,
            payload: companyDraft
        })

        if (companyUpdate) {
            setCompany(companyUpdate)
            setCompanyDraft(companyUpdate)
            toast.success("Company updated successfully!", {
                position: "top-center",
            })
        }
    }

    return(
        <div className="react-body">
            <div className="react-container">
                { company &&
                    <div className='row company-setting'>
                        <div className="col-6 company-col">
                            <div className='company-setting-col'>
                                <h3>Company's Details</h3>
                                <div className='company-setting-container'>
                                    <label>
                                        Company's Name:
                                    </label>
                                    <input
                                        type="text"
                                        className={errorData && errorData.includes("companyName")?"invalid-input":""}
                                        onChange={(e) => setCompanyDraft({...companyDraft, companyName: e.target.value})}
                                        value={companyDraft.companyName}
                                    />
                                    <label>
                                        Company's Description:
                                    </label>
                                    <textarea 
                                        className={errorData && errorData.includes("aboutUsDesc")?"invalid-input":""}
                                        onChange={(e) => setCompanyDraft({...companyDraft, aboutUsDesc: e.target.value})}
                                        value={companyDraft.aboutUsDesc}
                                        placeholder="Company's description..."
                                    />
                                </div>
                            </div>
                            <div className='company-setting-col'>
                                <h3>Company's Contact Info</h3>
                                <div className='company-setting-container'>
                                    <label>
                                        Company's Phone:
                                    </label>
                                    <input
                                        type="text"
                                        className={errorData && errorData.includes("phoneNumber")?"invalid-input":""}
                                        onChange={(e) => setCompanyDraft({...companyDraft, contactUsDetails: {
                                            ...companyDraft.contactUsDetails,
                                            phoneNumber: e.target.value
                                        }})}
                                        value={companyDraft.contactUsDetails.phoneNumber}
                                    />
                                    <label>
                                        Company's Address:
                                    </label>
                                    <div className="input-icon-setting">
                                        <FontAwesomeIcon icon={faLocationCrosshairs}/>
                                    </div>
                                    <input
                                        type="text"
                                        className={errorData && errorData.includes("Address")?"invalid-input text-input-icon":"text-input-icon"}
                                        onChange={(e) => setCompanyDraft({...companyDraft, contactUsDetails: {
                                            ...companyDraft.contactUsDetails,
                                            Address: e.target.value
                                        }})}
                                        value={companyDraft.contactUsDetails.Address}
                                    />
                                    <button className='button-primary' onClick={geoCode}>Auto pin location</button><br/>
                                    <iframe
                                        title='google-embed-map'
                                        className='google-embed-map'
                                        loading="lazy"
                                        allowFullScreen
                                        referrerPolicy="no-referrer-when-downgrade"
                                        src={`https://www.google.com/maps/embed/v1/place?key=${googleEmbedPublicKey}&q=${companyDraft.contactUsDetails.lat},${companyDraft.contactUsDetails.lng}`}
                                    >
                                    </iframe>
                                    <label>
                                        Company's Facebook Link:
                                    </label>
                                    <input
                                        type="text"
                                        className={errorData && errorData.includes("facebookLink")?"invalid-input":""}
                                        onChange={(e) => setCompanyDraft({...companyDraft, contactUsDetails: {
                                            ...companyDraft.contactUsDetails,
                                            facebookLink: e.target.value
                                        }})}
                                        value={companyDraft.contactUsDetails.facebookLink}
                                    />
                                    <label>
                                        Company's WhatsApp Link:
                                    </label>
                                    <input
                                        type="text"
                                        className={errorData && errorData.includes("whatsAppLink")?"invalid-input":""}
                                        onChange={(e) => setCompanyDraft({...companyDraft, contactUsDetails: {
                                            ...companyDraft.contactUsDetails,
                                            whatsAppLink: e.target.value
                                        }})}
                                        value={companyDraft.contactUsDetails.whatsAppLink}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className='company-setting-col'>
                                <h3>Company's Business Hours</h3>
                                <div className='company-setting-container'>
                                    <label>
                                        Company's Available Future Booking Days:
                                    </label>
                                    <select
                                        className={errorData && errorData.includes("availableFutureDays")?"invalid-input select-100":"select-100"}
                                        onChange={(e) => setCompanyDraft({...companyDraft, availableFutureDays: e.target.value})}
                                        value={companyDraft.availableFutureDays?companyDraft.availableFutureDays:""}
                                    >
                                        <option value="" disabled>Select days...</option>
                                        <option value="7">1 Week</option>
                                        <option value="14">2 Weeks</option>
                                        <option value="21">3 Weeks</option>
                                        <option value="30">30 Days (Month)</option>
                                    </select><br/>
                                    <label>
                                        Company's Business Hours By Day:
                                    </label>
                                    {companyDraft && Object.keys(companyDraft.businessHours).map((day) => (
                                        <div key={day} className="workday-container">
                                            <h4>{day.charAt(0).toUpperCase()+day.slice(1)}:</h4>
                                            <WorkingDay statePassed={[ companyDraft, setCompanyDraft ]} day={day}/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                }
                { (!company && isLoading) &&
                    <div className='row company-setting'>
                        <div className="col-6 company-col">
                            <Skeleton className='company-setting-col' height={400}/>
                            <Skeleton className='company-setting-col' height={847}/>
                        </div>
                        <div className="col-6">
                            <Skeleton className='company-setting-col' height={936}/>
                        </div>
                    </div>
                }
                { JSON.stringify(company) !== JSON.stringify(companyDraft) ?
                    <div className="bottom-confirm-bar">
                        <h4>Company's settings changed *Draft*</h4>
                        <div className="bottom-confirm-button">
                            { !isLoading ?
                                <div>
                                    <button 
                                        className="button-error"
                                        onClick={resetDraft}
                                    >
                                        <h5>Reset</h5>
                                    </button>
                                    <button 
                                        className="button-success"
                                        onClick={updateCompany}
                                    >
                                        <h5>Update</h5>
                                    </button>
                                </div>      
                                :
                                <div>
                                    <h5>Loading...</h5>
                                </div>
                            }
                            
                        </div>
                    </div>
                : 
                    null 
                }
            </div>
        </div>
    )
}

export default Settings