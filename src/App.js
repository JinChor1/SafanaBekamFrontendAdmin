import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Bookings from './pages/Bookings'
import Patient from './pages/Patient'
import Calendar from './pages/Calendar'
import Services from './pages/Services'
import Settings from './pages/Settings'
import { useAuthContext } from './hooks/useAuthContext'
import SideNav from './components/SideNav'
import { ToastContainer } from 'react-toastify';
import { SkeletonTheme } from 'react-loading-skeleton';
import { BookModalContextProvider } from './context/BookModalContext'

const AuthContainer = () => (
  <div>
    <Routes>
      <Route index element={<Login/>}/>
    </Routes>
  </div>
)

const DefaultContainer = () => (
  <div>
      <BookModalContextProvider>
        <SideNav/>
        <Routes>
            <Route index element={<Home/>}/>
            <Route path="Calendar" element={<Calendar/>}/>
            <Route path="Bookings" element={<Bookings/>}/>
            <Route path="Patient" element={<Patient/>}/>
            <Route path="Services" element={<Services/>}/>
            <Route path="Settings" element={<Settings/>}/>
        </Routes>
      </BookModalContextProvider>
  </div>
)

function App() {   
  const { user } = useAuthContext()

  return (
    <div className="App">
      <SkeletonTheme baseColor="#e3e3e3" highlightColor="#c1c1c1" borderRadius={20}>
        <BrowserRouter>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <Routes>
            <Route path="/Auth/*" element={user?<Navigate to='/'/>:<AuthContainer/>}/>
            <Route path="/*" element={user?<DefaultContainer/>:<Navigate to='/Auth'/>}/>
          </Routes>
        </BrowserRouter>
      </SkeletonTheme>
    </div>
  );
}

export default App;
