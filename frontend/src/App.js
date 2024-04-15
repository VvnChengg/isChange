import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import './global.css';

import Layout from './pages/layout';
import Home from './pages/home';
import PrivateMessageList from './pages/private-messages/private-message-list';
import Chatroom from './pages/chatroom/chat-room';
import TourCreate from './pages/tourCreate';
import LoginForm from './components/Login/LoginForm';
import Register from './components/Register/Register';
import Edit from './components/Edit/Edit';
import View from './components/View/View';

function App() {
  return (
    <Router>
        <div className="App">
          <Routes>
            <Route path='' element={<Layout />}>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<LoginForm />} />
              <Route path='/register' element={<Register />} />
              <Route path='/edit' element={<Edit />} />
              <Route path='/member' element={<View />} />   
              <Route path='/chat-list' element={<PrivateMessageList/>}/>
              <Route path='/chatroom/:chatid' element={<Chatroom/>} />
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
