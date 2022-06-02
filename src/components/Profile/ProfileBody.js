import { useState } from 'react';
import { Button } from 'reactstrap';
import './ProfileBody.css';
import ProfileUpdate from './ProfileUpdate';

const ProfileBody = ({
    posts,
    follower,
    following,
    img = '/img/profile/1.jpeg',
    name = 'park',
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const modalClose = () => {
        setIsOpen(false);
    };
    const modalOpen = () => {
        setIsOpen(true);
    };
    return (
        <>
            <ProfileUpdate
                img={img}
                name={name}
                isOpen={isOpen}
                modalClose={modalClose}
            ></ProfileUpdate>
            <div className="profileBodyBox">
                <div className="profileImgBox">
                    <img
                        className="profileImg"
                        src={img}
                        alt="myProfileImg"
                    ></img>
                </div>
                <div className="profileTextBox">
                    <div>
                        {posts.length}
                        <br></br>
                        게시물
                    </div>
                    <div>
                        {follower.length}
                        <br></br>
                        팔로워
                    </div>
                    <div>
                        {following.length}
                        <br></br>
                        팔로잉
                    </div>
                </div>
            </div>
            <div className="profileBodyButtonBox">
                <Button block color="light" onClick={modalOpen}>
                    프로필 편집
                </Button>
                <Button block color="light">
                    보관함 보기
                </Button>
            </div>
        </>
    );
};

export default ProfileBody;
