import { useEffect, useState } from 'react';
import { useAuthAPI } from "../hooks/useAuthAPI"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faFilter,
    faMagnifyingGlassChart,
} from '@fortawesome/free-solid-svg-icons'
import ServiceCard from '../components/ServiceCard'
import ServiceForm from '../components/ServiceForm'

const Services = () => {
    const [ serviceList, setServiceList ] = useState([])
    const [ statusFilter, setStatusFilter ] = useState("null")
    const [ selectedId, setSelectedId ] = useState("")
    const { callAPI, isLoading, error, errorData, setErrorData } = useAuthAPI()

    useEffect(()=>{
        setServiceList([])
        const fetchServiceList = async () => {
            const response = await callAPI({
                method: "GET",
                apiRoute: `/api/admin/service/list/${statusFilter===""?"null":statusFilter}`,
                payload: ""
            })

            if (response){
                setServiceList(response)
            }
        }
        fetchServiceList()
    },[callAPI,statusFilter])

    const fetchServiceList = async () => {
        setServiceList([])
        const response = await callAPI({
            method: "GET",
            apiRoute: `/api/admin/service/list/${statusFilter===""?"null":statusFilter}`,
            payload: ""
        })

        if (response){
            setServiceList(response)
        }
    }

    return(
        <div className="react-body">
            <div className="react-container">
                <div className="row">
                    <div className='col-6'>
                        <label className="filter-label col-5">
                            <div className="filter-icon-service">
                                <FontAwesomeIcon icon={faFilter}/>
                            </div>
                            <select
                                className="text-input-icon filter-select"
                                placeholder="Status Filter"
                                onChange={(e) =>  setStatusFilter(e.target.value)}
                                value={statusFilter}
                            >
                                <option value="null">All Services</option>
                                <option value="Active">Active</option>
                                <option value="Hidden">Hidden</option>
                            </select>
                        </label>
                        <div>
                            { (serviceList.length===0 && !isLoading) &&
                                <div className='no-data service-edit-no-data'>
                                    <p className="not-found-icon"><FontAwesomeIcon icon={faMagnifyingGlassChart}/></p>
                                    <h4> No service found...</h4>
                                </div>
                            }
                            { serviceList &&
                                <div className="service-container">
                                    {serviceList.map((service)=>(
                                        <ServiceCard key={service._id} service={service} selectedId={selectedId} setSelectedId={setSelectedId}/>
                                    ))}
                                </div>
                            }
                            { isLoading &&
                                <div className="service-container">
                                    <ServiceCard service={null}/>
                                    <ServiceCard service={null}/>
                                    <ServiceCard service={null}/>
                                    <ServiceCard service={null}/>
                                    <ServiceCard service={null}/>
                                </div>
                            }
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className='service-buttons-group'>
                            <button onClick={()=>setSelectedId("CREATE")}>Create Service</button>
                        </div>
                        <div>
                            <ServiceForm selectedId={selectedId} fetchServiceList={fetchServiceList}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Services