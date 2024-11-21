const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

const stock = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/inventory.json`)
);

app.get('/api/v1/stock', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: stock.length,
    data: {
      stock
    }
  });
});

// Get by ID
app.get('/api/v1/stock/:id', (req, res) => {
  // console.log(req.params);
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
});

app.patch('/api/v1/stock7:id', (req, res) => {
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
});

app.delete('/api/v1/stock7:id', (req, res) => {
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
});

app.post('/api/v1/stock', (req, res) => {
  // console.log(req.body);

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
});

module.exports = app;
