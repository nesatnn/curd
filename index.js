// // Import packages
// import express from 'express';
// import mongoose from 'mongoose';
// import bodyParser from 'body-parser';

// // Create Express app
// const app = express();

// // Parse requests of content-type application/json
// app.use(bodyParser.json()); 

// // Database connection
// mongoose.connect('mongodb+srv://thisyearcrud:thisyearcrud@cluster0.hty68.mongodb.net/thisyearcrud', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// // User model
// const User = mongoose.model('User', {
//   name: String,
//   email: String,
//   password: String
// });

// // Create user
// app.post('/users', async (req, res) => {
//   try {
//     const user = new User(req.body);
//     await user.save();
//     res.send(user);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// // Get all users
// app.get('/users', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.send(users);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// // Get user by ID
// app.get('/users/:id', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) res.status(404).send("No item found");
//     res.send(user);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// // Update a user
// app.patch('/users/:id', async (req, res) => {
//   try {
//     const user = await User.findByIdAndUpdate(req.params.id, req.body, {
//       new: true
//     });
//     res.send(user);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// // Delete a user
// app.delete('/users/:id', async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if (!user) res.status(404).send("No item found");
//     res.status(200).send();
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// const PORT = process.env.PORT || 3000;

// // Start server
// app.listen(PORT, () => {
//   console.log('Server started on port 3000');
// });


// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

// mongoose.connect('mongodb+srv://thisyearcrud:thisyearcrud@cluster0.hty68.mongodb.net/thisyearcrud');
mongoose.connect('mongodb+srv://crud123456:crud123456@nesat-nayem.wqpn5pd.mongodb.net/crud123456');

const Schema = mongoose.Schema;
const itemSchema = new Schema({
  name: String,
  description: String
});
const Item = mongoose.model('Item', itemSchema);

app.get('/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.post('/items', async (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    description: req.body.description
  });
  await newItem.save();
  res.json(newItem);
});

app.put('/items/:id', async (req, res) => {
  const updatedItem = await Item.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    description: req.body.description
  }, { new: true });
  res.json(updatedItem);
});

app.delete('/items/:id', async (req, res) => {
  await Item.findByIdAndRemove(req.params.id);
  res.json({ message: 'Item deleted successfully' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
