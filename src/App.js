import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Banner from './components/layout/Banner';
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Menu from './components/layout/Menu';
import useUserRoutes from './components/routes/userRoutes';
import useAdminRoutes from './components/routes/adminRoutes';

function App() {

  const userRoutes = useUserRoutes();
  const adminRoutes = useAdminRoutes();

  return (
    <Router>
      <div className="App">
        <Toaster position="top-center" />
        <Header />
        <Menu />
        <Banner />

        <div className="container">
          <Routes>
            { userRoutes }
            { adminRoutes }
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
