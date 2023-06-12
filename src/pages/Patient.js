import { useState } from 'react';
import PatientList from "../components/PatientList"
import PatientDetails from "../components/PatientDetails"

const Patient = () => {
    const [ patientId, setPatientId ] = useState("")
    const [ tab, setTab ] = useState("")

    return(
        <div>
            { patientId === "" ?
                <PatientList setPatientId={setPatientId} setTab={setTab}/>
                :
                <PatientDetails patientId={patientId} setPatientId={setPatientId} tab={tab}/>
            }
        </div>
    )
}

export default Patient