const express = require('express');
const router = express.Router();
const fs = require('fs');
const uuidv4 = require('uuid/v4');

const json_stock = fs.readFileSync('src/stock.json', 'utf-8');
let stock = JSON.parse(json_stock);

router.get('/', (req, res) => {
  res.render('index', { stock });
});

router.get('/new-entry', (req, res) => {
  res.render('new-entry');
});


//.................COMIENZA LA FUNCION DE INGRESO
router.post('/new-entry', (req, res) => {

  const { productName, price, img, quanty } = req.body;

  if (!productName || !price || !img || !quanty) {
    res.status(400).send("Entries must have a producto and body");
    return;
  }

  var newProduct = {
    id: uuidv4(),
    productName,
    price,
    img,
    quanty
  };

//.................AGREGA UN NUEVO PRODUCTO AL ARRAY
  stock.push(newProduct);

//.................GUARGA EL ARRAY EN UN ARCHIVO
  const json_stock = JSON.stringify(stock);
  fs.writeFileSync('src/stock.json', json_stock, 'utf-8');

  res.redirect('/');
});
//.................ELIMINA LOS DATOS
router.get('/delete/:id', (req, res) => {
  stock = stock.filter(prod => prod.id != req.params.id);

//.................GUARDA LOS DATOS
  const json_stock = JSON.stringify(stock);
  fs.writeFileSync('src/stock.json', json_stock, 'utf-8');

  res.redirect('/')
});

module.exports = router;