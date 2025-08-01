import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Aboutmanagement from './admin/Aboutmanagement';
import Careermanagement from './admin/Careermanagement';
import Careerpage from './admin/Careerpage';
import Changepage from './admin/Changepage';
import Dashboard from './admin/Dashboard';
import Detailmanagement from './admin/Detailmanagement';
import Footermanagement from './admin/Footermanagement';
import Forgotpage from './admin/Forgotpage';
import Login from './admin/Login';
import Mainimagemanagement from './admin/Mainimagemanagement';
import Productmanagement from './admin/Productmanagement';
import Productpage from './admin/Productpage';
import Querymanagement from './admin/Querymanagement';
import Querypage from './admin/Querypage';
import Testimanagement from './admin/Testimanagement';
import Footer from './components/Footer';
import Header from './components/Header';
import About from './screen/About';
import Alltesti from './screen/Alltesti';
import Career from './screen/Career';
import Home from './screen/Home';
import Product from './screen/Product';
import Testi from './screen/Testi';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/testi' element={<Testi />}></Route>
          <Route path='/alltesti' element={<Alltesti />}></Route>
          <Route path='/product/:id' element={<Product />}></Route>
          <Route path='/querypage/:id' element={<Querypage />}></Route>
          <Route path='/careerpage/:id' element={<Careerpage />}></Route>
          <Route path='/career' element={<Career />}></Route>
          <Route path='/productpage' element={<Productpage />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/mainimagemanagement' element={<Mainimagemanagement />}></Route>
          <Route path='/detailmanagement' element={<Detailmanagement />}></Route>
          <Route path='/aboutmanagement' element={<Aboutmanagement />}></Route>
          <Route path='/testimanagement' element={<Testimanagement />}></Route>
          <Route path='/productmanagement' element={<Productmanagement />}></Route>
          <Route path='/querymanagement' element={<Querymanagement />}></Route>
          <Route path='/footermanagement' element={<Footermanagement />}></Route>
          <Route path='/careermanagement' element={<Careermanagement />}></Route>
          <Route path='/changepage' element={<Changepage />}></Route>
          <Route path='/forgotlink' element={<Forgotpage />}></Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;