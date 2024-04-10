import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './styles/App.css';
import './styles/global.css';

import Layout from './pages/layout';
import Home from './pages/home';

import Header from './components/Header';

function App() {
  return (
    <Router>
        <Header />
        <div className="App">
          <Routes>
            <Route path='' element={<Layout />}>
              <Route path='/' element={<Home />} />
            </Route>
          </Routes>
        </div>
      </Router>
  );
}

export default App;
