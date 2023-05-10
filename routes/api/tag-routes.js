const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await ProductTag.findAll({
      include: [{model: Product}],
    })
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});
  // find all tags
  // be sure to include its associated Product data


router.get('/:id', async (req, res) => {
  try{
    const tagData = await ProductTag.findByPk(req.params.id, {
      include: [{model: Product}, {model: Tag}],
    })
    if (!tagData) {
      res.status(404).json({ message: 'No Product Tag found with that id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newTag = await ProductTag.create({
      tag_id:req.params.tag_id,
      tag_name:req.params.tag_name,
    });
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
}),


router.put('/:id', async (req, res) => {
 
  ProductTag.update(req.body, {
      where: {
        id: req.params.id,
     }
    })
    .then((tag) =>{
      return ProductTag.findAll({where : {tag_id: req.params.id}});
    })
    .then((productTags) => {
      const productTagIds = productTag.map(({product_id}) => product_id);
      const newProductTags = req.body.product_id
      .filter((product_id) => !productTagsIds.includes(product_id))
      .map((product_id) => {
        return {
          tag_id:req.params.id,
          product_id,
        };
      })
        const productTagsRemove = productTags
          .filter(({ product_id }) => !req.body.product_id.includes(product_id))
          .map(({ id }) => id);
          
          return Promise.all([ProductTag.destroy({ where: { id: productTagsToRemove } }),
          ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
// console.log(err);
    res.status(400).json(err);
  });
});

router.delete('/:id', async (req, res) => {
try {
  const { id } = req.params
  const deletedTag = await Tag.destroy({
    where: {
      id: id
    }
  })

  if (!deletedTag) {
    res.status(404).json({ message: `No tag found with id${id}` })
  }
    res.status(200).json({ message: `Tag with id${id} successfully deleted!` })
    } catch (err) {
      res.status(400).json(err)
    }
    });

module.exports = router;