import * as types from "../constants/blogs.constants";
import api from "../../apiService";

const BlogsData = () => async (dispatch) => {
  const query = `?page=1&limit=20&sortBy[createdAt]=1`;
  dispatch({ type: types.GET_BLOGS_DATA_REQUEST });
  api
    .get(`/blogs${query}`)
    .then(function (response) {
      console.log("response", response.data.data.blogs);
      if (response.data && response.data.data.blogs)
        dispatch({
          type: types.GET_BLOGS_DATA_SUCCESS,
          payload: response.data.data.blogs,
        });
    })
    .catch(function (error) {
      console.log(error);
      dispatch({ type: types.GET_BLOGS_DATA_FAILURE, payload: error });
    });
};

const writeBlog = (title, content, url) => async (dispatch) => {
  dispatch({ type: types.WRITE_BLOG_REQUEST });
  api
    .post(`/blogs`, { title, content, images: [url] })
    .then(function (response) {
      console.log(response);
      if (response.data.success)
        dispatch({
          type: types.WRITE_BLOG_SUCCESS,
        });
    })
    .catch(function (error) {
      dispatch({ type: types.WRITE_BLOG_FAILURE, payload: error });
    });
};

const blogsActions = { BlogsData, writeBlog };

export default blogsActions;
