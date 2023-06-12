import { useEffect, useState } from 'react';
import { useAuthAPI } from "../hooks/useAuthAPI"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faMagnifyingGlassChart,
} from '@fortawesome/free-solid-svg-icons'
import Skeleton from 'react-loading-skeleton'
import { toast } from 'react-toastify'

const ServiceForm = ({selectedId, fetchServiceList}) => {
    const { callAPI, isLoading } = useAuthAPI()
    const [service, setService] = useState({
        serviceName: "",
        serviceDesc: "",
        serviceDuration: "",
        servicePrice: "",
        serviceStatus: ""
    })
    const [serviceDraft, setServiceDraft] = useState({
        serviceName: "",
        serviceDesc: "",
        serviceDuration: "",
        servicePrice: "",
        serviceStatus: ""
    })

    useEffect(()=>{
        const fetchServiceDetails = async () => {
            const response = await callAPI({
                method: "GET",
                apiRoute: `/api/admin/service/${selectedId}`,
                payload: ""
            })

            if (response){
                setService(response)
                setServiceDraft(response)
            }
        }

        if (selectedId !=="" && selectedId!=="CREATE") {
            fetchServiceDetails()
        }
        if (selectedId==="CREATE") {
            setService({
                serviceName: "",
                serviceDesc: "",
                serviceDuration: "",
                servicePrice: "",
                serviceStatus: ""
            })
            setServiceDraft({
                serviceName: "",
                serviceDesc: "",
                serviceDuration: "",
                servicePrice: "",
                serviceStatus: ""
            })
        }
    },[selectedId,callAPI,setServiceDraft])

    const resetDraft = () => {
        setServiceDraft(service)
    }

    const updateService = async () => {
        const response = await callAPI({
            method: "PATCH",
            apiRoute: `/api/admin/service/update/${selectedId}`,
            payload: serviceDraft
        })

        if (response){
            setService(response)
            setServiceDraft(response)
            toast.success("Service updated successfully!", {
                position: "top-center",
            })
            fetchServiceList()
        }
    }

    const createService = async () => {
        const response = await callAPI({
            method: "POST",
            apiRoute: `/api/admin/service/create/`,
            payload: serviceDraft
        })

        if (response){
            setService(response)
            setServiceDraft(response)
            toast.success("Service created successfully!", {
                position: "top-center",
            })
            fetchServiceList()
        }
    }

    return(
        <div>
            { selectedId === "" &&
                <div className='no-data service-edit-no-data'>
                    <p className="not-found-icon"><FontAwesomeIcon icon={faMagnifyingGlassChart}/></p>
                    <h4> Select a service first to edit or create a service...</h4>
                </div>
            }
            { isLoading &&
                <Skeleton className='company-setting-col' height={688}/>
            }
            { (( !isLoading && selectedId !=="" && selectedId!=="CREATE" && service) || ( !isLoading && selectedId==="CREATE")) && 
                <div className='company-setting-col'>
                    <div className='service-edit-form'>
                        <h2>{selectedId==="CREATE"?"Creating service":`Editing ${service.serviceName}`}</h2>
                        <label>
                            Service's Name:
                        </label>
                        <input
                            type="text"
                            placeholder="Service's name..."
                            onChange={(e) => setServiceDraft({...serviceDraft, serviceName: e.target.value})}
                            value={serviceDraft.serviceName}
                        />
                        <label>
                            Service's Description:
                        </label>
                        <textarea 
                            onChange={(e) => setServiceDraft({...serviceDraft, serviceDesc: e.target.value})}
                            value={serviceDraft.serviceDesc}
                            placeholder="Service's description..."
                        />
                        <label>
                            Service's Duration:
                        </label>
                        <div className='service-edit-hour'>
                            <input
                                type="text"
                                className='col-8'
                                placeholder="Service's duration..."
                                onChange={(e) => setServiceDraft({...serviceDraft, serviceDuration: e.target.value})}
                                value={serviceDraft.serviceDuration}
                            />
                            <label className='service-edit-hour-label'> Hours</label>
                        </div>
                        <label>
                            Service's Price:
                        </label>
                        <div className='service-edit-hour'>
                            <label className='service-edit-price-label'>RM</label>
                            <input
                                type="text"
                                placeholder="Service's price..."
                                onChange={(e) => setServiceDraft({...serviceDraft, servicePrice: e.target.value})}
                                value={serviceDraft.servicePrice}
                            />
                        </div>
                        <label>
                            Service's Status:
                        </label>
                        <select
                            className="select-100"
                            onChange={(e) => setServiceDraft({...serviceDraft, serviceStatus: e.target.value})}
                            value={serviceDraft.serviceStatus?serviceDraft.serviceStatus:""}
                        >
                            <option value="" disabled>Select status...</option>
                            <option value="Active">Active</option>
                            <option value="Hiddn">Hidden</option>
                        </select><br/>
                        <div className="service-buttons-group">
                            <button onClick={resetDraft}>Reset</button>
                            { selectedId === "CREATE" ? 
                                <button onClick={createService}>Create</button>
                            :
                                <button onClick={updateService}>Update</button>
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default ServiceForm