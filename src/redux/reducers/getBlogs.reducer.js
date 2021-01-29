import * as types from "../constants/getBlogs.constants";

const initialState = {
  blogs: [],
  loading: false,
  error: null,
};

const getBlogsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_BLOGS_DATA_REQUEST:
      return { ...state, loading: true };
    case types.GET_BLOGS_DATA_SUCCESS:
      return { ...state, blogs: payload, loading: false };
    case types.GET_BLOGS_DATA_FAILURE:
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
};

export default getBlogsReducer;
