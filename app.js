const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

const stock = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/inventory.json`)
);

const getAllStock = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: stock.length,
    data: {
      stock
    }
  });
};

const getStock = (req, res) => {
  const id = req.params.id * 1;
  const stockid = stock.find(el => el.id === id);

  if (req.params.id * 1 > stock.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  res.status(200).json({
    status: 'success',
    results: stock.length,
    data: {
      stockid
    }
  });
};

const createStock = (req, res) => {
  const newId = stock[stock.length - 1].id + 1;
  const newStock = Object.assign({ id: newId }, req.body);

  stock.push(newStock);

  fs.writeFile(
    `${__dirname}/dev-data/data/inventory.json`,
    JSON.stringify(stock),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          stock: newStock
        }
      });
    }
  );
};

const updateStock = (req, res) => {
  if (req.params.id * 1 > stock.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      stock
    }
  });
};

const deleteStock = (req, res) => {
  if (req.params.id * 1 > stock.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
};

app
  .route('/api/v1/stock')
  .get(getAllStock)
  .post(createStock);

app
  .route('/api/v1/stock/:id')
  .get(getStock)
  .patch(updateStock)
  .delete(deleteStock);

module.exports = app;

// Old Metode
//app.get('/api/v1/stock', getAllStock);
//app.get('/api/v1/stock/:id', getStock);
//app.post('/api/v1/stock', createStock);
//app.patch('/api/v1/stock7:id', updateStock);
//app.delete('/api/v1/stock7:id', deleteStock);
