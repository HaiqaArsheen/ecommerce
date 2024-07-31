require('dotenv').config();                        /*--------express js middleware--------*/
const express = require('express');
const bodyParser = require('body-parser'); 
                                         /*------ packages----*/


 const fileUpload = require('express-fileupload');

 

                                            /*-----------required folder------------------*/
 const db=require('./database/mysql');
 const mysql=require('mysql');

 const path = require('path');
 const fs = require('fs');
const registrationRoute = require('./routes/registration');
const loginRoute = require('./routes/login');
const adminelogine=require('./routes/adminlogin');
const forgetRoute = require('./routes/forget');
const resetRoute = require('./routes/reset');
const cookieParser = require('cookie-parser');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const authMiddleware = require('./middleware/auth');

const crypto = require('crypto');




                                                     /*------- port no ----*/
 const PORT = 3000;
                                           /*express js dependencies and middleware-----*/
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));
app.use(cookieParser()); // Use the public folder for views

                                                  /*--------link the folder in server-----*/
app.use('/assests',express.static('assests'));
app.use('/img',express.static('img'));
app.use('/img', express.static(path.join(__dirname, 'img')));

app.use('/js',express.static('js'));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/c', (req, res) => {
    res.sendFile(path.join(__dirname,  'index.html'));
    });
                                                  /*---------handel registration form ----*/
app.use('/register', registrationRoute);
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'registration.html'));
});

const tableNamesRoute = require('./routes/adminaddcategories'); // Adjust the path as needed

app.use('/api', tableNamesRoute);

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       const category = req.body.categoriename.toLowerCase().replace(/\s+/g, '');
//       const uploadPath = path.join(__dirname, `../img/${category}/`);
//       fs.mkdirSync(uploadPath, { recursive: true });
//       cb(null, uploadPath);
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + '_' + file.originalname);
//     }
//   });

// const upload = multer({ storage: storage });

// app.post('/', upload.array('images', 3), (req, res) => {
//     const { categoriename, name, price, bottoms, description } = req.body;
//     const images = req.files;
   
//     // Create table if it doesn't exist
//     const createTableQuery = `
//         CREATE TABLE IF NOT EXISTS ${mysql.escapeId(categoriename)} (
//             id INT AUTO_INCREMENT PRIMARY KEY,
//             name VARCHAR(255),
//             price INT,
//             description TEXT,
//             image1 VARCHAR(255),
//             image2 VARCHAR(255),
//             image3 VARCHAR(255),
//             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//         )
//     `;

//     db.query(createTableQuery, (err, result) => {
//         if (err) throw err;
//         console.log(`Table ${categoriename} created or already exists.`);
//     });

//     // Insert data into the table



//     const insertQuery = `INSERT INTO ${mysql.escapeId(categoriename)} (name, price, description, image1, image2, image3) VALUES (?, ?, ?, ?, ?, ?)`;
//     db.query(insertQuery, [name, price, description, images[0].path, images[1].path, images[2].path], (err, result) => {
//       if (err) {
//         console.error('Error inserting data:', err);
//         return res.status(500).send('Error inserting data.');
//       }
      
//       res.send('Data inserted successfully.');
//     });
// });




                                                  /*---------handel login form ----*/
app.use('/login', loginRoute);
// Middleware to check if user is logged in
// function isAuthenticated(req, res, next) {
//   if (req.cookies && req.cookies.user) {
//     res.status(401).json({ message: 'Unauthorized: Please log in', type: 'danger' });
//   } else {
//       res.status(401).json({ message: 'Unauthorized: Please log in', type: 'danger' });
//   }
// }

// // Protected route example
// app.get('/', isAuthenticated, (req, res) => {
//   const user = req.cookies.user;
//   res.json({ message: `Welcome ${user.name}`, type: 'success' });
// });

 app.get('/', (req, res) => {
 res.sendFile(path.join(__dirname, 'public', 'login.html'));
 });
                                                /*---------handel forget form ----*/
app.use('/forget', forgetRoute);
app.get('/', (req, res) => {
res.sendFile(path.join(__dirname, 'public', 'forgetpass.html'));
});
                                           /*---------handel reset form ----*/
app.use('/reset', resetRoute);
app.get('/', (req, res) => {
res.sendFile(path.join(__dirname, 'public', 'reset.html'));
}); 

app.use(fileUpload());



const productCountRoute = require('./routes/adminfront');

app.use('/', productCountRoute);

const addproduct = require('./routes/adminaddproducts');




app.use('/addproduct', addproduct);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/admin/pages/form/basic-element.html'));
});
app.use('/adminelogin', adminelogine);


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin', 'index.html'));});

const secret = crypto.randomBytes(64).toString('hex');        



app.use('/api/auth', loginRoute); // Updated to loginRoutes

// Protected route example
app.get('/api/protected', authMiddleware, (req, res) => {
    res.json({ message: `Welcome ${req.user.name}!`, user: req.user });
});



/*--- customer information----*/
const addcustomers = require('./routes/admincustomers');


app.use('/editcustomers', addcustomers);


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/admin/pages/tabels/customer.html'));
});

/*--- order information----*/
const addorder = require('./routes/adminorder');


app.use('/editorder', addorder);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/admin/index.html'));
});





/*----jeans-*/


const addproductjeans = require('./routes/adminaddproductsjeans ');
app.use('/editjeans',addproductjeans);

app.use('/addproductjeans', addproductjeans);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/admin/pages/form/jeans.html'));
});





/*--------bottoms-----*/
console.log(__dirname);

const addproductbottom = require('./routes/adminaddproductsbottom');


app.use('/addproductbottoms', addproductbottom);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/admin/pages/form/bottoms.html'));
});




/*--------electronics-----*/

const addproductelectronics = require('./routes/adminaddproductselectronics');


app.use('/addproductelectronics', addproductelectronics);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/admin/pages/form/electronics.html'));
});


/*--------groceries-----*/

const addproductgroceries = require('./routes/adminaddproductsgroceries');


app.use('/addproductgroceries', addproductgroceries);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/admin/pages/form/groceries.html'));
});



/*--------beautyproducts-----*/

const addproductbeautyproducts = require('./routes/adminaddproductsbeautyproducts');


app.use('/addproductbeautyproducts', addproductbeautyproducts);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/admin/pages/form/beautyproducts.html'));
});






/*-----------winderware----*/

const addproductwinderware = require('./routes/adminaddproductwinderware');


app.use('/addproductwinderwares', addproductwinderware);
app.use('/editwinderwares',addproductwinderware);
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/admin/pages/form/winderware.html'));
});
/*----trouses-----*/
const addproducttrouses = require('./routes/adminaddproductstrouses');

app.use('/edittrousers',addproducttrouses);
app.use('/addproducttrouses', addproducttrouses);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/admin/pages/form/trouses.html'));
});


/*------westerntop-----*/
const addproductswesterntops = require('./routes/adminaddproductswesterntops');
app.use('/editwestrntops',addproductswesterntops);

app.use('/addproductwesterntops', addproductswesterntops);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/admin/pages/form/westerntop.html'));
});


/*----- tunics-----*/
const addproductstunics = require('./routes/adminaddproductstunics');
app.use('/edittunics',addproductstunics);

app.use('/addproducttunics', addproductstunics);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/admin/pages/form/tunics.html'));
});

 app.get('/index', (req, res) => {
  
  res.render('index.ejs');
});
  
const saveOrder=require('./routes/saveorder');
app.use('/saveorder',saveOrder);





// app.post('/checkout', authMiddleware, async (req, res) => {
//     const { totalAmount, fullName, email, phoneNumber, state, city, address, zipCode, orderNotes } = req.body;
//     if (!fullName || !email || !phoneNumber || !state || !city || !address || !zipCode || !orderNotes) {
//         return res.status(400).send('All fields are required');
//     }
//     const getCustomerQuery = 'SELECT id FROM user WHERE email = ?';
//     db.query(getCustomerQuery, [email], (err, customerResults) => {
//         if (err) {
//             console.error('Error fetching user:', err);
//             return res.status(500).json({ type: 'error', message: 'Failed to fetch customer' });
//         }

//         let customerId;

//         if (customerResults.length > 0) {
//             // Customer exists

//             const checkQuery = 'SELECT * FROM customer WHERE email = ?';
//             db.query(checkQuery, [email], async (err, results) => {
//                 if (err) {
//                     console.error('Database selection error:', err);
//                     return res.status(500).send('Internal server error');
//                 }

//                 if (results.length > 0) {
//                     // User data already exists in the database
//                     const existingUser = results[0];
//                     console.log('Existing user data:', existingUser);

//                     // Compare existing data with new data
//                     const updateValues = [];
//                     let updateQuery = 'UPDATE customer SET ';

//                     // Check each field and update if changed
//                     if (fullName !== existingUser.fullName) {
//                         updateQuery += 'fullName = ?, ';
//                         updateValues.push(fullName);
//                     }
//                     if (phoneNumber !== existingUser.phoneNumber) {
//                         updateQuery += 'phoneNumber = ?, ';
//                         updateValues.push(phoneNumber);
//                     }
//                     if (state !== existingUser.state) {
//                         updateQuery += 'state = ?, ';
//                         updateValues.push(state);
//                     }
//                     if (city !== existingUser.city) {
//                         updateQuery += 'city = ?, ';
//                         updateValues.push(city);
//                     }
//                     if (address !== existingUser.address) {
//                         updateQuery += 'address = ?, ';
//                         updateValues.push(address);
//                     }
//                     if (zipCode !== existingUser.zipCode) {
//                         updateQuery += 'zipCode = ?, ';
//                         updateValues.push(zipCode);
//                     }
//                     if (orderNotes !== existingUser.orderNotes) {
//                         updateQuery += 'orderNotes = ?, ';
//                         updateValues.push(orderNotes);
//                     }

//                     // Remove the trailing comma and space from updateQuery
//                     updateQuery = updateQuery.slice(0, -2);

//                     // Add WHERE clause
//                     updateQuery += ' WHERE email = ?';
//                     updateValues.push(email);

//                     // Perform the update if any fields have changed
//                     if (updateValues.length > 0) {
//                         db.query(updateQuery, updateValues, (err, result) => {
//                             if (err) {
//                                 console.error('Database update error:', err);
//                                 return res.status(500).send('Internal server error');
//                             }
//                             console.log('User data updated in the database.');
//                             customerId = customerResults[0].id;

//                             insertOrderItems(customerId);

//                             createStripeSessionAndRedirect();
//                         });
//                     } else {
//                         // No fields were updated
//                         console.log('No fields changed. Skipping database update.');
//                         insertOrderItems(customerId);

//                         createStripeSessionAndRedirect();
//                     }
//                 } else {
//                     console.log('error.');


//                     // User data does not exist, insert into database
                  
//                 }

//                 function insertOrderItems(customerId) {
//                     const insertQuery = 'INSERT INTO customer (fullName, email, phoneNumber, state, city, address, zipCode, orderNotes,user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)';
//                     const insertValues = [fullName, email, phoneNumber, state, city, address, zipCode, orderNotes,customerId];

//                     db.query(insertQuery, insertValues, (err, result) => {
//                         if (err) {
//                             console.error('Database insertion error:', err);
//                             return res.status(500).send('Internal server error');
//                         }
//                         console.log('New user data inserted into the database.');
//                         createStripeSessionAndRedirect();
//                     });
//                 }

//                 // Function to create Stripe session and redirect
//                 function createStripeSessionAndRedirect() {
//                     stripe.checkout.sessions.create({
//                         line_items: [
//                             {
//                                 price_data: {
//                                     currency: 'usd',
//                                     product_data: {
//                                         name: "node"
//                                     },
//                                     unit_amount: totalAmount * 100
//                                 },
//                                 quantity: 1
//                             }
//                         ],
//                         mode: 'payment',
//                         success_url: 'http://localhost:3000/success.html',
//                         cancel_url: 'http://localhost:3000/cancel.html',
//                     }).then(session => {
//                         // Redirect to Stripe session URL
//                         res.redirect(session.url);
//                     }).catch(err => {
//                         console.error('Stripe session creation error:', err);
//                         return res.status(500).send('Internal server error');
//                     });
//                 }
//             });
//         }

  
//      else {
//             // Customer does not exist, insert new customer
//             console.error('user not found ', err);

//         }
//     });

// });









// Fetch customers





const editCustomersRoute = require('./routes/editcustomers'); // Adjust the path as necessary
app.use(editCustomersRoute);






app.post('/checkout', authMiddleware, async (req, res) => {
    const { totalAmount, fullName, email, phoneNumber, state, city, address, zipCode, orderNotes } = req.body;

    // Log the received form data
    console.log('Received form data:', req.body);

    // Check if all required fields are provided
    if (!fullName || !email || !phoneNumber || !state || !city || !address || !zipCode || !orderNotes) {
        return res.status(400).send('All fields are required');
    }

    const querychk = 'SELECT * FROM user WHERE email = ?';
    db.query(querychk, [email], async (err, results) => {
        if (err) {
            console.error('Database selection error:', err);
            return res.status(500).send('Internal server error');
        }

        if (results.length > 0) {
            const checkQuery = 'SELECT * FROM customer WHERE email = ?';
            db.query(checkQuery, [email], async (err, results) => {
                if (err) {
                    console.error('Database selection error:', err);
                    return res.status(500).send('Internal server error');
                }

                if (results.length > 0) {
                    // User data already exists in the database
                    const existingUser = results[0];
                    console.log('Existing user data:', existingUser);

                    // Compare existing data with new data
                    const updateValues = [];
                    let updateQuery = 'UPDATE customer SET ';

                    // Check each field and update if changed
                    if (fullName !== existingUser.fullName) {
                        updateQuery += 'fullName = ?, ';
                        updateValues.push(fullName);
                    }
                    if (phoneNumber !== existingUser.phoneNumber) {
                        updateQuery += 'phoneNumber = ?, ';
                        updateValues.push(phoneNumber);
                    }
                    if (state !== existingUser.state) {
                        updateQuery += 'state = ?, ';
                        updateValues.push(state);
                    }
                    if (city !== existingUser.city) {
                        updateQuery += 'city = ?, ';
                        updateValues.push(city);
                    }
                    if (address !== existingUser.address) {
                        updateQuery += 'address = ?, ';
                        updateValues.push(address);
                    }
                    if (zipCode !== existingUser.zipCode) {
                        updateQuery += 'zipCode = ?, ';
                        updateValues.push(zipCode);
                    }
                    if (orderNotes !== existingUser.orderNotes) {
                        updateQuery += 'orderNotes = ?, ';
                        updateValues.push(orderNotes);
                    }

                    // Remove the trailing comma and space from updateQuery
                    updateQuery = updateQuery.slice(0, -2);

                    // Add WHERE clause
                    updateQuery += ' WHERE email = ?';
                    updateValues.push(email);

                    // Perform the update if any fields have changed
                    if (updateValues.length > 0) {
                        db.query(updateQuery, updateValues, (err, result) => {
                            if (err) {
                                console.error('Database update error:', err);
                                return res.status(500).send('Internal server error');
                            }
                            console.log('User data updated in the database.');
                            createStripeSessionAndRedirect();
                        });
                    } else {
                        // No fields were updated
                        console.log('No fields changed. Skipping database update.');
                        createStripeSessionAndRedirect();
                    }
                } else {
                    // User data does not exist, insert into database
                    const insertQuery = 'INSERT INTO customer (fullName, email, phoneNumber, state, city, address, zipCode, orderNotes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
                    const insertValues = [fullName, email, phoneNumber, state, city, address, zipCode, orderNotes];

                    db.query(insertQuery, insertValues, (err, result) => {
                        if (err) {
                            console.error('Database insertion error:', err);
                            return res.status(500).send('Internal server error');
                        }
                        console.log('New user data inserted into the database.');
                        createStripeSessionAndRedirect();
                    });
                }

                // Function to create Stripe session and redirect
                function createStripeSessionAndRedirect() {
                    stripe.checkout.sessions.create({
                        line_items: [
                            {
                                price_data: {
                                    currency: 'usd',
                                    product_data: {
                                        name: "node"
                                    },
                                    unit_amount: totalAmount * 100
                                },
                                quantity: 1
                            }
                        ],
                        mode: 'payment',
                        success_url: 'http://localhost:3000/success.html',
                        cancel_url: 'http://localhost:3000/cancel.html',
                    }).then(session => {
                        // Redirect to Stripe session URL
                        res.redirect(session.url);
                    }).catch(err => {
                        console.error('Stripe session creation error:', err);
                        return res.status(500).send('Internal server error');
                    });
                }
            });
        } else {
            console.log("Email not found in user table.");
            return res.status(404).send('User not found');
        }
    });
});







// Route to handle saving cart items
app.post('/saveOrder', (req, res) => {
    const { cartItems } = req.body;

    if (!cartItems || !Array.isArray(cartItems)) {
        return res.status(400).json({ message: 'Invalid cart items', type: 'warning' });
    }

    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized', type: 'danger' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userEmail = decodedToken.email;

        const query = 'INSERT INTO orderitem (name, image, quantity, price, email) VALUES ?';
        const values = cartItems.map(item => [item.name, item.image, item.quantity, item.price, userEmail]);

        db.query(query, [values], (error, results) => {
            if (error) {
                console.error('Error saving order items:', error);
                return res.status(500).json({ message: 'Internal server error', type: 'danger' });
            }

            return res.status(200).json({ message: 'Order items saved successfully', type: 'success' });
        });
    } catch (err) {
        console.error('Token verification failed:', err);
        return res.status(401).json({ message: 'Unauthorized', type: 'danger' });
    }
});

















                                         /*-------- bags  card ---------*/

app.get('/product/:id', (req, res) => {
  const productId = req.params.id;

  const query = 'SELECT * FROM products WHERE id = ?';
  db.query(query, [productId], (err, result) => {
      if (err) {
          return res.status(500).json({ message: 'Database error', error: err });
      }
      if (result.length === 0) {
          return res.status(404).json({ message: 'Product not found' });
      }
      const product = result[0];
      res.render('product', { product });
  });
});




app.get('/products', (req, res) => {
  const query = 'SELECT * FROM products';
  db.query(query, (err, results) => {
      if (err) {
          console.error('Error fetching products:', err);
          res.status(500).send('Error fetching products');
          return;
      }
      res.json(results);
  });
});



app.get('/product/:id', (req, res) => {
  res.sendFile(__dirname + '/product.html');
});


                          /*-------- jeans  card ---------*/



app.get('/jean/:id', (req, res) => {
  const productId = req.params.id;

  const query = 'SELECT * FROM jeans WHERE id = ?';
  db.query(query, [productId], (err, result) => {
      if (err) {
          return res.status(500).json({ message: 'Database error', error: err });
      }
      if (result.length === 0) {
          return res.status(404).json({ message: 'Product not found' });
      }
      const product = result[0];
      res.render('product', { product });
  });
});




app.get('/jeans', (req, res) => {
  const query = 'SELECT * FROM jeans';
  db.query(query, (err, results) => {
      if (err) {
          console.error('Error fetching products:', err);
          res.status(500).send('Error fetching products');
          return;
      }
      res.json(results);
  });
});



app.get('/jean/:id', (req, res) => {
  res.sendFile(__dirname + '/product.html');
});
    


    /*------ bottoms----*/
    app.get('/bottom/:id', (req, res) => {
      const productId = req.params.id;
    
      const query = 'SELECT * FROM bottoms WHERE id = ?';
      db.query(query, [productId], (err, result) => {
          if (err) {
              return res.status(500).json({ message: 'Database error', error: err });
          }
          if (result.length === 0) {
              return res.status(404).json({ message: 'Product not found' });
          }
          const product = result[0];
          res.render('product', { product });
      });
    });
    
    
    
    
    app.get('/bottoms', (req, res) => {
      const query = 'SELECT * FROM bottoms';
      db.query(query, (err, results) => {
          if (err) {
              console.error('Error fetching products:', err);
              res.status(500).send('Error fetching products');
              return;
          }
          res.json(results);
      });
    });
    
    
    
    app.get('/bottom/:id', (req, res) => {
      res.sendFile(__dirname + '/product.html');
    });


  /*------ electronics----*/
  app.get('/electronics/:id', (req, res) => {
    const productId = req.params.id;
  
    const query = 'SELECT * FROM electronics WHERE id = ?';
    db.query(query, [productId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const product = result[0];
        res.render('product', { product });
    });
  });
  
  
  
  
  app.get('/electronics', (req, res) => {
    const query = 'SELECT * FROM electronics';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching products:', err);
            res.status(500).send('Error fetching products');
            return;
        }
        res.json(results);
    });
  });
  
  
  
  app.get('/electronics/:id', (req, res) => {
    res.sendFile(__dirname + '/product.html');
  });


   /*------ groceries----*/
   app.get('/groceries/:id', (req, res) => {
    const productId = req.params.id;
  
    const query = 'SELECT * FROM groceries WHERE id = ?';
    db.query(query, [productId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const product = result[0];
        res.render('product', { product });
    });
  });
  
  
  
  
  app.get('/groceries', (req, res) => {
    const query = 'SELECT * FROM groceries';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching products:', err);
            res.status(500).send('Error fetching products');
            return;
        }
        res.json(results);
    });
  });
  
  
  
  app.get('/groceries/:id', (req, res) => {
    res.sendFile(__dirname + '/product.html');
  });


  
  /*------ beautyproducts----*/
  app.get('/beautyproducts/:id', (req, res) => {
    const productId = req.params.id;
  
    const query = 'SELECT * FROM beautyproducts WHERE id = ?';
    db.query(query, [productId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const product = result[0];
        res.render('product', { product });
    });
  });
  
  
  
  
  app.get('/beautyproducts', (req, res) => {
    const query = 'SELECT * FROM beautyproducts';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching products:', err);
            res.status(500).send('Error fetching products');
            return;
        }
        res.json(results);
    });
  });
  
  
  
  app.get('/beautyproducts/:id', (req, res) => {
    res.sendFile(__dirname + '/product.html');
  });


    /*-------winderware-----*/

app.get('/winderware/:id', (req, res) => {
      const productId = req.params.id;
    
      const query = 'SELECT * FROM winderwares WHERE id = ?';
      db.query(query, [productId], (err, result) => {
          if (err) {
              return res.status(500).json({ message: 'Database error', error: err });
          }
          if (result.length === 0) {
              return res.status(404).json({ message: 'Product not found' });
          }
          const product = result[0];
          res.render('product', { product });
      });
    });
    
    
    
    
    app.get('/winderwares', (req, res) => {
      const query = 'SELECT * FROM winderwares';
      db.query(query, (err, results) => {
          if (err) {
              console.error('Error fetching products:', err);
              res.status(500).send('Error fetching products');
              return;
          }
          res.json(results);
      });
    });
    
    
    
    app.get('/winderware/:id', (req, res) => {
      res.sendFile(__dirname + '/product.html');
    });


    /*------trouses------*/
    app.get('/trouse/:id', (req, res) => {
      const productId = req.params.id;
    
      const query = 'SELECT * FROM trouses WHERE id = ?';
      db.query(query, [productId], (err, result) => {
          if (err) {
              return res.status(500).json({ message: 'Database error', error: err });
          }
          if (result.length === 0) {
              return res.status(404).json({ message: 'Product not found' });
          }
          const product = result[0];
          res.render('product', { product });
      });
    });
    
    
    
    
    app.get('/trouses', (req, res) => {
      const query = 'SELECT * FROM trouses';
      db.query(query, (err, results) => {
          if (err) {
              console.error('Error fetching products:', err);
              res.status(500).send('Error fetching products');
              return;
          }
          res.json(results);
      });
    });
    
    
    
    app.get('/trouser/:id', (req, res) => {
      res.sendFile(__dirname + '/product.html');
    });

/*---------westerntop------*/

app.get('/westerntop/:id', (req, res) => {
  const productId = req.params.id;

  const query = 'SELECT * FROM westerntop WHERE id = ?';
  db.query(query, [productId], (err, result) => {
      if (err) {
          return res.status(500).json({ message: 'Database error', error: err });
      }
      if (result.length === 0) {
          return res.status(404).json({ message: 'Product not found' });
      }
      const product = result[0];
      res.render('product', { product });
  });
});




app.get('/westerntops', (req, res) => {
  const query = 'SELECT * FROM westerntop';
  db.query(query, (err, results) => {
      if (err) {
          console.error('Error fetching products:', err);
          res.status(500).send('Error fetching products');
          return;
      }
      res.json(results);
  });
});



app.get('/westerntop/:id', (req, res) => {
  res.sendFile(__dirname + '/product.html');
});





              /*-------- tunics ---------*/

              app.get('/tunic/:id', (req, res) => {
                const productId = req.params.id;
              
                const query = 'SELECT * FROM tunics WHERE id = ?';
                db.query(query, [productId], (err, result) => {
                    if (err) {
                        return res.status(500).json({ message: 'Database error', error: err });
                    }
                    if (result.length === 0) {
                        return res.status(404).json({ message: 'Product not found' });
                    }
                    const product = result[0];
                    res.render('product', { product });
                });
              });
              
              
              
              
              app.get('/tunics', (req, res) => {
                const query = 'SELECT * FROM tunics';
                db.query(query, (err, results) => {
                    if (err) {
                        console.error('Error fetching products:', err);
                        res.status(500).send('Error fetching products');
                        return;
                    }
                    res.json(results);
                });
              });
              
              
              
              app.get('/tunic/:id', (req, res) => {
                res.sendFile(__dirname + '/product.html');
              });
              




              // Use the items router for /items route
              app.use('/items', addproduct);
              app.use('/editbottoms', addproductbottom);
              app.use('/editelectronics', addproductelectronics);
              app.use('/editbeautyproducts', addproductbeautyproducts);
              app.use('/editgroceries', addproductgroceries);












            


app.post('/add-product', (req, res) => {
  const { name, description, price, images } = req.body;
  
  if (!name || !description || !price || !images || images.length !== 3) {
      return res.status(400).json({ message: 'All fields are required, including three images' });
  }

  const query = 'INSERT INTO trouses (name, description, price, image1, image2, image3) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [name, description, price, images[0], images[1], images[2]];

  db.query(query, values, (err, result) => {
      if (err) {
          return res.status(500).json({ message: 'Database error', error: err });
      }
      res.status(201).json({ message: 'Product added successfully', productId: result.insertId });
  });
});
                                                /*------ listen port no -------*/
  console.log(`listening to PORT:${PORT}`);
    app.listen(PORT, () => { 
    })


