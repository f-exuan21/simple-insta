import './Join.css';
import { Button, Container, Row, Col, Form, Input } from 'reactstrap';
import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../store/UserContext';
import { Alert } from 'bootstrap';

const Join = () => {
    const navigate = useNavigate();
    const { users, insertUsers } = useContext(UserContext);

    const [user, setUser] = useState({
        id: '',
        password: '',
        name: '',
    });

    const [text, setText] = useState('');

    const [isFail, setIsFail] = useState(false);

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const onSubmitJoin = (e) => {
        e.preventDefault();

        const findUser = users.find((data) => data.userId === user.id);
        if (findUser) {
            openAlert('이미 존재하는 아이디');
            return;
        } else if (user.id === '') {
            openAlert('아이디를 입력해주세요.');
            return;
        } else if (user.password === '') {
            openAlert('패스워드를 입력해주세요.');
            return;
        } else if (user.name === '') {
            openAlert('이름을 입력해주세요');
            return;
        } else {
            insertUsers(user);
            localStorage.setItem('id', users.length + 1);
            navigate('/');
        }
    };

    const openAlert = (text) => {
        setIsFail(true);
        setText(text);
        setTimeout(() => closeAlert(), 3000);
    };

    const closeAlert = () => {
        setIsFail(true);
        setText('');
    };

    return (
        <div className="LoginPage">
            <Container className="bg-light border">
                <Row style={{ rowGap: '1em', padding: '3em' }}>
                    <Col xl={12}>
                        <img
                            src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png"
                            alt="Logo"
                        ></img>
                    </Col>
                    <Col xl={12}>
                        <Form className="JoinForm">
                            {isFail ? (
                                <Alert
                                    color="warning"
                                    toggle={() => closeAlert()}
                                >
                                    {text}
                                </Alert>
                            ) : null}
                            <Input
                                type="text"
                                placeholder="ID"
                                name="id"
                                onChange={(e) => onChangeHandler(e)}
                            ></Input>
                            <Input
                                type="password"
                                placeholder="password"
                                name="password"
                                onChange={(e) => onChangeHandler(e)}
                            ></Input>
                            <Input
                                type="text"
                                placeholder="name"
                                name="name"
                                onChange={(e) => onChangeHandler(e)}
                            ></Input>
                            <Button
                                type="submit"
                                color="primary"
                                block
                                onClick={(e) => onSubmitJoin(e)}
                            >
                                가입
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
            <Container className="bg-light border">
                <Row style={{ padding: '1em', textAlign: 'center' }}>
                    <p>
                        계정이 있으신가요? <Link to={'/login'}>로그인</Link>
                    </p>
                </Row>
            </Container>
        </div>
    );
};

export default Join;
