import { Button } from 'reactstrap';
import './ProfileBody.css';

const ProfileBody = ({
    posts,
    follower,
    following,
    img = '/img/profile/1.jpeg',
}) => {
    return (
        <>
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
                        {posts().length}
                        <br></br>
                        게시물
                    </div>
                    <div>
                        {follower().length}
                        <br></br>
                        팔로워
                    </div>
                    <div>
                        {following().length}
                        <br></br>
                        팔로잉
                    </div>
                </div>
            </div>
            <div className="profileBodyButtonBox">
                <Button block color="light">
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
