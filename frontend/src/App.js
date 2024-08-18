import './App.css';
import Loginform from './Components/Loginform/loginform'
import SignUp from './Components/SignUp/signup'
import HomePage from './Components/Homepage/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<Loginform />} />
        <Route path="/sign" element={<SignUp />} />
        <Route path="/homepage" element={<HomePage />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
