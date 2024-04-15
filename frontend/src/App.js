import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './styles/App.css';
import './styles/global.css';

/* pages */
import Layout from './pages/layout';
import Home from './pages/home';

// user
import LoginForm from './pages/login';
import Register from './pages/register';
import Edit from './pages/edit';
import View from './pages/view';

// chat
import PrivateMessageList from './pages/private-messages';
import Chatroom from './pages/chatroom/chat-room';

// share post
import ShareCreate from './pages/shareCreate';
import ShareDetail from './pages/shareDetail';
import SharePublished from './pages/sharePublished';
import ShareFind from './pages/shareFind';
import ShareToEdit from './pages/shareToEdit';
import ShareEdit from './pages/shareEdit';
import ShareToDelete from './pages/shareToDelete';

// tour
import TourCreate from './pages/tourCreate';

function App() {
  return (
    <Router>
        <div className="App">
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route path='' element={<Home />} />
              <Route path='login' element={<LoginForm />} />
              <Route path='register' element={<Register />} />
              <Route path='edit' element={<Edit />} />
              <Route path='member' element={<View />} />   
              <Route path='chat-list' element={<PrivateMessageList/>}/>
              <Route path='chatroom/:chatid' element={<Chatroom/>} />
              <Route path='post'>
                <Route path='detail' element={<ShareDetail />} />
                <Route path='create' element={<ShareCreate />} />
                <Route path='published' element={<SharePublished />} />
                <Route path='find' element={<ShareFind />} />
                <Route path='to-edit' element={<ShareToEdit />} />
                <Route path='edit' element={<ShareEdit />} />
                <Route path='to-delete' element={<ShareToDelete />} />
              </Route>
              <Route path='tour'>
                <Route path='create' element={<TourCreate />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </Router>
  );
}

export default App;
