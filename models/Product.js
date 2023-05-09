// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true, //ID will be primary key to keep product unique
      autoIncrement: true
    }
  },
  { // define columns
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    price: {
      type: DataTypes.DECIMAL(10, 2), //decimal number with 10 digits to the left of the decimal and 2 to the right
      allowNull: false,
      validate: {
        isDecimal: true //makes sure price is a decimal
      }
  }
},
{
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
      isDecimal: true //makes sure stock is a number
    }
  }
},
{
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,//a key we already established a relationship with, product belongs to category so we need to reference the category id  
      references: {
        model: 'category', //this references the category model
        key: 'id' //this references the id of the category model
    }
  }
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
