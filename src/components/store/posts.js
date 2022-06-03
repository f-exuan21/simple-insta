import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../data/Post';
import {
    deletePostById,
    getPostByKey,
    getPostByOther,
    getPostByUserId,
    postPost,
} from './postsAPI';

const initialState = {
    posts: Post,
    myPosts: {
        posts: [],
        loading: false,
        message: '',
    },
    otherPosts: {
        posts: [],
        loading: false,
        message: '',
    },
    searchPosts: {
        posts: [],
        loading: false,
        message: '',
    },
};

const SELECT_MY_POST = 'SELECT_MY_POST';
const SELECT_OTHER_POST = 'SELECT_OTHER_POST';
// const UPDATE_POST = 'UPDATE_POST';
const DELETE_POST = 'DELETE_POST';
const INSERT_POST = 'INSERT_POST';
const SELECT_POST_BY_KEY = 'SELECT_POST_BY_KEY';

export const selectMyPost = createAsyncThunk(
    SELECT_MY_POST,
    async (payload, thunkAPI) => {
        const { myId } = thunkAPI.getState().users;
        const { posts } = thunkAPI.getState().posts;
        if (myId) {
            const myPosts = await getPostByUserId(posts, myId);
            return myPosts;
        } else if (myId === 0) {
            //0은 if문에서 false이기 때문에 따로 조건문 검사를 추가해준다.
            const myPosts = await getPostByUserId(posts, myId);
            return myPosts;
        }
        return;
    }
);

export const deletePost = createAsyncThunk(
    DELETE_POST,
    async (payload, thunkAPI) => {
        const { posts } = thunkAPI.getState().posts;
        return deletePostById(posts, payload);
    }
);

export const selectOtherPost = createAsyncThunk(
    SELECT_OTHER_POST,
    async (payload, thunkAPI) => {
        const { myId } = thunkAPI.getState().users;
        const { posts } = thunkAPI.getState().posts;
        if (myId) {
            const myPosts = getPostByOther(posts, myId);
            return myPosts;
        } else if (myId === 0) {
            const myPosts = getPostByOther(posts, myId);
            return myPosts;
        }
        return;
    }
);

export const insertPosts = createAsyncThunk(
    INSERT_POST,
    async (payload, thunkAPI) => {
        const { myId } = thunkAPI.getState().users;
        const { posts } = thunkAPI.getState().posts;

        const { content, img } = payload;
        const post = { content, img, userId: myId };
        const myPosts = await postPost(posts, post);
        return myPosts;
    }
);

export const selectPostsByKey = createAsyncThunk(
    SELECT_POST_BY_KEY,
    async ({ searchKey, userId }, thunkAPI) => {
        const reg = new RegExp(searchKey, 'g');
        const { posts } = thunkAPI.getState().posts;
        const myPosts = await getPostByKey(posts, reg, userId);
        return myPosts;
    }
);

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(selectMyPost.pending, (state) => {
                const newMyPosts = { ...state.myPosts };
                newMyPosts.loading = true;
                return { ...state, myPosts: newMyPosts };
            })
            .addCase(selectMyPost.fulfilled, (state, { payload }) => {
                const newMyPosts = { ...state.myPosts };
                newMyPosts.loading = false;
                if (payload) {
                    newMyPosts.posts = payload;
                    return { ...state, myPosts: newMyPosts };
                } else {
                    newMyPosts.message = '글이 없습니다.';
                    return { ...state, myPosts: newMyPosts };
                }
            })
            .addCase(selectMyPost.rejected, (state, { error }) => {
                const newMyPosts = { ...state.myPosts };
                newMyPosts.loading = false;
                newMyPosts.message = error.message;
                return { ...state, myPosts: newMyPosts };
            })
            .addCase(deletePost.fulfilled, (state, { payload }) => {
                return { ...state, posts: payload };
            })
            .addCase(insertPosts.fulfilled, (state, { payload }) => {
                return { ...state, posts: payload };
            })
            .addCase(selectPostsByKey.pending, (state) => {
                const newOtherPosts = { ...state.otherPosts };
                newOtherPosts.loading = true;
                return { ...state, otherPosts: newOtherPosts };
            })
            .addCase(selectPostsByKey.fulfilled, (state, { payload }) => {
                const newOthersPosts = { ...state.otherPosts };
                newOthersPosts.loading = false;
                if (payload) {
                    newOthersPosts.posts = payload;
                    return { ...state, otherPosts: newOthersPosts };
                } else {
                    newOthersPosts.message = '글이 없습니다.';
                    return { ...state, otherPosts: newOthersPosts };
                }
            })
            .addCase(selectPostsByKey.rejected, (state, { error }) => {
                const newOtherPosts = { ...state.otherPosts };
                newOtherPosts.loading = false;
                newOtherPosts.message = error.message;
                return { ...state, otherPosts: newOtherPosts };
            });
    },
});

export default postsSlice.reducer;
