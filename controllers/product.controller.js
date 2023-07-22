import productModel from "../models/product.model.js";

// GET PRODUCTS
export const getProducts = async (req, res, next) => {
  try {
    const products = await productModel.find({ productsId: req.params.id });
    res.status(200).send(products);
  } catch (err) {
    next(err);
  }
};

// GET PRODUCTt
export const getProduct = async (req, res, next) => {
  try {
    const product = await productModel.findById(req.params.id);
    // if (!product) next(createError(404, "Gig not found!"));
    res.status(200).send(product);
  } catch (err) {
    next(err);
  }
};

// ADD PRODUCT
export const createProduct = async (req, res, next) => {
  const newProduct = new productModel(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(201).send(savedProduct);
  } catch (err) {
    next(err);
  }
};

// ADD DELETE
export const deleteProduct = async (req, res, next) => {
  try {
    await productModel.findByIdAndDelete(req.params.id);
    res.status(200).send("Product has been deleted!");
  } catch (err) {
    next(err);
  }
};
