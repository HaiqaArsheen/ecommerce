const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const db = require('../database/mysql');

router.post('/submit-beautyproductsform', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const { name, price, description } = req.body;
  const { image1, image2, image3 } = req.files;

  if (!image1 || !image2 || !image3) {
    return res.status(400).send('All images are required.');
  }

  // Define the directory where you want to save the images
  const uploadDir = path.join(__dirname, '../img/beautyproducts');

  // Ensure the directory exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // Generate unique file names and paths
  const image1Path = path.join(uploadDir, `${Date.now()}_1.webp`);
  const image2Path = path.join(uploadDir, `${Date.now()}_2.webp`);
  const image3Path = path.join(uploadDir, `${Date.now()}_3.webp`);

  // Move the images to the upload directory
  image1.mv(image1Path, (err) => {
    if (err) {
      console.error('Error uploading image1:', err);
      return res.status(500).send('Error uploading image1.');
    }
  });

  image2.mv(image2Path, (err) => {
    if (err) {
      console.error('Error uploading image2:', err);
      return res.status(500).send('Error uploading image2.');
    }
  });

  image3.mv(image3Path, (err) => {
    if (err) {
      console.error('Error uploading image3:', err);
      return res.status(500).send('Error uploading image3.');
    }
  });

  // Convert paths to the format you want to save in the database
  const dbImage1Path = `../img/beautyproducts/${path.basename(image1Path)}`;
  const dbImage2Path = `../img/beautyproducts/${path.basename(image2Path)}`;
  const dbImage3Path = `../img/beautyproducts/${path.basename(image3Path)}`;

  // Insert data into the database
  const query = `INSERT INTO beautyproducts (name, price, description, image1, image2, image3) VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(query, [name, price, description, dbImage1Path, dbImage2Path, dbImage3Path], (err, results) => {
    if (err) {
      console.error('Error inserting data into database:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.send('Form data saved successfully!');
  });
});




router.get('/', (req, res) => {
  const sql = 'SELECT * FROM beautyproducts';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
// Route to get a single product by ID
router.get('/product/:id', (req, res) => {
  const productId = req.params.id;
  const query = 'SELECT * FROM beautyproducts WHERE id = ?';
  db.query(query, [productId], (err, results) => {
    if (err) {
      console.error('Error fetching product from database:', err);
      return res.status(500).send('Internal Server Error');
    }
    if (results.length === 0) {
      return res.status(404).send('Product not found');
    }
    res.json(results[0]); // Ensure response is in JSON format
  });
});

// Route to handle updating a product

router.post('/update-product/:id', (req, res) => {
  const productId = req.params.id;
  const { name, price, description } = req.body;
  const { image1, image2, image3 } = req.files || {};

  let updateQuery = 'UPDATE beautyproducts SET name = ?, price = ?, description = ?';
  const updateValues = [name, price, description];

  if (image1) {
    const image1Path = path.join(__dirname, '../img/beautyproducts', `${Date.now()}_1.webp`);
    image1.mv(image1Path, (err) => {
      if (err) {
        console.error('Error uploading image1:', err);
        return res.status(500).send('Error uploading image1.');
      }
    });
    const dbImage1Path = `../img/beautyproducts/${path.basename(image1Path)}`;
    updateQuery += ', image1 = ?';
    updateValues.push(dbImage1Path);
  }

  if (image2) {
    const image2Path = path.join(__dirname, '../img/beautyproducts', `${Date.now()}_2.webp`);
    image2.mv(image2Path, (err) => {
      if (err) {
        console.error('Error uploading image2:', err);
        return res.status(500).send('Error uploading image2.');
      }
    });
    const dbImage2Path = `../img/beautyproducts/${path.basename(image2Path)}`;
    updateQuery += ', image2 = ?';
    updateValues.push(dbImage2Path);
  }

  if (image3) {
    const image3Path = path.join(__dirname, '../img/beautyproducts', `${Date.now()}_3.webp`);
    image3.mv(image3Path, (err) => {
      if (err) {
        console.error('Error uploading image3:', err);
        return res.status(500).send('Error uploading image3.');
      }
    });
    const dbImage3Path = `../img/beautyproducts/${path.basename(image3Path)}`;
    updateQuery += ', image3 = ?';
    updateValues.push(dbImage3Path);
  }

  updateQuery += ' WHERE id = ?';
  updateValues.push(productId);

  db.query(updateQuery, updateValues, (err, results) => {
    if (err) {
      console.error('Error updating product in database:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.send('Product updated successfully!');
  });
});

// Route to delete a product by ID
router.delete('/product/:id', (req, res) => {
  const productId = req.params.id;
  const query = 'DELETE FROM beautyproducts WHERE id = ?';
  db.query(query, [productId], (err, results) => {
    if (err) {
      console.error('Error deleting product from database:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.send('Product deleted successfully');
  });
});
module.exports = router;
