const router = require('express').Router();
const { Category, Product } = require('../../models/Category.js');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {
  try {
    const categoryData = await Catergory.findByPk(req.params.id);
    if (!categoryData) {
      res.status(404).json( {message: 'No category found with this id!'});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }

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

router.post('/', async (req, res) => {
  try {
    const newCatergory = await Catergory.create(req.body);
    res.status(200).json(newCatergory);
  } catch (err){
    res.status(400).json(err);
  }
  // create a new category
});

router.put('/:id', async (req, res, next) => {
  try {
    const updateCategory = await Catergory.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(updateCategory);
  } catch (err){
    res.status(400).json(err);
  }
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteCat = await Catergory.destroy({
      where: {
        id: req.params.id
      }
    });
  } catch (err){
    res.status(400).json(err)
  }
  // delete a category by its `id` value
});

module.exports = router;
