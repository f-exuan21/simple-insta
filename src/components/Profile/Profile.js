import { useContext } from 'react';
import { UserContext } from '../store/UserContext';
import { Container } from 'reactstrap';
import ProfileHeader from './ProfileHeader';
import ProfileBody from './ProfileBody';
import './Profile.css';
import { Post } from '../../data/Post';
import { Follow } from '../../data/Follow';

const Profile = () => {
    const { users } = useContext(UserContext);
    const id = Number(localStorage.getItem('id'));
    const getUser = () => {
        return users.find((user) => id === user.id);
    };

    const getPosts = () => {
        const userPosts = Post.filter((post) => post.userId === id);
        return userPosts;
    };
    const getFollower = () => {
        return Follow.filter((follow) => follow.following === id);
    };
    const getFollowing = () => {
        return Follow.filter((follow) => follow.follower == id);
    };
    const { name, img } = getUser();
    return (
        <>
            <ProfileHeader name={name}></ProfileHeader>
            <Container className="ProfileContainer">
                <ProfileBody
                    img={img}
                    posts={getPosts}
                    follower={getFollower}
                    following={getFollowing}
                ></ProfileBody>
            </Container>
        </>
    );
};

export default Profile;
