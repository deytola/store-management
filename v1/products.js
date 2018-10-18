import express from 'express';

const router = express.Router();
const products = [
  {
    id: 1,
    itemName: 'Nike Hat',
    category: 'Male clothing',
    price: 3000,
    minimumQuantityAllowed: 10,
  },
  {
    id: 2,
    itemName: 'Nike shoes',
    category: 'Male clothing',
    price: 13000,
    minimumQuantityAllowed: 10,
  },
  {
    id: 3,
    itemName: 'Nike AirMax',
    category: 'Female clothing',
    price: 23000,
    minimumQuantityAllowed: 20,
  },
];

// Route to get all the products
router.get('/', (req, res) => {
  res.json(products);
});

// Route to get a specific product
router.get('/:id', (req, res) => {
  const currentProduct = products.filter((product) => {
    if (product.id === parseInt(req.params.id, 10)) {
      return true;
    }
    return false; // This had to be created to solve an error with the arrow function
  });
  // console.log(products.filter(product => product.id === parseInt(req.params.id, 10)));

  if (currentProduct.length === 1) {
    res.json(currentProduct[0]);
  } else {
    res.status(404); // Set status to 404 as movie was not found
    res.json({ message: 'Not Found' });
  }
});

// Route to post a product
router.post('/', (req, res) => {
  // Check if all fields are provided and are valid:
  if (!req.body.itemName
       || !req.body.category
        || req.body.price <= 0
       || !req.body.minimumQuantityAllowed) {
    res.status(400);
    res.json({ message: 'Bad Request' });
  } else {
    const newId = products[products.length - 1].id + 1;
    products.push({
      id: newId,
      itemName: req.body.itemName,
      category: req.body.category,
      price: req.body.price,
      minimumQuantityAllowed: req.body.minimumQuantityAllowed,
    });
    res.json({ message: 'New product created.', location: `/api/v1/products/${newId}` });
  }
});

// Route to update a product
router.put('/:id', (req, res) => {
  // Check if all fields are provided and are valid:
  if (!req.body.itemName
       || !req.body.category
        || req.body.price <= 0
       || !req.params.id.toString().match(/^[0-9]{3,}$/g)) {
    res.status(400);
    res.json({ message: 'Bad Request' });
  } else {
    // Get the index of product with given id.
    const updateIndex = products.map(product => product.id).indexOf(parseInt(req.params.id, 10));

    if (updateIndex === -1) {
      // Product not found, create new
      products.push({
        id: req.params.id,
        itemName: req.body.itemName,
        category: req.body.category,
        price: req.body.price,
        minimumQuantityAllowed: req.body.minimumQuantityAllowed,
      });
      res.json({ message: 'New product created.', location: `/api/v1/products/${req.params.id}` });
    } else {
      // Update existing product
      products[updateIndex] = {
        id: req.params.id,
        itemName: req.body.itemName,
        category: req.body.category,
        price: req.body.price,
        minimumQuantityAllowed: req.body.minimumQuantityAllowed,
      };
      res.json({
        message: `Product id ${req.params.id} updated.`,
        location: `/api/v1/products/${req.params.id}`,
      });
    }
  }
});

// Route to delete a product
router.delete('/:id', (req, res) => {
  const removeIndex = products.map(
    product => product.id,
  ).indexOf(req.params.id); // Get the index of product with given id.
  if (removeIndex === -1) {
    res.json({ message: 'Product not found' });
  } else {
    products.splice(removeIndex, 1);
    res.send({ message: `Product id ${req.params.id} removed.` });
  }
});

export default router;
