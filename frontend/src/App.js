import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './styles/App.css';
import './styles/global.css';

import Layout from './pages/layout';
import ShareCreate from './pages/shareCreate';
import ShareEdit from './pages/shareEdit';
import ShareDetail from './pages/shareDetail';

import Header from './components/Header';
import Home from './pages/home/home'

function App() {
  return (
    <Router>
        <Header />
        <div className="App">
          <Routes>
            <Route path='' element={<Layout />}>
              <Route path='/' element={<Home />} />
              <Route path='/shareDetail' element={<ShareDetail />} />
              <Route path='/shareCreate' element={<ShareCreate />} />
              <Route path='/shareEdit' element={<ShareEdit />} />
            </Route>
          </Routes>
        </div>
      </Router>
  );
}

export default App;
