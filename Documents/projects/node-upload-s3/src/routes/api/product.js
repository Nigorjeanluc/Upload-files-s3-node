import { Router } from 'express';
import errorHandlerAsync from '../../middlewares/errorHandler';
import ProductController from '../../controllers/ProductController';
import * as helper from '../../helpers';

const router = Router();

// Create Product
router.post(
  '/products',
  helper.upload.array('images', 5),
  errorHandlerAsync(ProductController.create)
);

// Get All Products
router.get('/products', errorHandlerAsync(ProductController.getAll));

export default router;
