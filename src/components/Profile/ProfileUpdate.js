import { Button, Input, InputGroup, InputGroupText, Modal } from 'reactstrap';
import { useState } from 'react';
import './ProfileUpdate.css';
import { useDispatch } from 'react-redux';
import { updateUsers } from '../store/users';

const ProfileUpdate = ({
    img = '/img/profile/1.jpeg',
    name = 'park',
    isOpen,
    modalClose,
}) => {
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        name,
        img,
    });

    const onChangeFile = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        //비동기 : 특정 코드의 실행이 완료될 때까지 기다리지 않고 다음 코드를 먼저 수행하는 자바스크립트의 특성
        //프로미스는 주로 서버에서 받아온 데이터를 화면에 표시할 때 사용
        return new Promise((resolve) => {
            //(resolve, reject) -> resolve : 비동기 작업을 성공적으로 완료해 결과를 값으로 반환, reject : 작업이 실패하여 오류의 원인을 반환
            reader.onload = () => {
                //FileReader() onload : 파일읽기가 성공적으로 완료되었을 때 발생 (이벤트 핸들러)
                setForm({ ...form, img: reader.result });
                resolve();
            };
        });
    };

    const onChangeName = (e) => {
        const { value } = e.target;
        setForm({ ...form, name: value });
    };

    const onSubmit = () => {
        dispatch(updateUsers(form));
        modalClose();
    };

    return (
        <Modal fullscreen isOpen={isOpen}>
            <ProfileUpdateHeader
                modalClose={modalClose}
                onSubmit={onSubmit}
            ></ProfileUpdateHeader>
            <ProfileUpdateBody
                onChangeName={onChangeName}
                onChangeFile={onChangeFile}
                form={form}
            ></ProfileUpdateBody>
        </Modal>
    );
};

const ProfileUpdateHeader = ({ modalClose, onSubmit }) => {
    return (
        <div className="profileUpdateHeader">
            <Button outline color="secondary" onClick={modalClose}>
                취소
            </Button>
            <b>프로필 수정</b>
            <Button outline color="primary" onClick={onSubmit}>
                수정
            </Button>
        </div>
    );
};

const ProfileUpdateBody = ({ onChangeFile, onChangeName, form }) => {
    return (
        <div className="profileUpdateForm">
            <Input
                type="file"
                hidden
                accept="image/*"
                id="imgUpload"
                onChange={(e) => onChangeFile(e)}
            ></Input>
            <label htmlFor="imgUpload">
                <div className="profileImgBox">
                    <img
                        className="profileImg"
                        src={form.img}
                        alt="myProfileImg"
                    ></img>
                </div>
            </label>

            <InputGroup>
                <InputGroupText>이름</InputGroupText>
                <Input
                    type="text"
                    value={form.name}
                    onChange={(e) => onChangeName(e)}
                ></Input>
            </InputGroup>
        </div>
    );
};

export default ProfileUpdate;
