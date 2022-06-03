export const getUserById = async (users, id) => {
    const findUserById = await users.find((user) => user.id === id);
    return findUserById;
};

export const getUserByUserId = async (users, userId) => {
    const findUserByUserId = await users.find((user) => user.userId === userId);
    return findUserByUserId;
};

export const postUser = async (users, user) => {
    const newUser = { ...user, userId: user.id, id: users.length + 1 };
    return [...users, newUser];
};

export const loginApi = async (users, user) => {
    const checkUser = await users.find(
        (data) => data.userId === user.id && data.password === user.password
    );
    return { isLogin: checkUser ? true : false, user: checkUser };
};

export const checkId = async (users, userId) => {
    const isCheckId = (await users.find((user) => user.userId === userId))
        ? true
        : false;
    return isCheckId;
};

export const logoutApi = async () => {
    return true;
};

export const putUsers = async (users, user, id) => {
    //users : 전체 유저 리스트 , user : 바꿀 정보가 담겨있는 유저 , id : 현재 로그인한 id
    const findUsersIndex = await users.findIndex((user) => {
        console.log(user.id, id);
        return user.id === id;
    });
    const { name, img } = user;
    if (findUsersIndex === -1) {
        console.error('not found');
        return;
    }
    const newUsers = [...users];
    newUsers.splice(findUsersIndex, 1, { ...users[findUsersIndex], name, img });
    return newUsers;
};

export const getUserByKey = async (users, key) => {
    const findUserByKey = await users.find((user) => key.test(user.name));
    return findUserByKey;
};
