import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './styles/App.css';
import './styles/global.css';

import Layout from './pages/layout';
import ShareCreate from './pages/shareCreate';
import ShareDetail from './pages/shareDetail';
import SharePublished from './pages/sharePublished';
import ShareFind from './pages/shareFind';
import ShareToEdit from './pages/shareToEdit';
import ShareEdit from './pages/shareEdit';
import ShareToDelete from './pages/shareToDelete';

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
              <Route path='/post/detail' element={<ShareDetail />} />
              <Route path='/post/create' element={<ShareCreate />} />
              <Route path='/post/published' element={<SharePublished />} />
              <Route path='/post/find' element={<ShareFind />} />
              <Route path='/post/to-edit' element={<ShareToEdit />} />
              <Route path='/post/edit' element={<ShareEdit />} />
              <Route path='/post/to-delete' element={<ShareToDelete />} />
            </Route>
          </Routes>
        </div>
      </Router>
  );
}

export default App;
