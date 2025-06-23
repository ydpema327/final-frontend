import AppRoute from './components/AppRoutes'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <>
      <AppRoute />
      <ToastContainer position='bottom-right' />
    </>
  )
}

export default App
