// The `/api/products` endpoint
const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');


// get all products
router.get('/', async (req, res) => {
  // find all products
  try {
    const allProducts = await Product.findAll({
      include:[{model:Category }],
    });
    res.status(200).json(allProducts);
  } catch (err){
    res.status(500).json({message: 'No Products found with that Id'})
  }
}),

// find a single product by its `id`
  router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id,{
        include: [{model:Category}, {model: ProductTag}],
    });
    if (!productData) {
    res.status(400).json({message: 'No Product found with that id!'})
    } else {
      res.status(200).json(productData);
    }
   } catch (err) {
      res.status(400).json(err);
    }
  }),
  
  // create new product
  router.post('/', async(req, res) => {

  Product.create(req.body) 
    .then((product ) => {
      if(req.body.tagId.length){
        const productTagArr = req.body.tagId.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagArr)
      }
      res.status(200).json({message: 'Your product has been created'})
  }).catch((err) => {
    res.status(404).json(err)
   })
});
     

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // find the tag to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      //destroy and create to compete update
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
}),

// delete one product by its `id` value
router.delete('/:id',async (req, res) => {
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
      }
    });

    if (!productData) {
      res.status(400).json({message: 'Product not found'});
      return;
    }
    res.status(200).json(productData);
  } catch (err){
    res.status(500).json(err)
  }
});

module.exports = router;
