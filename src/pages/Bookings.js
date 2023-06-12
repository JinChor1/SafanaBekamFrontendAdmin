import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useAuthAPI } from "../hooks/useAuthAPI"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faMagnifyingGlass,
    faCalendarAlt,
    faFilter,
    faMagnifyingGlassChart
} from '@fortawesome/free-solid-svg-icons'
import DatePicker from "react-datepicker";
import Skeleton from 'react-loading-skeleton'
import { useBookModalContext } from "../hooks/useBookModalContext"

// table style
const customStyles = {
    pagination: {
        style:{
            fontSize: '1rem',
            fontWeight: 900,
            color: "#212161",
        },
        pageButtonsStyle: {
            color: "#212161",
            fill: "#212161",
        }
    }
}

// table loading
const Loader = () => {
    return(
        <Skeleton 
            containerClassName="skeleton-flex-zindex" 
            height={500} 
            borderRadius={0}
        />
    )
}

// table empty 
const NoData = () => {
    return(
        <div className='no-data'>
            <p className="not-found-icon"><FontAwesomeIcon icon={faMagnifyingGlassChart}/></p>
            <h4> No booking found...</h4>
        </div>
    )
}

const Bookings = () => {
    const [ total, setTotal ] = useState(0)
    const [ page, setPage ] = useState(1)
    const [ perPage, setPerPage ] = useState(10)
    const [ data, setData ] = useState([])
    const [ sortField , setSortField ] = useState("updatedAt") 
    const [ sortDirection , setSortDirection ] = useState("desc") 
    const [ search, setSearch ] = useState("")
    const [ date, setDate ] = useState(null)
    const [ statusFilter, setStatusFilter ] = useState("null")
    const { callAPI, isLoading, error } = useAuthAPI()
    const { openModal } = useBookModalContext()

    // column
    const columns = [
        {
            name: "ID",
            selector: row => row.bookingNumber,
            sortable: true,
            sortField: 'bookingNumber',
        },
        {
            name: 'Patient',
            selector: row => row.patientDetails.patientName,
            sortable: true,
            sortField: 'patientDetails.patientName',
        },
        {
            name: 'Date',
            selector: row => new Date(row.bookingDate.startTime).toLocaleString('en-NZ',{day: "numeric" ,month: "short", year: "numeric"}),
            sortable: true,
            sortField: 'bookingDate.startTime',
        },
        {
            name: 'Time',
            selector: row => new Date(row.bookingDate.startTime).toLocaleString('en-NZ',{hour: 'numeric', minute: 'numeric', hour12: true }),
            sortable: true,
            sortField: 'bookingDate.startTime',
        },
        {
            name: 'Service',
            selector: row => row.serviceDetails.serviceName,
            sortable: true,
            sortField: 'serviceDetails.serviceName',
        },
        {
            name: 'Status',
            selector: row => row.bookingStatus=== "Active"?"Upcoming":row.bookingStatus,
            conditionalCellStyles: [
                {
                    when: row => row.bookingStatus === "Active",
                    classNames: ['status-warning'],
                },
                {
                    when: row => row.bookingStatus === "Completed",
                    classNames: ['status-success'],
                },
                {
                    when: row => row.bookingStatus === "Cancelled",
                    classNames: ['status-error'],
                },
            ],
            sortable: true,
            sortField: 'bookingStatus',
        },
        {
            name: 'Action',
            width: '250px',
            cell: row => 
                <div className='booking-table-buttons'>
                    { row.bookingStatus === "Active" ?
                        <div className='booking-table-buttons'>
                            <div className='booking-button col-5'>
                                <button 
                                    className='button-complete col'
                                    onClick={()=>openModal({_id: row._id, modalOption: "Complete"})}
                                >
                                    Complete
                                </button>
                            </div>
                            <div className='booking-button col-4'>
                                <button 
                                    className='button-warning col'
                                    onClick={()=>openModal({_id: row._id, modalOption: "Edit"})}
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                        :
                        <div className='booking-table-buttons'>
                            <div className='booking-button col-6'>
                                <button 
                                    className='button-warning col'
                                    onClick={()=>openModal({_id: row._id, modalOption: "Edit"})}
                                >
                                    View/Edit
                                </button>
                            </div>
                        </div>
                    }
                </div>
        }
    ];

    useEffect(()=>{
        const fetchDatatable = async () => {
            const bookingData = await callAPI({
                method: "GET",
                apiRoute: `/api/admin/datatable/booking/${page}/${perPage}/${sortField}/${sortDirection}/${date?new Date(date).toISOString():date}/${statusFilter}/${search===""?"null":search}`,
                payload: ""
            })

            if (bookingData){
                setData(bookingData.data)
                setTotal(bookingData.total)
            }
        }
        fetchDatatable()
    },[page,perPage,callAPI,sortField,sortDirection,date,statusFilter,search,openModal])

    return(
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
                            placeholder="Search... ( ID, Patient Name, Service Name)"
                            onChange={(e) => {setSearch(e.target.value.replace(/[^a-zA-Z0-9 \-\_\.\~]/g,""))}}
                            value={search}
                        />
                    </label>
                    <div className='filter-subrow col-5'>
                        <label className="filter-label col-5">
                            <div className="filter-icon">
                                <FontAwesomeIcon icon={faCalendarAlt}/>
                            </div>
                            <DatePicker 
                                className="text-input-icon"
                                placeholderText="Date"
                                selected={date} 
                                onChange={(date) => setDate(date)}
                            />
                        </label>
                        <label className="filter-label col-5">
                            <div className="filter-icon">
                                <FontAwesomeIcon icon={faFilter}/>
                            </div>
                            <select
                                className="text-input-icon filter-select"
                                placeholder="Status Filter"
                                onChange={(e) =>  setStatusFilter(e.target.value)}
                                value={statusFilter}
                            >
                                <option value="null">All Services</option>
                                <option value="Active">Upcoming</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </label>
                    </div>
                    
                </div>
                
                <div className="booking-wrapper">
                    <DataTable
                        className="booking-datatable"
                        customStyles={customStyles}
                        columns={columns}
                        data={data}
                        progressPending={isLoading}
                        progressComponent={<Loader />}
                        noDataComponent={<NoData />}
                        // pagination
                        pagination
                        paginationServer
                        paginationTotalRows={total}
                        onChangeRowsPerPage={(newPerPage, page) => {
                            setPage(page)
                            setPerPage(newPerPage)
                        }}
                        onChangePage={(page)=>{
                            setPage(page)
                        }}
                        // sorting
                        onSort={(column, sortDirection) => {
                            setSortField(column.sortField)
                            setSortDirection(sortDirection)
                        }}
                        sortServer  
                    />
                </div>
                
            </div>
        </div>
    )
}

export default Bookings