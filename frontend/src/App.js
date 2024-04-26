import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { IntlProvider } from 'react-intl';
import { useEffect, useState } from 'react';

/* translations */
import translations from './translations';

/* styles */
import './styles/App.css';
import './styles/global.css';
import { lightTheme } from './styles/theme';

/* pages */
import Layout from './pages/layout';
import Home from './pages/home';

// user
import LoginForm from './pages/login';
import Register from './pages/register';
import Edit from './pages/edit';
import {ViewWithUid, ViewWithoutUid} from './pages/view';

// chat
import PrivateMessageList from './pages/private-messages';
import Chatroom from './pages/chatroom/chat-room';
import StartPrivate from './components/StartPrivate/StartPrivate';

// share post
import ShareCreate from './pages/shareCreate';
import ShareDetail from './pages/shareDetail';
import SharePublished from './pages/sharePublished';
import ShareFind from './pages/shareFind';
import ShareToEdit from './pages/shareToEdit';
import ShareEdit from './pages/shareEdit';
import ShareToDelete from './pages/shareToDelete';
import SelfPost from './pages/allSelfPost/selfPost';

// tour
import TourCreate from './pages/tourCreate';
import TourEdit from './pages/tourEdit';
import TourDetail from './pages/tourDetail';

// trans
import TransCreate from './pages/transCreate';
import TransEdit from './pages/transEdit';
import TransDetail from './pages/transDetail';

function App() {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <IntlProvider locale={language} messages={translations[language]}>
      <ThemeProvider theme={lightTheme}>
        <Router>
            <div className="App">
              <Routes>
                <Route path='/' element={<Layout language={language} setLanguage={setLanguage} />}>
                  <Route path='' element={<Home />} />
                  <Route path='login' element={<LoginForm />} />
                  <Route path='register' element={<Register />} />
                  <Route path='edit' element={<Edit />} />
                  <Route path='member' element={<ViewWithoutUid />} />
                  <Route path='member/:uid' element={<ViewWithUid />} />
                  <Route path='chat-list' element={<PrivateMessageList/>}/>
                  <Route path='chatroom/:chatid' element={<Chatroom/>} />
                  <Route path='testing' element={<StartPrivate/>} />
                  <Route path='post'>
                    <Route path='detail' element={<ShareDetail />} />
                    <Route path='create' element={<ShareCreate />} />
                    <Route path='published' element={<SharePublished />} />
                    <Route path='find' element={<ShareFind />} />
                    <Route path='to-edit' element={<ShareToEdit />} />
                    <Route path='edit' element={<ShareEdit />} />
                    <Route path='to-delete' element={<ShareToDelete />} />
                    <Route path='self' element={<SelfPost />} />
                  </Route>
                  <Route path='tour'>
                    <Route path='create' element={<TourCreate />} />
                    <Route path='edit' element={<TourEdit />} />
                    <Route path='detail' element={<TourDetail />} />
                  </Route>
                  <Route path='trans'>
                    <Route path='create' element={<TransCreate />} />
                    <Route path='edit' element={<TransEdit />} />
                    <Route path='detail' element={<TransDetail />} />
                  </Route>
                </Route>
              </Routes>
            </div>
          </Router>
        </ThemeProvider>
      </IntlProvider>
  );
}

export default App;
