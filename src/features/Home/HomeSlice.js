import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import postsApi from 'src/api/posts.api'

export const getListPostsID = createAsyncThunk(
  '/login',
  async (id, thunkAPI) => {
    try {
      const { data: ListPosts } = await postsApi.getListPostsID(id)
      const { data: ListCates } = await postsApi.getListParentCate(id)
      const result = ListCates.map(item => ({
        ...item,
        Items: ListPosts.filter(post => post.categories.includes(item.id))
      }))
      return result
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

const Posts = createSlice({
  name: 'posts',
  initialState: {
    PostsList: null
  },
  reducers: {},
  extraReducers: {
    [getListPostsID.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        PostsList: payload
      }
    }
  }
})

const { reducer } = Posts // actions
//export const { setToken } = actions
export default reducer
