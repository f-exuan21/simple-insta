import { useContext, useEffect } from 'react';
import { FollowContext } from '../store/FollowContext';
import { Container } from 'reactstrap';
import ProfileHeader from './ProfileHeader';
import ProfileBody from './ProfileBody';
import './Profile.css';
import ProfileBoard from '../Posts/Posts';
import { useDispatch, useSelector } from 'react-redux';
import { selectMyPost } from '../store/posts';

const Profile = () => {
    const { name, img, id } = useSelector((state) => state.users.me);
    const myPosts = useSelector((state) => state.posts.myPosts);
    const { follows } = useContext(FollowContext);
    const dispatch = useDispatch();

    const getPosts = () => {
        dispatch(selectMyPost());
    };

    useEffect(() => {
        getPosts();
    }, []);

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
                    posts={myPosts.posts}
                    follower={getFollower()}
                    following={getFollowing()}
                    name={name}
                ></ProfileBody>
                <ProfileBoard
                    posts={myPosts.posts}
                    postState={myPosts}
                ></ProfileBoard>
            </Container>
        </>
    );
};

export default Profile;
