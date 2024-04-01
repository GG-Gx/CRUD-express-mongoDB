const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const router = express.Router();
const productRoutes = require('./routes/product.routes.js');
const {getProducts} = require('./controllers/product.controller.js');
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use("/api/products", productRoutes);

router.get("/:id", getProducts);


app.get('/', (req, res) => {
  res.send('Hello  world!');
});



app.get('/api/products', async (req, res) => {  
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send(error);  
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {

    const product = await Product.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      quantity: req.body.quantity,
      price: req.body.price,
      image: req.body.image,
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).send(error);
  }
});


app.post('/api/products', async (req, res) => {
 try {
    const product = await Product.create({
      name: req.body.name,
      quantity: req.body.quantity,
      price: req.body.price,
      image: req.body.image,
    });
  
    res.status(200).json(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

mongoose.connect('mongodb+srv://ggg:jyzt2knHDELESlJ6@cluster0.aizeyoh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
  console.log('Connected to database! :)');
}).catch((err)=>{ console.log(err) }  );


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});



