import express from 'express';
import { requireSignIn } from '../middlewares/authMiddleware.js';
import { braintreePaymentController, braintreeTokenController } from '../controllers/paymentController.js';

const router = express.Router();

router.get('/braintree/client_token', braintreeTokenController) // get braintree token

router.post('/braintree/purchase', requireSignIn, braintreePaymentController) // make payment

export const paymentRoutes = router;