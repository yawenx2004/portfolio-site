const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const port = 1334;

// rest of my code
app.use(express.static('style'));
app.use(express.static('fonts'));
app.use(express.static('documents'));
app.use(express.static('images'))

// various pages
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

app.get('/art-gallery', (req, res) => {
  const artGalleryHtml = fs.readFileSync(path.join(__dirname, 'art-gallery.html'), 'utf8');
  res.send(headerHtml + artGalleryHtml + footerHtml);
});

// password-protected internal page
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

const myPassword = '1334'

// password authentification form
app.get('/internal', (req, res) => {
  const passwordFormHtml = fs.readFileSync(path.join(__dirname, 'password-form.html'), 'utf8')
  res.send(passwordFormHtml);
});

// handling form submission; internal page
app.post('/authenticate', (req, res) => {
  const { password } = req.body;

  // if password is correct, send form; if not, don't
  if (password === myPassword) {
    const internalHtml = fs.readFileSync(path.join(__dirname, 'internal.html'), 'utf8');
    res.send(headerHtml + internalHtml + footerHtml);
  } else {
    const passwordFormHtml = fs.readFileSync(path.join(__dirname, 'password-form.html'), 'utf8')
    res.send(passwordFormHtml);
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});