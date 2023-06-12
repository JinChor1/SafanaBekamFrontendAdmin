import { useEffect, useState } from 'react';
import { useAuthAPI } from "../hooks/useAuthAPI"
import Skeleton from 'react-loading-skeleton'
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCalendarAlt,
} from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'

const EditBooking = ({bookingId,closeModal,setModalOption}) => {
    const [ bookingData, setBookingData ] = useState(null)
    const [ bookingDataDraft, setBookingDataDraft ] = useState(null)
    const [ serviceList, setServiceList ] = useState([])
    const { callAPI, isLoading, error, errorData } = useAuthAPI()

    useEffect(()=>{
        const fetchPatientBooking = async () => {
            const booking = await callAPI({
                method: "GET",
                apiRoute: `/api/admin/booking/view/${bookingId}`,
                payload: ""
            })     
            
            const serviceListRes = await callAPI({
                method: "GET",
                apiRoute: `/api/admin/service/list`,
                payload: ""
            })
            
            if (booking && serviceList) {
                setBookingData(booking[0])
                setBookingDataDraft(booking[0])
                setServiceList(serviceListRes)
            }
        }
        
        fetchPatientBooking()
    },[callAPI])


    const updateBooking = async () => {
        let payloadData = bookingDataDraft;

        if (bookingDataDraft.bookingStatus === "Cancelled") {
            payloadData = {...bookingDataDraft, bookingStatus: "Active"}
        }

        const updateRes = await callAPI({
            method: "PATCH",
            apiRoute: `/api/admin/booking/update/${bookingDataDraft._id}`,
            payload: payloadData
        }) 

        if (updateRes) {
            closeModal()
            toast.success(`Booking [${updateRes.bookingNumber}] updated successfully!`, {
                position: "top-center",
            })
        }
    }

    const completeBooking = () => {
        setModalOption("Complete")
    }

    const viewCompleted = () => {
        setModalOption("ViewCompleted")
    }

    const cancelBooking = async () => {
        const cancelRes = await callAPI({
            method: "PATCH",
            apiRoute: `/api/admin/booking/cancel/${bookingDataDraft._id}`
        }) 

        if (cancelRes) {
            closeModal()
            toast.success(`Booking [${cancelRes.bookingNumber}] cancelled successfully!`, {
                position: "top-center",
            })
        }
    }

    return (
        <div>
            {(!bookingData && isLoading) &&
                <div className='row d-flex'>
                    <div className='col-6'>
                        <form className='booking-edit-form'>
                            <div className='row'>
                                <label className='col-3'>
                                    <Skeleton />
                                </label>
                                <p className='booking-edit-disabled col-6'>
                                    <Skeleton />
                                </p>
                            </div>
                            <div className='row'>
                                <label className='col-3'>
                                    <Skeleton />
                                </label>
                                <p className='booking-edit-disabled col-6'>
                                    <Skeleton />
                                </p>
                            </div>
                            <div className='row'>
                                <label className='col-3'>
                                    <Skeleton />
                                </label>
                                <p className='booking-edit-disabled col-6'>
                                    <Skeleton />
                                </p>
                            </div>
                            <div className='row'>
                                <label className='col-3'>
                                    <Skeleton />
                                </label>
                                <p className='booking-edit-disabled col-6'>
                                    <Skeleton />
                                </p>
                            </div>
                            <div className='row'>
                                <label className='col-3'>
                                    <Skeleton />
                                </label>
                                <p className='booking-edit-disabled col-6'>
                                    <Skeleton />
                                </p>
                            </div>
                        </form>
                    </div>
                    <div className='col-6'>
                        <div className='booking-edit-header'>
                            <Skeleton alt="bookingPic" className="patient-picture" width={175} height={200} borderRadius={10}/>
                            <div className="booking-edit-header-content">
                                <p><Skeleton width={200}/></p>
                                <p><Skeleton width={200}/></p>
                                <p><Skeleton width={200}/></p>
                            </div>
                        </div>
                    </div>
                </div>
            }
            { bookingData &&
                <div className='row d-flex'>
                    <div className='col-6'>
                        <form className='booking-edit-form'>
                            <div className='row'>
                                <label className='col-3'>
                                    ID:
                                </label>
                                <p className='booking-edit-disabled col-6'>{
                                    bookingDataDraft.bookingNumber
                                    }
                                </p>
                            </div>
                            <div className='row'>
                                <label className='col-3'>
                                    Patient:
                                </label>
                                <p className='booking-edit-disabled col-6'>{
                                    bookingDataDraft.patientDetails.patientName + " (" + bookingDataDraft.patientDetails.patientPhone + ")"
                                    }
                                </p>
                            </div>
                            <div className='row'>
                                <label className='col-3'>
                                    Date / Time:
                                </label>
                                <div className="col-6 edit-datepicker">
                                    <div className="filter-icon">
                                        <FontAwesomeIcon icon={faCalendarAlt}/>
                                    </div>
                                    <DatePicker 
                                        className="text-input-icon"
                                        placeholderText="Date"
                                        showTimeSelect
                                        dateFormat="Pp"
                                        selected={new Date(bookingDataDraft.bookingDate.startTime)} 
                                        onChange={(e) => setBookingDataDraft({...bookingDataDraft, bookingDate:
                                            {
                                                startTime: e
                                            }
                                        })}
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <label className='col-3'>
                                    Service:
                                </label>
                                <select
                                    className={errorData && errorData.includes("patientRace")?"filter-select invalid-input col-6":"filter-select col-6"}
                                    onChange={(e) => setBookingDataDraft({...bookingDataDraft, serviceId: e.target.value})}
                                    value={bookingDataDraft.serviceId}
                                >
                                    {serviceList.map((service)=>(
                                        <option key={service._id} value={service._id}>{service.serviceName}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='row'>
                                <label className='col-3'>
                                    Notes:
                                </label>
                                <input
                                    type="text"
                                    className={errorData && errorData.includes("bookingNumber")?"invalid-input col-6":"col-6"}
                                    onChange={(e) => setBookingDataDraft({...bookingDataDraft, bookingNotes: e.target.value})}
                                    value={bookingDataDraft.bookingNotes}
                                />
                            </div>
                        </form>
                    </div>
                    <div className='col-6'>
                        <div className='booking-edit-header'>
                            <img src={bookingData.serviceDetails.servicePic} alt="bookingPic" className="patient-picture"/>
                            <div className="booking-edit-header-content">
                                <p
                                    data-type={bookingData.bookingStatus}
                                    className="booking-edit-status"
                                ><strong>Status: </strong>{bookingData.bookingStatus==="Active"?"Upcoming":bookingData.bookingStatus}</p>
                                <p><strong>Date added: </strong>{new Date(bookingData.createdAt).toLocaleString('en-NZ',{day: "numeric" ,month: "short", year: "numeric"})}</p>
                                <p><strong>Time added: </strong>{new Date(bookingData.createdAt).toLocaleString('en-NZ',{hour: "numeric" ,minute: "numeric", hour12: true})}</p>
                                
                                { bookingData.bookingStatus === "Active" &&
                                    <button onClick={completeBooking} className='button-complete'>Complete Booking</button>
                                }
                                { bookingData.bookingStatus === "Completed" &&
                                    <button onClick={viewCompleted} className='button-complete'>View Records</button>
                                }
                                { bookingData.bookingStatus !== "Cancelled" &&
                                    <button onClick={cancelBooking} className='button-cancel'>Cancel Booking</button>
                                }
                            </div>
                        </div>
                    </div>
                    { (JSON.stringify(bookingData) !== JSON.stringify(bookingDataDraft)) &&
                        <div className="booking-edit-footer">
                            <button onClick={updateBooking} className="button-complete">{bookingData.bookingStatus === "Cancelled"?"Reactivate booking":"Update booking"}</button>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default EditBooking