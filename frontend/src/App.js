import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import './global.css';
import Home from './pages/home';
import Header from './components/Header';
import LoginForm from './components/Login/LoginForm';
import Register from './components/Register/Register';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="app-content">
          <div className='content-wrapper'>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<LoginForm />} />
                <Route path='/register' element={<Register />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;