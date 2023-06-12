import { useEffect, useState } from 'react';
import { useAuthAPI } from "../hooks/useAuthAPI"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faChevronLeft,
    faCircleInfo
} from '@fortawesome/free-solid-svg-icons'
import { Tooltip } from 'react-tooltip'
import Demograhic from './Demographic'
import Health from './Health'
import Treatment from './Treatment'
import { toast } from 'react-toastify'
import Skeleton from 'react-loading-skeleton'

const PatientDetails = ({patientId, setPatientId, tab}) => {
    const { callAPI, isLoading, errorData, setErrorData } = useAuthAPI()
    const [ patientData , setPatientData ] = useState(null)
    const [ patientDraft , setPatientDraft ] = useState(null)
    const [ tabSelected , setTabSelected ] = useState(tab)

    useEffect(()=>{
        const fetchPatientDetails = async () => {
            const response = await callAPI({
                method: "GET",
                apiRoute: `/api/admin/patient/${patientId}`,
                payload: ""
            })
    
            if (response){
                setPatientData(response)
                setPatientDraft(response)
            }
        }

        fetchPatientDetails()
    },[callAPI,patientId])

    const resetDraft = () => {
        setPatientDraft(patientData)
        setErrorData(null)
    }

    const updateProfile = async () => {
        const userUpdate = await callAPI({
            method: "PATCH",
            apiRoute: `/api/admin/patient/update/${patientId}`,
            payload: patientDraft
        })

        if (userUpdate) {
            setPatientData(userUpdate)
            setPatientDraft(userUpdate)
            toast.success("Profile updated successfully!", {
                position: "top-center",
            })
        }
    }

    return(
        <div>
            <div className="react-body">
                <div className="react-container">
                    <button 
                        className='button-plain' 
                        onClick={()=>setPatientId("")}
                    >   
                        <FontAwesomeIcon icon={faChevronLeft}/> Back to patient listing
                    </button>
                    { patientData ?
                        <div className='patient-details-container'>
                            <div className='patient-details-header'>
                                <img src="https://picsum.photos/200/300" alt="patientPic" className="patient-picture"/>
                                <div className="patient-details-header-content">
                                    <p><strong>Patient Name: </strong>{patientData.patientName?patientData.patientName:"[not set]"}</p>
                                    <p><strong>Patient Phone: </strong>{patientData.patientPhone?patientData.patientPhone:"[not set]"}</p>
                                    <p><strong>Patient Email: </strong>{patientData.patientEmail}</p>
                                    <p><strong>Registered: </strong>{new Date(patientData.createdAt).toLocaleString('en-NZ',{day: "numeric" ,month: "short", year: "numeric"})}</p>
                                    <p><strong>Last Updated: </strong>{new Date(patientData.updatedAt).toLocaleString('en-NZ',{day: "numeric" ,month: "short", year: "numeric"})}</p>
                                    <div className="patient-status row">
                                        {/* account status */}
                                        {patientData.patientStatus === "Active"?
                                            <div className="status-pill-success col-5">
                                                <p>Active</p>
                                            </div>   
                                        :
                                            <div 
                                                className="status-pill-error col-5"
                                                data-tooltip-id="ineligible-tooltip"
                                                data-tooltip-content={"Account is deactivated, please contact admin"}
                                            >
                                                <p>Inactive <FontAwesomeIcon icon={faCircleInfo}/></p>
                                            </div>
                                        }
                                        {/* account eligible */}
                                        {patientData.patientEligible?
                                            <div className="status-pill-success col-5">
                                                <p>Eligible</p>
                                            </div>   
                                        :
                                            <div 
                                                className="status-pill-error col-5" 
                                                data-tooltip-id="ineligible-tooltip"
                                                data-tooltip-content={"Account's demography details need to be completed."}
                                            >
                                                <p>Ineligible <FontAwesomeIcon icon={faCircleInfo}/></p>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="patient-details-tab-selector">
                                <button 
                                    className={tabSelected==="Demographic"?"patient-details-tab-selected col-4":"patient-details-tab col-4"}
                                    onClick={()=>setTabSelected("Demographic")}
                                >
                                    Demographic
                                </button>
                                <button 
                                    className={tabSelected==="Health"?"patient-details-tab-selected col-4":"patient-details-tab col-4"}
                                    onClick={()=>setTabSelected("Health")}
                                >
                                    Health Background
                                </button>
                                <button 
                                    className={tabSelected==="Treatment"?"patient-details-tab-selected col-4":"patient-details-tab col-4"}
                                    onClick={()=>setTabSelected("Treatment")}
                                >
                                    Treatment Record
                                </button>
                            </div>
                            <div className='patient-details-body'>
                                { tabSelected === "Demographic" && 
                                    <Demograhic patientDraft={patientDraft} setPatientDraft={setPatientDraft} errorData={errorData}/>
                                }
                                { tabSelected === "Health" && 
                                    <Health patientDraft={patientDraft} setPatientDraft={setPatientDraft}/>
                                }
                                { tabSelected === "Treatment" && 
                                    <Treatment patientDraft={patientDraft} setPatientDraft={setPatientDraft}/>
                                }
                            </div>
                        </div>  
                    :
                        <div className='patient-details-container'>
                            <div className='patient-details-header'>
                                <Skeleton className="patient-picture" width={175} height={200}/>
                                <div className="patient-details-header-content">
                                    <p><Skeleton width={200}/></p>
                                    <p><Skeleton width={200}/></p>
                                    <p><Skeleton width={200}/></p>
                                    <p><Skeleton width={200}/></p>
                                    <p><Skeleton width={200}/></p>
                                </div>
                            </div>
                            <Skeleton className="patient-details-tab-selector" borderRadius={0} height={50}/>
                            <Skeleton containerClassName='patient-details-body' height={500}/>
                        </div>  
                    }
                    { JSON.stringify(patientData) !== JSON.stringify(patientDraft) ?
                        <div className="bottom-confirm-bar">
                            <h4>Profile changed *Draft*</h4>
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
                                            onClick={updateProfile}
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
            <Tooltip id="ineligible-tooltip"/>
        </div>
    )
}

export default PatientDetails