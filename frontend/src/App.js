import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './styles/App.css';
import './styles/global.css';

import Layout from './pages/layout';
import Home from './pages/home';
import TourCreate from './pages/tourCreate';

import Header from './components/Header';

function App() {
  return (
    <Router>
        <Header />
        <div className="App">
          <Routes>
            <Route path='' element={<Layout />}>
              <Route path='/' element={<Home />} />
              <Route path='/tour'>
                <Route path='create' element={<TourCreate />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </Router>
  );
}

export default App;
