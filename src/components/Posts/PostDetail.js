import { Button, Container, Modal } from 'reactstrap';

const ProfileBoardDetail = ({
    isOpen,
    clickPost,
    closeModal,
    onClickDelete,
    user,
}) => {
    return (
        <Modal isOpen={isOpen} fullscreen toggle={closeModal}>
            <div className="profileBoardModalHeader">
                <Button close onClick={closeModal}></Button>{' '}
                <div>
                    {user.name}
                    <strong>게시물</strong>
                </div>
                <div>
                    <Button
                        color="danger"
                        outline
                        onClick={() => onClickDelete(clickPost.id)}
                    >
                        삭제하기
                    </Button>
                </div>
            </div>
            <Container>
                <div className="profileBoardBody">
                    <div className="profileBoardBodyHeader">
                        <div className="profileBoardBodyHeaderImgBox">
                            <img
                                className="profileBoardBodyHeaderImg"
                                src={user.img}
                                alt="userImg"
                            ></img>
                        </div>
                        {user.name}
                    </div>
                    <img
                        className="profileBoardBodyImg"
                        src={clickPost?.img}
                        alt="posting"
                    ></img>
                    <p>{clickPost?.content}</p>
                </div>
            </Container>
        </Modal>
    );
};

export default ProfileBoardDetail;
