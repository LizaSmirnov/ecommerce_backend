const router = require('express').Router();
const { Category, Product } = require('../../models/');

// The `/api/categories` endpoint

// find all categories look at the category seeds
router.get('/', async(req, res) => {
  try {
  const categoryData = await Category.findAll({
    include: [{model: Product}] 
  })
  res.status(200).json(categoryData)
  } catch(err){
    res.status(400).json(err)
  }
});

// find one category by its `id` value
router.get('/:id', async (req, res) => { 
  try { 
    const categoryData= await Category.findByPk(req.params.id, {
    include: [{model: Product}]
});
  if (!categoryData){
    res.json(404).json({message: 'Not working no category'});
    return;
  }
  res.status(200).json(categoryData)
} catch (err) {
  res.status(500).json(err)
}
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err){
    res.status(500).json(err);
  }
});

// update a category by its `id` value
router.put('/:id', async (req, res, next) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(categoryData);
  } catch (err){
    res.status(500).json(err);
  }
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
  if (categoryData) {
    res.status(200).json({message: 'Category successfully deleted!'})
  } else {
    res.status(500).json({message: 'Category not deleted'})
  }
  } catch (err){
    res.status(500).json(err)
  }
});

module.exports = router;
