import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { Navbar } from './components/navbar/Navbar'
import HomePage from './pages/Home'
import { PrivateRoutes } from './routes/PrivateRoutes'
import { SettingsPage } from './pages/Settings'
import { Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const CreateOffer = lazy(() => import('./pages/create-offer'))
const Transaction = lazy(() => import('./pages/Transaction'))
const Profile = lazy(() => import('./pages/Profile'))

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="max-w-5xl mx-auto">
        <Suspense fallback={<></>}>
          <Routes>
            {/* <Route element={<PrivateRoutes />}> */}
            <Route path={'/create-offer'} element={<CreateOffer />} />
            <Route path={'/settings'} element={<SettingsPage />} />
            <Route path={'/transaction/:id'} element={<Transaction />} />
            <Route path={'/profile'} element={<Profile />} />
            {/* </Route> */}
            <Route path={'/not-connected'} element={<h1>Please connect your web3 wallet</h1>} />
            <Route path={'/'} element={<HomePage />} />
            <Route path={'*'} element={<Navigate to={'/'} />} />
          </Routes>
        </Suspense>
      </main>
    </BrowserRouter>
  )
}

export default App
