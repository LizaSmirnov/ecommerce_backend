const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {
  // find all categories look at the category seeds
  const categoryData = await Category.findAll({
    include: [Product] //has many products so it comes back as an array 
  })
  //res.send(JSON.stringify((categoryData)));// goes to frontend as a string
  //we do this instead
  const json = await data.json();
  res.send(json);
  

  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => { //wait for it to go to the database and come back so use async
  // find one category by its `id` value
  const categoryData = await Category.findOne({
  where: {
    id: req.params.id //comes from the client side the url 
  },
  include: [Product]
})
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
