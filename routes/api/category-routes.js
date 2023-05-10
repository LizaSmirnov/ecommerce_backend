const router = require('express').Router();
const { Category, Product } = require('../../models/');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {
  try {

  // find all categories look at the category seeds
  const categoryData = await Category.findAll({
    include: [{model: Product}] //has many products so it comes back as an array 
  })
  res.status(200).json(categoryData)
  } catch(err){
    res.status(400).json(err)
  }
});

router.get('/:id', async (req, res) => { //wait for it to go to the database and come back so use async
  try { // find one category by its `id` value
    const getOneCat = await Category.findOne({
      where: {
          id: req.params.id //comes from the client side the url 
      },
    include: [{model: Product, attributes: ['id', 'product_name', 'price', 'stock', 'category_id']}]
});
  if (!categoryData){
    res.json(404).json({message: 'Not working no category'});
    return;
  }
  res.status(200).json(getOneCat)
} catch (err) {
  res.status(500).json(err)
}
});
  // be sure to include its associated Products

router.post('/', async (req, res) => {
  try {
    const newCatergory = await Category.create({
      category_name: req.body.category_name
  }).then(newCategory =>
    res.status(200).json(newCategory))
  } catch (err){
    res.status(400).json(err);
  }
  // create a new category
});

router.put('/:id', async (req, res, next) => {
  try {
    const updateCategory = await Category.update(req.body, {
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
    const deleteCat = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
  if (deletedCategory) {
    res.status(200).json({message: 'Category successfully deleted!'})
  } else {
    res.status(400).json({message: 'Category not deleted'})
  }
  } catch (err){
    res.status(400).json(err)
  }
  // delete a category by its `id` value
});

module.exports = router;
