import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { IntlProvider } from 'react-intl';
import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

/* translations */
import translations from './translations';

/* styles */
import './styles/App.css';
import './styles/global.css';
import 'react-toastify/dist/ReactToastify.css';
import { lightTheme } from './styles/theme';

/* pages */
import Layout from './pages/layout';
import Home from './pages/home';

// user
import LoginForm from './pages/login';
import Register from './pages/register';
import Edit from './pages/edit';
import { ViewWithoutUid } from './pages/view';
import Following from './pages/following';
import MemberPage from './pages/memberPage';

// chat
import PrivateMessageList from './pages/private-messages';
import Chatroom from './pages/chatroom/chat-room';
import StartPrivate from './components/StartPrivate/StartPrivate';

// share post
import ShareCreate from './pages/shareCreate';
import ShareDetail from './pages/shareDetail';
// import SharePublished from './pages/sharePublished';
import ShareFind from './pages/shareFind';
import ShareToEdit from './pages/shareToEdit';
import ShareEdit from './pages/shareEdit';
import ShareToDelete from './pages/shareToDelete';
import SelfPost from './pages/allSelfPost/selfPost';

// my collect post
import MyCollectPost from './pages/myCollectPosts.js/myCollectPosts';

// tour
import TourCreate from './pages/tourCreate';
import TourEdit from './pages/tourEdit';
import TourDetail from './pages/tourDetail';

// trans
import TransCreate from './pages/transCreate';
import TransEdit from './pages/transEdit';
import TransDetail from './pages/transDetail';

// google login api
import { GoogleOAuthProvider } from '@react-oauth/google';

export const AuthContext = React.createContext();

function App() {

  const filterOptions = {
    trans: {
      productType: ['kitchen', 'living room', 'restroom', 'cosmetic', 'clothing', 'others'],
      transactionWay: ['sell', 'purchase', 'lend', 'borrow'],
      status: ['in stock', 'reserved', 'sold'],
      currency: ['USD', 'GBP', 'EUR', 'TWD', 'CAD', 'AUD']
    },
    tour: {
      status: ['ongoing', 'complete', 'end'],
      currency: ['USD', 'GBP', 'EUR', 'TWD', 'CAD', 'AUD']
    }
  }

  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');
  const [keyword, setKeyword] = useState('');
  const [search, setSearch] = useState(false);
  const [type, setType] = useState('all');
  const [sort, setSort] = useState('new');
  const [radius, setRadius] = useState(40075);
  const [filters, setFilters] = useState(filterOptions);
  const [token, setToken] = useState(localStorage.getItem('access_token') || '');


  const oauth_cliend_id = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID;

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    setToken(token);
  }, [localStorage.getItem('access_token')]);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <GoogleOAuthProvider clientId={oauth_cliend_id}>
        <IntlProvider locale={language} messages={translations[language]}>
          <ThemeProvider theme={lightTheme}>
            <ToastContainer
              position='bottom-right'
            />
            <Router>
              <div className="App">
                <Routes>
                  <Route
                    path='/'
                    element={
                      <Layout
                        language={language} setLanguage={setLanguage}
                        keyword={keyword} setKeyword={setKeyword} setType={setType}
                        setSearch={setSearch} setSort={setSort} setRadius={setRadius}
                        setFilters={setFilters} filterOptions={filterOptions}
                      />}
                  >
                    <Route path='' element={
                      <Home
                        keyword={keyword} search={search} setSearch={setSearch}
                        type={type} setType={setType} sort={sort} setSort={setSort}
                        radius={radius} setRadius={setRadius} filters={filters} setFilters={setFilters}
                        filterOptions={filterOptions}
                      />} />
                    <Route path='login' element={<LoginForm />} />
                    <Route path='register' element={<Register />} />
                    <Route path='edit' element={<Edit />} />
                    <Route path='member/:other_username' element={<MemberPage />} />
                    <Route path='member' element={<ViewWithoutUid />} />
                    <Route path='member/following' element={<Following />} />
                    <Route path='chat-list' element={<PrivateMessageList />} />
                    <Route path='chatroom/:chatid' element={<Chatroom />} />
                    <Route path='testing' element={<StartPrivate />} />
                    <Route path='post'>
                      <Route path='detail/:pid' element={<ShareDetail />} />
                      <Route path='create' element={<ShareCreate />} />
                      <Route path='published' element={<SelfPost />} />
                      <Route path='find' element={<ShareFind />} />
                      <Route path='to-edit' element={<ShareToEdit />} />
                      <Route path='edit/:pid' element={<ShareEdit />} />
                      <Route path='to-delete' element={<ShareToDelete />} />
                      <Route path='mycollect' element={<MyCollectPost />} />
                    </Route>
                    <Route path='tour'>
                      <Route path='create' element={<TourCreate />} />
                      <Route path='edit/:tid' element={<TourEdit />} />
                      <Route path='detail/:tid' element={<TourDetail />} />
                    </Route>
                    <Route path='trans'>
                      <Route path='create' element={<TransCreate />} />
                      <Route path='edit/:tid' element={<TransEdit />} />
                      <Route path='detail/:tid' element={<TransDetail />} />
                    </Route>
                  </Route>
                </Routes>
              </div>
            </Router>
          </ThemeProvider>
        </IntlProvider>
      </GoogleOAuthProvider>
    </AuthContext.Provider>
  );
}

export default App;
