const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{model: Product}],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try{
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{model: Product}],
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
  Tag.create(req.body)
  .then((tag) => {
    // if there's product tags, we need to create pairings to bulk create in the ProductTag model
    if (req.body.productIds.length) {
      const productTagIdArr = req.body.productIds.map((product_id) => {
        return {
          tag_id: tag.id,
          product_id,
        };
      });
      return ProductTag.bulkCreate(productTagIdArr);
    }
    // if no product tags, just respond
    res.status(200).json(tag);
  })
  .then((productTagIds) => res.status(200).json(productTagIds))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});


router.put('/:id', async (req, res) => {
 
  Tag.update(req.body, {
      where: {
        id: req.params.id,
     }
    })
    .then((tag) =>{
      return Tag.findAll({where : {id: req.params.id}});
    })
    .then((productTags) => {
      const productTagIds = productTag.map(({product_id}) => product_id);
      const newProductTags = req.body.product_id
      .filter((product_id) => !productTagsIds.includes(product_id))
      .map((product_id) => {
        return {
          id:req.params.id,
          product_id,
        };
      })
      //find ones to remove 
        const productTagsRemove = productTags
          .filter(({ product_id }) => !req.body.product_id.includes(product_id))
          .map(({ id }) => id);
      //find ones need to destroy and create to complete update  
        return Promise.all([Tag.destroy({ where: { id: productTagsToRemove } }),
        Tag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
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