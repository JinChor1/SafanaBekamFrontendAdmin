import Skeleton from 'react-loading-skeleton'

const ServiceCard = ({service, selectedId, setSelectedId}) => {
    return(
        <div className="patient-card-container col-12">
            { service?
                <div className={selectedId===service._id?"service-card service-card-selected":"service-card"} onClick={()=>setSelectedId(service._id)}>
                    <img alt="service-pic" src={service.servicePic} className="service-pic"/>
                    <div className="service-card-text">
                        <h4>{service.serviceName?service.serviceName:"???"}</h4>
                        <p>{service.serviceDesc}</p>
                        <p>{service.serviceDuration} Hour</p>
                        <p>RM {service.servicePrice}</p>
                    </div>
                </div>
            :
                <div className="service-card">
                    <Skeleton containerClassName='line-height-none' className='service-pic-skeleton' width={200} borderRadius={0}/>
                    <div className="service-card-text skeleton-flex">
                        <h4><Skeleton/></h4>
                        <p><Skeleton/></p>
                        <p><Skeleton/></p>
                        <p><Skeleton/></p>
                    </div>
                </div>
            }
        </div>
    )
}

export default ServiceCard
