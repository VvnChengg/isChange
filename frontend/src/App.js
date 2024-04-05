import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import './global.css';

import Home from './pages/home';

import Header from './components/Header';

function App() {
  return (
    <Router>
        <Header />
        <div className="App">
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
