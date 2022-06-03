export const getPostById = async (posts, id) => {
    const findPostById = await posts.filter((post) => post.id === id);
    return findPostById;
};

export const getPostByUserId = async (posts, userId) => {
    const findPostByUserId = await posts.filter(
        (post) => post.userId === userId
    );
    return findPostByUserId;
};

export const postPost = async (posts, post) => {
    const newPost = { ...post, id: posts.length };
    return [...posts, newPost];
};

export const deletePostById = async (posts, id) => {
    const delPosts = await posts.filter((post) => post.id !== id);
    return [...delPosts];
};

export const getPostByOther = async (posts, userId) => {
    const findPostsByUserId = await posts.filter(
        (post) => post.userId !== userId
    );
    return findPostsByUserId;
};

export const putPost = async (posts, post, id) => {
    const findPostIndex = await posts.findIndex((post) => post.id === id);
    const { content, img } = post;
    if (findPostIndex === -1) {
        return new Error('index not found');
    }
    const newposts = [...posts];
    newposts.slice(findPostIndex, 1, { ...posts[findPostIndex], content, img });
    return newposts;
};

export const getPostByKey = async (posts, key, userId) => {
    const findPostByKey = await posts.filter(
        (post) => userId === post.userId || key.test(post.content)
    );
    return findPostByKey;
};
