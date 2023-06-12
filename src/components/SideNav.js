import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faChartPie,
    faUser,
    faGear,
    faRightFromBracket
 } from '@fortawesome/free-solid-svg-icons'
import { 
    faCalendar,
    faFile,
    faClipboard
 } from '@fortawesome/free-regular-svg-icons'
import { useLogOut } from '../hooks/useLogOut'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
    const pathName = useLocation().pathname.split("/")[1]
    const { logout } = useLogOut()
    const { user } = useAuthContext()

    return(
        <header>
            {/* Side Nav */}
            <div className="container-nav">
                <Link to="/">
                    <img src="https://69364-fyp-system.s3.ap-southeast-1.amazonaws.com/blackLogo.png" alt="Main Logo"/>
                </Link>
                <div className="nav">
                    <Link to="/" className={pathName===""?"nav-selected":""}>
                        <p><FontAwesomeIcon icon={faChartPie}/></p><h4>Dashboard</h4>
                    </Link>
                    <Link to="/Calendar" className={pathName==="Calendar"?"nav-selected":""}>
                        <p><FontAwesomeIcon icon={faCalendar}/></p><h4>Calendar</h4>
                    </Link>
                    <Link to="/Bookings" className={pathName==="Bookings"?"nav-selected":""}>
                        <p><FontAwesomeIcon icon={faFile}/></p><h4>Bookings</h4>
                    </Link>
                    <Link to="/Patient" className={pathName==="Patient"?"nav-selected":""}>
                        <p><FontAwesomeIcon icon={faUser}/></p><h4>Patient</h4>
                    </Link>
                    <Link to="/Services" className={pathName==="Services"?"nav-selected":""}>
                        <p><FontAwesomeIcon icon={faClipboard}/></p><h4>Services</h4>
                    </Link>
                    <Link to="/Settings" className={pathName==="Settings"?"nav-selected":""}>
                        <p><FontAwesomeIcon icon={faGear}/></p><h4>Settings</h4>
                    </Link>
                    <Link onClick={logout}>
                        <p><FontAwesomeIcon icon={faRightFromBracket}/></p><h4>Sign Out</h4>
                    </Link>
                </div>
            </div>
            {/* Top Nav */}
            <div className="top-container-nav">
                <h1>{pathName===""?"Dashboard":pathName}</h1>
                <div className="account-cont">
                    <div className='account-cont-icon'><FontAwesomeIcon icon={faUser}/></div>
                    <div className="account-cont-name">
                        <strong>{user?user.adminUsername:""}</strong>
                        <p>{user?"Admin":""}</p>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar