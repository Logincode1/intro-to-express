//Data array for 3
  const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];
// Data array for 4
  const shoes = [
      { name: "Birkenstocks", price: 50, type: "sandal" },
      { name: "Air Jordans", price: 500, type: "sneaker" },
      { name: "Air Mahomeses", price: 501, type: "sneaker" },
      { name: "Utility Boots", price: 20, type: "boot" },
      { name: "Velcro Sandals", price: 15, type: "sandal" },
      { name: "Jet Boots", price: 1000, type: "boot" },
      { name: "Fifty-Inch Heels", price: 175, type: "heel" }
  ];


// Custom modules
const myMiddleware = require('./middleware.js');
// NPM modules
const morgan = require("morgan");
const express = require("express");
// instantiate express
const app = express();

// Middleware using .use()
app.use(myMiddleware);
app.use(morgan("tiny"));
app.use((req, res, next) => {
  req.emre = "Is the instructor";
  next();
});

//1
app.get("/greet/:name", (req, res) => {
  const name = req.params.name;
  res.send(`Hello there, ${name}`);
});


//2
app.get('/roll/:number', (req, res) => {
  const number = parseInt(req.params.number);
  const result = Math.floor(Math.random() * number) + 1;
  res.send(`You rolled a ${result}`);
});

//3
app.get('/collectibles/:index', (req, res) => {
  const index = parseInt(req.params.index);
  const item = collectibles[index];
  if (item) {
    res.send(`So, you want the  ${item.name}? For $${item.price} it can be yours!`);
  } else {
    res.send(`This item is not yet in stock. Check back soon!`);
  }
});


//4
app.get('/shoes', (req, res) => {
  let filteredShoes = shoes;
  const { 'min-price': minPrice, 'max-price': maxPrice, type } = req.query;

  if (minPrice !== undefined) {
    filteredShoes = filteredShoes.filter(shoe => shoe.price >= Number(minPrice));
  }
  if (maxPrice !== undefined) {
    filteredShoes = filteredShoes.filter(shoe => shoe.price <= Number(maxPrice));
  }
  if (type !== undefined) {
    filteredShoes = filteredShoes.filter(shoe => shoe.type === type);
  }

  res.json(filteredShoes);
});



// Setup a default response to root GET /
app.get("/", (req, res) => {
  res.send("<h1>Welcome to my website</h1>");
});

// Query params
app.get("/query-params", (req, res) => {
  let returnString = "";
  for (key in req.query) {
    returnString += `${key} is ${req.query[key]}, `;
  }
  res.send(`Query params: ${returnString}`);
});

// URL params
app.get("/:urlParam", (req, res) => {
  res.send(`urlParam: ${req.params.urlParam}`);
});



// setup and run server
app.listen(3000, () => {
  console.log("listening on port 3000");
});
