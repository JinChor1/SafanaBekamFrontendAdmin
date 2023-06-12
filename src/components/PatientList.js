import { useEffect, useState } from 'react';
import { useAuthAPI } from "../hooks/useAuthAPI"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faMagnifyingGlass,
    faMagnifyingGlassChart,
} from '@fortawesome/free-solid-svg-icons'
import PatientCard from "../components/PatientCard"

const PatientList = ({setPatientId, setTab}) => {
    const [ patients, setPatients ] = useState([])
    const [ hasNext, setHasNext ] = useState(false)
    const [ page, setPage ] = useState(0)
    const [ search, setSearch ] = useState("")
    const { callAPI, isLoading } = useAuthAPI()

    useEffect(()=>{
        const fetchPatientList = async () => {
            const response = await callAPI({
                method: "GET",
                apiRoute: `/api/admin/patient/${page}/${search===""?"null":search}`,
                payload: ""
            })

            if (response){
                setPatients(prevState => [...prevState, ...response.patients])
                setHasNext(response.hasNext)
            }
        }
        fetchPatientList()
    },[page,search,callAPI])
    
    const handleLoadMore = () =>{
        setPage(prevState=>prevState+1)
    }

    return(
        <div>
            <div className="react-body">
                <div className="react-container">
                    <div className='filter-row'>
                        <label className="filter-label col-4">
                            <div className="filter-icon">
                                <FontAwesomeIcon icon={faMagnifyingGlass}/>
                            </div>
                            <input
                                className="text-input-icon"
                                type="text"
                                placeholder="Search... ( Name, Email, Phone Number)"
                                onChange={(e) => {
                                    setSearch( prevState => {
                                        // prevent emptying array from typing illegal symbols
                                        let formatted = e.target.value.replace(/[^a-zA-Z0-9 \-\_\.\~]/g,"")
                                        if (prevState!== formatted) {
                                            setPage(0)
                                            setPatients([])
                                            return formatted
                                        }
                                        return prevState
                                    })
                                }}
                                value={search}
                            />
                        </label>
                    </div>
                    { patients.length!==0 &&
                        <div className="patient-container">
                            {patients.map((patient)=>(
                                <PatientCard key={patient._id} patient={patient} setPatientId={setPatientId} setTab={setTab}/>
                            ))}
                        </div>
                    }
                    { isLoading &&
                        <div className="patient-container">
                            <PatientCard patient={null}/>
                            <PatientCard patient={null}/>
                            <PatientCard patient={null}/>
                            <PatientCard patient={null}/>
                            <PatientCard patient={null}/>
                            <PatientCard patient={null}/>
                        </div>
                    }
                    {(patients.length!==0 && hasNext) &&
                        <div className="patient-load">
                            <button className='button-primary' onClick={handleLoadMore}>Load More</button>
                        </div>
                    }
                    {(patients.length===0 && !isLoading) &&
                        <div className='no-data'>
                            <p className="not-found-icon"><FontAwesomeIcon icon={faMagnifyingGlassChart}/></p>
                            <h4> No patients found...</h4>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default PatientList