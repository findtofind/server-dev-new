import { Router } from 'express';
import {
  getPosts,
  addPost,
  searchPost,
  getAllPosts,
  approvePost
} from '../controllers/post.controller';
import { TokenValidation } from '../utils/verifyToken';

const router = Router();
router.post('/search-post', searchPost);
router.get('/get-posts', getPosts);
router.get('/get-all-posts', TokenValidation, getAllPosts);
router.put('/approve-post', TokenValidation, approvePost);
router.post('/add-post', addPost);

export default router;
