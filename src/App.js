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
import { PostContext } from './components/store/PostContext';
import { FollowContext } from './components/store/FollowContext';
import Search from './components/search/Search';

function App() {
    const [users, setUsers] = useState(Users); //Users로 users를 초기화
    const insertUsers = (user) => {
        const newUser = { ...user, userId: user.id, id: users.length + 1 };
        setUsers([...users, newUser]);
    };
    const updateUsers = (form) => {
        const id = Number(localStorage.getItem('id'));
        const { img, name } = form;
        console.log(users);
        const findUsersindex = users.find((user) => user.id === id);
        if (findUsersindex.id === -1) {
            console.log('not found');
            return;
        }
        const newUsers = [...users];
        newUsers.splice(findUsersindex.id - 1, 1, {
            ...users[findUsersindex.id - 1],
            name,
            img,
        });
        //newUsers[findUsersindex] = { ...users[findUsersindex], name, img };
        setUsers(newUsers);
    };

    const [posts, setPosts] = useState(Post);
    const insertPost = (post) => {
        const newPost = {
            ...post,
            userId: Number(localStorage.getItem('id')),
            id: posts.length,
        };
        setPosts([...posts, newPost]);
    };
    const deletePost = (postId) => {
        const delPosts = posts.filter((post) => post.id !== postId);
        setPosts(delPosts);
    };

    const [follows, setFollows] = useState(Follow);
    const insertFollow = (followerId) => {
        const newFollow = {
            following: Number(localStorage.getItem('id')),
            follower: followerId,
        };
        setFollows([...follows, newFollow]);
    };

    return (
        <UserContext.Provider value={{ users, insertUsers, updateUsers }}>
            <PostContext.Provider value={{ posts, insertPost, deletePost }}>
                <FollowContext.Provider value={{ follows, insertFollow }}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Layout />}>
                                <Route index element={<Main />}></Route>
                                <Route
                                    path="/shopping"
                                    element={<Main />}
                                ></Route>
                                <Route
                                    path="/search"
                                    element={<Search />}
                                ></Route>
                                <Route
                                    path="/camera"
                                    element={<Main />}
                                ></Route>
                                <Route
                                    path="/profile"
                                    element={<Profile />}
                                ></Route>
                            </Route>
                            <Route
                                path="/login"
                                element={<BootstrapLogin />}
                            ></Route>
                            <Route path="/*" element={<Page404 />}></Route>
                            <Route path="/join" element={<Join />}></Route>
                        </Routes>
                    </BrowserRouter>
                </FollowContext.Provider>
            </PostContext.Provider>
        </UserContext.Provider>
    );
}

export default App;
