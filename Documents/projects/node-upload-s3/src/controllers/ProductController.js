import db from '../database/models/';
import * as status from '../constants/httpStatusCodes';
import * as successMessages from '../constants/successMessages';
import * as errorMessages from '../constants/errorMessages';
import * as helper from '../helpers';

const { Product } = db;

/**
 * a class to handle Products
 */
export default class ProductController {
  /**
   * @description User create Product function
   * @param {object} req
   * @param {object} res
   * @return {Promise} response object
   */
  static async create(req, res) {
    let images = req.files.map((file) => file.location);

    const { name, category, design, quantity, material } = req.body;

    const newProduct = await Product.create({
      name,
      category,
      design,
      quantity,
      material,
      images
    });

    return res.status(status.HTTP_CREATED).json({
      status: status.HTTP_CREATED,
      message: 'Product created successfully',
      user: { ...newProduct.get() }
    });
  }

  /**
   * @description method to get all Products
   * @param {object} req request object
   * @param {object} res response object from server
   * @returns {object} return all Products
   */
  static async getAll(req, res) {
    const products = await Product.findAll();

    return products
      ? res.status(status.HTTP_OK).json({
          status: status.HTTP_OK,
          products: products
        })
      : res.status(status.HTTP_NOT_FOUND).json({ errors: { products: 'Products not found' } });
  }
}
