import { useContext } from 'react';
import { UserContext } from '../store/UserContext';
import { PostContext } from '../store/PostContext';
import { FollowContext } from '../store/FollowContext';
import { Container } from 'reactstrap';
import ProfileHeader from './ProfileHeader';
import ProfileBody from './ProfileBody';
import './Profile.css';

const Profile = () => {
    const { users } = useContext(UserContext);
    const id = Number(localStorage.getItem('id'));
    const getUser = () => {
        return users.find((user) => id === user.id);
    };
	const { name, img } = getUser();
	const { posts } = useContext(PostContext);
	const { follows } = useContext(FollowContext);

    const getPosts = () => {
        return posts.filter((post) => post.userId === id);
    };
    const getFollower = () => {
        return follows.filter((follow) => follow.following === id);
    };
    const getFollowing = () => {
        return follows.filter((follow) => follow.follower == id);
    };

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
