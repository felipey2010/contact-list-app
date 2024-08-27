import React, { Suspense, lazy } from 'react'
import CookieConsent from './components/CookieConsent'
import Loading from './components/Loading'
import './styles/App.css'
import AppContext from './utils/AppContext'

const Home = lazy(() => import('./pages/Home'))

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <AppContext>
        <Home />
        <CookieConsent />
      </AppContext>
    </Suspense>
  )
}

export default App
