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


// router.put('/:id', async (req, res) => {
//   try {
//     const updateTag = await ProductTag.update(rew.body, {
//       where: {
//         id: req.params.id,
//       }
//     }
//   }
// });

  // update a tag's name by its `id` value

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
