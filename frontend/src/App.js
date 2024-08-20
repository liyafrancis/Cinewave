import './App.css';
import Loginform from './Components/Loginform/loginform'
import Reservation from './Components/Reservation/reservation';
import SignUp from './Components/SignUp/signup'
import HomePage from './Components/Homepage/HomePage';
import Admin from './Components/Dashboard/Admin';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<Loginform />} />
        <Route path="/sign" element={<SignUp />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/reservation" element={<Reservation/>}/>
        <Route path="/admin-dashboard" element={<Admin/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
