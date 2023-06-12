import { useEffect, useState } from 'react';
import { useAuthAPI } from "../hooks/useAuthAPI"
import BodyMap from './BodyMap';
import Skeleton from 'react-loading-skeleton'
import { toast } from 'react-toastify'

const ViewCompleted = ({bookingId,closeModal,setModalOption}) => {
    const [ bookingData, setBookingData ] = useState(null)
    const { callAPI, isLoading, error, errorData } = useAuthAPI()
    const [ beforeBPRecord, setBeforeBPRecord] = useState({BPM: "", SYS: "", DIA: ""})
    const [ afterBPRecord, setAfterBPRecord] = useState({BPM: "", SYS: "", DIA: ""})
    const [ healthProblem, setHealthProblem] = useState("")
    const [ selectedPart, setSelectedPart ] = useState("")
    const [ remarks, setRemarks ] = useState([])

    useEffect(()=>{
        const fetchPatientBooking = async () => {
            const booking = await callAPI({
                method: "GET",
                apiRoute: `/api/admin/booking/view/${bookingId}`,
                payload: ""
            }) 
            
            if (booking) {
                setBookingData(booking[0])
                setBeforeBPRecord(booking[0].completedData.beforeBP)
                setAfterBPRecord(booking[0].completedData.afterBP)
                setHealthProblem(booking[0].completedData.healthProblem)
                setRemarks(booking[0].completedData.remarks)
            }
        }
        
        fetchPatientBooking()
    },[callAPI])

    const editBooking = () => {
        setModalOption("Edit")
    }

    return(
        <div>
            {(!bookingData && isLoading) &&
                <div className='booking-complete-form'>
                    <div className="row">
                        <div className="col-5">
                            <div className="booking-complete-section">
                                <h4><Skeleton width={50}/></h4>
                                <p><Skeleton width={200}/></p>
                                <p><Skeleton width={200}/></p>
                                <p><Skeleton width={200}/></p>
                                <p><Skeleton width={200}/></p>
                                <p><Skeleton width={100}/></p>
                            </div>
                            <div className="booking-complete-section">
                                <h4><Skeleton width={50}/></h4>
                                <div className="booking-bp-row">
                                    <p className='col-2'><Skeleton width={50}/></p>
                                    <p><Skeleton width={100}/></p>
                                </div>
                                <div className="booking-bp-row">
                                    <p className='col-2'><Skeleton width={50}/></p>
                                    <p><Skeleton width={100}/></p>
                                </div>
                                <div className="booking-complete-section">
                                    <h4><Skeleton width={50}/></h4>
                                    <Skeleton height={100}/>
                                </div>
                            </div>
                        </div>
                        <div className="col-7">
                            <div className="booking-complete-section">
                                <h4><Skeleton width={50}/></h4>
                                <div className='row'>
                                    <div className="col-8">
                                        <Skeleton width={300} height={350}/>
                                    </div>
                                    <div className="col-4">
                                        <Skeleton className='booking-body-map-textarea'/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            { bookingData && 
                <div className='booking-complete-form'>
                    <div className="row">
                        <div className="col-5">
                            <div className="booking-complete-section">
                                <h4>Details</h4>
                                <p><strong>ID: </strong>{bookingData.bookingNumber}</p>
                                <p><strong>Patient: </strong>{bookingData.patientDetails.patientName}</p>
                                <p><strong>Date/Time: </strong>{new Date(bookingData.bookingDate.startTime).toLocaleString('en-NZ',{day: "numeric" ,month: "short", year: "numeric", hour: "numeric" ,minute: "numeric", hour12: true})}</p>
                                <p><strong>Service: </strong>{bookingData.serviceDetails.serviceName}</p>
                                <button className="button-edit" onClick={editBooking}>Edit Booking</button>
                            </div>
                            <div className="booking-complete-section">
                                <h4>BP</h4>
                                <div className="booking-bp-row">
                                    <p className='col-2'><strong>Before: </strong></p>
                                    <p>{beforeBPRecord.SYS} (SYS) / {beforeBPRecord.DIA} (DIA) / {beforeBPRecord.BPM} (BPM)</p>
                                </div>
                                <div className="booking-bp-row">
                                    <p className='col-2'><strong>After: </strong></p>
                                    <p>{afterBPRecord.SYS} (SYS) / {afterBPRecord.DIA} (DIA) / {afterBPRecord.BPM} (BPM)</p>
                                </div>
                                <div className="booking-complete-section">
                                    <h4>Health Problem</h4>
                                    <textarea 
                                        onChange={(e) => setHealthProblem(e.target.value)}
                                        value={healthProblem}
                                        placeholder='No health problem...'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-7">
                            <div className="booking-complete-section">
                                <h4>Remarks</h4>
                                <div className='row'>
                                    <div className="col-8">
                                        <BodyMap 
                                            selectedPart={selectedPart} 
                                            setSelectedPart={setSelectedPart} 
                                            hasContent={remarks.map(each => (each.id))}
                                        />
                                        <div className="body-map-legend">
                                            <div className="selected-legend"></div>
                                            <p>Selected</p>
                                            <div className="hasContent-legend"></div>
                                            <p>Edited</p>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <textarea
                                            className='booking-body-map-textarea'
                                            placeholder={selectedPart===""?"Please select a part first!":"No remark described on selected part..."}
                                            disabled={selectedPart===""?true:false}
                                            onChange={(e) => {
                                                if (e.target.value==="") {
                                                    // remove if empty string
                                                    setRemarks( prevstate => prevstate.filter( arr => arr.id!==selectedPart))
                                                } else {
                                                    let foundIndex = remarks.findIndex( arr => arr.id === selectedPart)
                                                    if (foundIndex===-1){
                                                        // add if not found
                                                        setRemarks( prevstate => [...prevstate, {
                                                            id: selectedPart,
                                                            data: e.target.value
                                                        }])
                                                    } else {
                                                        // update if found
                                                        setRemarks(prevstate => prevstate.map(each => {
                                                            if(each.id === selectedPart){
                                                                return {id: selectedPart, data: e.target.value}
                                                            }

                                                            return each
                                                        }))
                                                    }
                                                }
                                            }}
                                            value={remarks.find(each => each.id === selectedPart)?remarks.find(each => each.id === selectedPart).data:""}
                                        />
                                        <button className='button-deselect' onClick={()=>setSelectedPart("")}>Deselect</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default ViewCompleted