// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');
//SELECT * FROM product INNER JOIN category ON product.category_id = category.id;

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE' //everything in the category also deleted
});

// Categories have many Products
Category.hasMany(Product, { //can have many products so we use hasMany
  foreignKey: 'category_id',
  onDelete: 'CASCADE'   
});
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through:ProductTag,
  unique:false,
});

Tag.belongsToMany(Product, {
  through:ProductTag,
  unique:false,
})

// Tags belongToMany Products (through ProductTag)

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
