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
const list = (req, res) => res.json(sales);

// Route to get a specific sale record
const retrieve = (req, res) => {
  const currentRecord = sales.filter((record) => {
    if (record.id === parseInt(req.params.id, 10)) {
      return true;
    }
    return false; // This had to be created to solve an error with the arrow function
  });

  if (currentRecord.length === 1) {
    return res.json(currentRecord[0]);
  }
  res.status(404); // Set status to 404 as movie was not found
  return res.json({ message: 'Record Not Found' });
};

// Route to create to create a sale order
const create = (req, res) => {
  // Check if all fields are provided and are valid:
  if (!req.body.user
       || !req.body.attendantName
       || !req.body.customerName
       || !req.body.item
       || !req.body.item[0].itemName
       || !req.body.item[0].category
       || !req.body.item[0].quantity
       || !req.body.item[0].unitPrice || req.body.item[0].unitPrice <= 0
       || !req.body.item[0].subtotal
  ) {
    res.status(400);
    return res.json({ message: 'Bad Request' });
  }
  const newId = Math.floor(Math.random() * 9000000) + 1000000;
  sales.push({
    id: newId,
    user: req.body.user,
    attendantName: req.body.attendantName,
    customerName: req.body.customerName,
    item: req.body.item,
    total: req.body.total,
    dateSold: req.body.dateSold,
  });
  return res.json({ message: 'New sale record created.', location: `/v1/sales/${newId}` });
};

// Route to delete a sale record
const destroy = (req, res) => {
  const removeIndex = sales.map(
    record => record.id,
  ).indexOf(req.params.id); // Get the index of the sale record with given id.
  if (removeIndex === -1) {
    return res.json({ message: 'Record Not Found' });
  }
  sales.splice(removeIndex, 1);
  return res.send({ message: `Record id ${req.params.id} removed.` });
};

export {
  list, retrieve, create, destroy,
};
