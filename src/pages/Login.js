import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faUser,
    faLock
 } from '@fortawesome/free-solid-svg-icons'
import { useLogIn } from '../hooks/useLogIn'

const Login = () => {
    const { login, isLoading, error } = useLogIn() 
    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")


    useEffect(()=>{
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login({
            companyId: "642eba43b8443b189beec436",
            adminUsername: username,
            adminPassword: password
        })
    }

    return(
        <div className="login-body">
            <div className="company-logo">
                <img src="https://69364-fyp-system.s3.ap-southeast-1.amazonaws.com/blackLogo.png" alt="Main Logo"/>
                <p className="placeholder-text">Administrator Management</p>
            </div>
            <form onSubmit={handleSubmit} className="login-form">
                <label className="label-icon">
                    <div className="input-icon">
                        <FontAwesomeIcon icon={faUser}/>
                    </div>
                    <input
                        className="text-input-icon"
                        type="text"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                    />
                </label>
                <label className="label-icon">
                    <div className="input-icon">
                        <FontAwesomeIcon icon={faLock}/>
                    </div>
                    <input
                        className="text-input-icon"
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </label>
                {error && <div className="error">{error}</div> }
                <button className="button-secondary">Sign In</button>
            </form>
        </div>
    )
}

export default Login