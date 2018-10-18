import express from 'express';

const router = express.Router();
const sales = [
  {
    id: 1,
    user: 'attendant',
    attendantName: 'Kemi',
    customerName: 'Joshua',
    item: [
      {
        itemName: 'Ferragamo Belt',
        category: 'Female Clothing',
        quantity: 2,
        unitPrice: 17000,
        subtotal: 34000,
      },
    ],
    total: 34000,
    dateSold: '01-July-2018',
  },
  {
    id: 2,
    user: 'attendant',
    attendantName: 'Cynthia',
    customerName: 'Michael',
    item: [
      {
        itemName: 'Next T-shirt',
        category: 'Male Clothing',
        quantity: 2,
        unitPrice: 5000,
        subtotal: 10000,
      },
    ],
    total: 10000,
    dateSold: '21-September-2018',
  },
  {
    id: 3,
    user: 'attendant',
    attendantName: 'Daniel',
    customerName: 'Mark',
    item: [
      {
        itemName: 'GQ T-shirt',
        category: 'Male Clothing',
        quantity: 2,
        unitPrice: 18000,
        subtotal: 36000,
      },
    ],
    total: 10000,
    dateSold: '01-July-2018',
  },
];


// Route to get all sale records
router.get('/', (req, res) => {
  res.json(sales);
});

// Route to get a specific sale record
router.get('/:id', (req, res) => {
  const currentRecord = sales.filter((record) => {
    if (record.id === parseInt(req.params.id, 10)) {
      return true;
    }
    return false; // This had to be created to solve an error with the arrow function
  });
  // console.log(products.filter(product => product.id === parseInt(req.params.id, 10)));

  if (currentRecord.length === 1) {
    res.json(currentRecord[0]);
  } else {
    res.status(404); // Set status to 404 as movie was not found
    res.json({ message: 'Record Not Found' });
  }
});

// Route to delete a sale record
router.delete('/:id', (req, res) => {
  const removeIndex = sales.map(
    record => record.id,
  ).indexOf(req.params.id); // Get the index of the sale record with given id.
  if (removeIndex === -1) {
    res.json({ message: 'Record Not Found' });
  } else {
    sales.splice(removeIndex, 1);
    res.send({ message: `Record id ${req.params.id} removed.` });
  }
});

export default router;
