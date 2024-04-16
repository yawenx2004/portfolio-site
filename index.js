const express = require('express');
const app = express();
const path = require('path');

const port = 1334;

app.use(express.static('style'));
app.use(express.static('fonts'));
app.use(express.static('documents'));
app.use(express.static('images'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/portfolio', (req, res) => {
  res.sendFile(path.join(__dirname, 'portfolio.html'));
});

app.get('/resume', (req, res) => {
  res.sendFile(path.join(__dirname, 'resume.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'about.html'));
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});