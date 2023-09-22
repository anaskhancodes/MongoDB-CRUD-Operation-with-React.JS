import express from 'express';
let router = express.Router()

import authRouter  from './Routs/auth.mjs';
import comment  from './Routs/comments.mjs';
import feed  from './Routs/feed.mjs';
import post  from './Routs/post.mjs';


router.use(authRouter);
router.use(comment);
router.use(feed);
router.use(post);

export default router