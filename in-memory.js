import express from 'express';
import postRoutes from './src/routes/post.routes.js';
import commentRoutes from './src/routes/comment.routes.js';

const app = express();
const port = 3000;

app.use(express.json());

// Mount the post routes
app.use('/posts', postRoutes);

// Mount the comment routes
app.use('/comments', commentRoutes);   // <-- mount comments

// Products
let products = [
  { id: 1, name: "Laptop", price: 1000 },
  { id: 2, name: "Smartphone", price: 500 },
  { id: 3, name: "Tablet", price: 300 },
];

// GET all products
app.get("/products", (req, res) => {
  res.status(200).json(products);
});

// GET product by id
app.get("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const searchProduct = products.find((product) => product.id === id);
  if (!searchProduct) {
    return res.status(404).json({ message: "Product not found" });
  } else {
    return res.status(200).json(searchProduct);
  }
});

// Create a new product
app.post('/products', (req, res) => {
  const newId = Math.max(...products.map(p => p.id)) + 1;
  const newProduct = {
    id: newId,
    name: req.body.name,
    price: req.body.price
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Update a product by id
app.put('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex(p => p.id === id);
  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }
  products[productIndex].name = req.body.name;
  products[productIndex].price = req.body.price;
  res.status(200).json(products[productIndex]);
});

// Delete a product by id
app.delete('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex(p => p.id === id);
  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }
  products.splice(productIndex, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
