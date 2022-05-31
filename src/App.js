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

function App() {
    const [users, setUsers] = useState(Users); //Users로 users를 초기화
    const insertUsers = (user) => {
        const newUser = { ...user, userId: user.id, id: users.length + 1 };
        setUsers([...users, newUser]);
    };

    const [posts, setPosts] = useState(Post);
    const insertPost = (post) => {
        const newPost = { ...post, userId: Number(localStorage.getItem("id")), id: posts.length };
		setPosts([...posts, newPost]);
    };

	const [follows, setFollows] = useState(Follow);
	const insertFollow = (followerId) => {
		const newFollow = { following: Number(localStorage.getItem("id")), follower: followerId }
		setFollows([...follows, newFollow]);
	}

    return (
        <UserContext.Provider value={{ users, insertUsers }}>
			<PostContext.Provider value={{ posts, insertPost }}>
				<FollowContext.Provider value={{ follows, insertFollow }}>
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
				</FollowContext.Provider>
			</PostContext.Provider>
        </UserContext.Provider>
    );
}

export default App;
