import { useState } from 'react';
import './Posts.css';
import ProfileBoardDetail from './PostDetail';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { deletePost, selectMyPost, selectOtherPost } from '../store/posts';
import { Spinner } from 'reactstrap';
import { selectUserById } from '../store/users';

const ProfileBoard = ({ postState, posts }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [clickPost, setClickPost] = useState();
    const [postUser, setPostUser] = useState();
    const dispatch = useDispatch();
    const location = useLocation();

    const openModal = (post) => {
        dispatch(selectUserById(post.userId))
            .unwrap()
            .then((result) => {
                setPostUser(result);
            })
            .finally(() => {
                setClickPost(post);
                setIsOpen(true);
            });
    };

    const closeModal = () => {
        setClickPost();
        setIsOpen(false);
    };

    const onClickDelete = async (postId) => {
        await dispatch(deletePost(postId));
        await dispatch(
            location.pathname === '/profile'
                ? selectMyPost()
                : selectOtherPost()
        );
        setIsOpen(false);
    };

    return (
        <div className="Posts">
            {postState.loading ? (
                <Spinner>Loading...</Spinner>
            ) : (
                posts?.map((post, i) => (
                    <div
                        className="PostsImgBox"
                        key={i}
                        onClick={() => openModal(post)}
                    >
                        <img
                            className="PostsImg"
                            key={post.id}
                            src={post.img}
                            alt={post.content}
                        ></img>
                    </div>
                ))
            )}
            {clickPost ? (
                <ProfileBoardDetail
                    isOpen={isOpen}
                    clickPost={clickPost}
                    closeModal={closeModal}
                    onClickDelete={onClickDelete}
                    user={postUser}
                ></ProfileBoardDetail>
            ) : null}
        </div>
    );
};

export default ProfileBoard;
