import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faWarning,
} from '@fortawesome/free-solid-svg-icons'
import Skeleton from 'react-loading-skeleton'

const PatientCard = ({patient, setPatientId, setTab}) => {
    return(
        <div className="patient-card-container col-lg-4">
            { patient?
                <div className="patient-card">
                    <div className="patient-card-details">
                        <div className="patient-pic-container"><div className="patient-pic"></div></div>
                        <div className="patient-card-text">
                            <h4>{patient.patientName?patient.patientName:"???"}</h4>
                            <p>{patient.patientEmail}</p>
                            {patient.patientPhone?
                                <p>{patient.patientPhone}</p>
                            :
                                <p><FontAwesomeIcon icon={faWarning}/> [Phone number not set]</p>
                            }
                        </div>
                    </div>
                    <div className="patient-card-buttons">
                        <button className="button-primary" onClick={()=>{setPatientId(patient._id);setTab("Demographic")}}>View/Edit Patient</button>
                        <button className="button-primary" onClick={()=>{setPatientId(patient._id);setTab("Treatment")}}>View Records</button>
                    </div>
                </div>
            :
                <div className="patient-card">
                    <div className="patient-card-details">
                        <div className="patient-pic-container"><Skeleton className='patient-pic-skeleton' borderRadius={100}/></div>
                        <div className="patient-card-text skeleton-flex">
                            <h4><Skeleton/></h4>
                            <p><Skeleton/></p>
                            <p><Skeleton/></p>
                        </div>
                    </div>
                    <div className="patient-card-buttons">
                        <Skeleton className='button-primary patient-card-button-skeleton' borderRadius={10}/>
                        <Skeleton className='button-primary patient-card-button-skeleton' borderRadius={10}/>
                    </div>
                </div>
            }
        </div>
    )
}

export default PatientCard
