import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import BootstrapLogin from './components/bootLogin/Login';
import Page404 from './components/Page404';
import Join from './components/Join/Join';
import { Users } from './data/User';
import { UserContext } from './components/store/UserContext';
import Layout from './components/Layout/Layout';
import Profile from './components/Profile/Profile';
import { Post } from './data/Post';
import { Follow } from './data/Follow';

function App() {
    const [users, setUsers] = useState(Users); //Users로 users를 초기화
    const insertUsers = (user) => {
        const newUser = { ...user, userId: user.id, id: users.length + 1 };
        setUsers([...users, newUser]);
    };

    const [posts, setPosts] = useState(Post);
    const insertFollow = (post) => {
        const newFollow = { following: Number() };
    };

    return (
        <UserContext.Provider value={{ users, insertUsers }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Profile />}></Route>
                        <Route path="/shopping" element={<Main />}></Route>
                    </Route>
                    <Route path="/login" element={<BootstrapLogin />}></Route>
                    <Route path="/*" element={<Page404 />}></Route>
                    <Route path="/join" element={<Join />}></Route>
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    );
}

export default App;
