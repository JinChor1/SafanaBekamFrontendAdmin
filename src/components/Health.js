import HealthCheckbox from './HealthCheckbox'

const Health = ({patientDraft , setPatientDraft}) => {
    return(
        <form className="profile-form auth-form row">
            {patientDraft && Object.keys(patientDraft.healthBackground).map((disease) => (
                <div key={disease} className="disease-container col-md-5">
                    <h4>{patientDraft.healthBackground[disease].displayName}:</h4>
                    <HealthCheckbox statePassed={[ patientDraft, setPatientDraft ]} diseaseField={disease}/>
                </div>
            ))}
        </form>
    )
}

export default Health