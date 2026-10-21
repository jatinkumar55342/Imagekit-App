import axios from 'axios';

const API = import.meta.env.PROD
  ? "/_/backend"
  : "http://localhost:3000";

export const createPost = (file, caption) => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('caption', caption);
  return axios.post(`${API}/post`, formData);
};

export const getPosts = () => axios.get(`${API}/post`);
