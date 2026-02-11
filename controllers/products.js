//to do : handeling the errors when the sort query is not price,-price or name
//to do : asking about filtring data by the name without confusing between 1 and 10
//to do : fields=name,company,name
//to do : prod = Object.fromEntries(fields.map(field => [field, prod[field]]))
// i work in the box logic but in the same time i forgot the structure of the application

const asyncWraper = require("../middleware/async");
const Product = require("../models/product");
const { customApiError, createCustomError } = require("../errors/custom-error");
const product = require("../models/product");

const getAllProducts = asyncWraper(async (req, res, next) => {
  let { featured, company, name, sort, fields, page, limit } = req.query;
  const p = page || 0
  const lim = limit || 4
  const products = await Product.find({}).skip(p*lim).limit(lim);
  let sortedProducts = products;

  if (featured)
    sortedProducts = sortedProducts.filter(
      (product) => product.featured === true,
    );
  if (company)
    sortedProducts = sortedProducts.filter(
      (product) => product.company === company,
    );
  if (name)
    sortedProducts = sortedProducts.filter((product) => product.name.includes(name))
  if (sort) {
    sort === "price"
      ? sortedProducts.sort((a, b) => a.price - b.price)
      : sort === "-price" 
        ? sortedProducts.sort((a, b) => b.price - a.price)
        : sort === "name"
          ? sortedProducts.sort((a, b) => a.name.localeCompare(b.name))
          : next(createCustomError("ivalide sort query"));
  }
  if(fields) {
    fields += `,_id`
    console.log(fields)
    fields = Array.from(fields.split(","))
    console.log(fields)
    sortedProducts =sortedProducts.map(prod => {
        prod = Object.fromEntries(fields.map(field => [field, prod[field]]))
        console.log(prod)
        return prod
    })
    console.log(sortedProducts)
  }

  if (!sortedProducts) return next(createCustomError("bbbb error", 404));
  res.json({ sortedProducts });
});
const getSingleProduct = asyncWraper(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findOne({ _id: id });
  console.log(item);
  if (!product) return next(createCustomError("bbbb error", 404));
  res.json({ product });
});

const createProduct = asyncWraper(async (req, res, next) => {
  const { name, company, price, featured, rating, createdAt } = req.body;
  const product = await Product.create({
    name: name,
    price: price,
    company: company,
    featured: featured,
    rating: rating,
    createdAt: createdAt,
  });
  if (!product) return next(createCustomError("bbbbbbb error", 404));
  res.json({ product });
});

const deleteProduct = asyncWraper(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  if (!product) return next(createCustomError("bbbb error", 404));
  res.json(product);
});

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  deleteProduct,
};
