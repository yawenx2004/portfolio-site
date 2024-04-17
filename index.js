const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const port = 1334;

app.use(express.static('style'));
app.use(express.static('fonts'));
app.use(express.static('documents'));
app.use(express.static('images'))

const getHeaderHtml = () => {
  return fs.readFileSync(path.join(__dirname, 'header.html'), 'utf8');
};

const getFooterHtml = () => {
  return fs.readFileSync(path.join(__dirname, 'footer.html'), 'utf8')
};

const headerHtml = getHeaderHtml();
const footerHtml = getFooterHtml();

app.get('/', (req, res) => {
  const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  res.send(headerHtml + indexHtml + footerHtml);
});

app.get('/resume', (req, res) => {
  const resumeHtml = fs.readFileSync(path.join(__dirname, 'resume.html'), 'utf8');
  res.send(headerHtml + resumeHtml + footerHtml);
});

app.get('/about', (req, res) => {
  const aboutHtml = fs.readFileSync(path.join(__dirname, 'about.html'), 'utf8');
  res.send(headerHtml + aboutHtml + footerHtml);
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});