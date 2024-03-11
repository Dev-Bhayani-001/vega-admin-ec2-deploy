const express = require("express");

const cors = require('cors');
const engines = require('consolidate');
const path = require('path')
// const parentDir = path.resolve(__dirname, './dist/vega-admin-pannel');


const app = express();

app.use(cors());

app.use(express.json())
console.log(__dirname, 'this is dirname')
app.use(express.static(path.join(__dirname, 'dist/vega-admin-pannel')));
// app.use(express.static(path.join(parentDir, '/')));

app.set('views', __dirname + '/dist');
app.engine('html', engines.mustache);
app.set('view engine', 'html');
app.get('/', function(req, res) {
    res.render('index.html');
});

app.listen(5001, () => {
  console.log("app is running");
});
