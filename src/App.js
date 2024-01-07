import React from 'react';
import axios from './axios.js';
import { Routes, Route } from 'react-router-dom';

import './index.scss';

import Header from './components/Header/Header';

import Home from './pages/Home';
import Library from './pages/LibraryPage/Library';
import TestCentre from './pages/TestCentre/TestCentre';
import UserCabinet from './pages/UserCabinet/UserCabinet';
import Auth from './pages/Auth/Auth';
import CreateTest from './pages/CreateTest/CreateTest';
import TestSheet from './components/TestComponents/TestSheet/TestSheet';
import AdminPanel from './pages/Admin/Admin';
import TeacherCabinet from './pages/Teacher/TeacherCabinet/TeacherCabinet.jsx';
import TeacherTests from './pages/Teacher/TeacherTests/TeacherTests.jsx';
import TeacherResults from './pages/Teacher/TeacherResults/TeacherResults.jsx';
import TeacherAddPost from './pages/Teacher/TeacherAddPost/TeacherAddPost.jsx';
import TeacherPosts from './pages/Teacher/TeacherPosts/TeacherPosts.jsx';

export const AuthContext = React.createContext();

function App() {
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get('/auth/check');
        console.log(response);
        if (response.data.isAuthenticated) {
          setUser({
            isAuthenticated: response.data.isAuthenticated,
            role: response.data.role,
            username: response.data.username,
          });
          return true;
        } else {
          setUser({
            isAuthenticated: response.data.isAuthenticated,
            role: response.data.role,
            username: response.data.username,
          });
          return false;
        }
      } catch (error) {
        setUser({
          isAuthenticated: false,
          role: '',
        });
        return false;
      }
    } else {
      setUser({
        isAuthenticated: false,
        role: '',
      });
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, checkAuth }}>
      <div className="wrapper">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route path="/test-centre" element={<TestCentre />} />
          <Route path="/user-cabinet" element={<UserCabinet />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create-test" element={<CreateTest />} />
          <Route path="/test/:testId" element={<TestSheet />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/teacher-cabinet" element={<TeacherCabinet />} />
          <Route path="/teacher-cabinet/test" element={<TeacherTests />} />
          <Route path="/teacher-cabinet/results" element={<TeacherResults />} />
          <Route path="/teacher-cabinet/posts/create" element={<TeacherAddPost />} />
          <Route path="/teacher-cabinet/posts" element={<TeacherPosts />} />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
