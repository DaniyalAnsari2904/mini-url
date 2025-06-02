import { createShortUrl, redirectToLongUrl } from "../controller/user_controller.js";
import express from 'express';

const router = express.Router();

router.post('/shorten', createShortUrl);
router.get('/:short_code', redirectToLongUrl);

export default router;
