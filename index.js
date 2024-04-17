const http = require('http');
const fs = require('fs');
const path = require('path');
const auth = require('basic-auth');

const port = 1334;
const password = '30dec';

// errors, header, & footer
const errorFilePath = path.join(__dirname, 'error.html');
const errorContent = fs.readFileSync(errorFilePath, 'utf8');
const header = fs.readFileSync(path.join(__dirname, 'header.html'), 'utf8');
const footer = fs.readFileSync(path.join(__dirname, 'footer.html'), 'utf8');

// check authentification
function authenticate(req, res) {
    const credentials = auth(req);

    // go home if you cancel
    if (!credentials || credentials.pass !== password) {
        const homeContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
        res.writeHead(401, { 'WWW-Authenticate': 'Basic realm="example"' });
        res.end(`${header}${homeContent}${footer}`);
        return;

    // otherwise, congratulations, you can see the page! <3
    } else {
        serveHtml(req, res, path.join(__dirname, 'internal.html'));
    }
}

// serve with header & footer
function serveHtml(req, res, filePath) {

    // read requested file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(`${header}${errorContent}${footer}`);
        
        // combine content with header & footer
        } else {
            const content = `${header}${data}${footer}`;
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
        }
    });
}

// server!
const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    let filePath;

    // various html pages
    if (url.pathname === '/') {
        filePath = path.join(__dirname, 'index.html');
    } else if (url.pathname === '/resume') {
        filePath = path.join(__dirname, 'resume.html');
    } else if (url.pathname === '/about') {
        filePath = path.join(__dirname, 'about.html');
    } else if (url.pathname === '/art-gallery') {
        filePath = path.join(__dirname, 'art-gallery.html');

    // password-protected:
    } else if (url.pathname == '/internal') {

        // authenticate first
        authenticate(req, res);
        return;
    
    // configuration for non-html pages
    } else if (url.pathname.endsWith('.css')) {
        filePath = path.join(__dirname, 'style', path.basename(url.pathname));
    } else if (url.pathname.endsWith('.woff2')) {
        filePath = path.join(__dirname, 'fonts', path.basename(url.pathname));
    } else if (url.pathname.endsWith('.png') || url.pathname.endsWith('.jpeg')) {
        filePath = path.join(__dirname, 'images', path.basename(url.pathname));
    } else if (url.pathname.endsWith('.pdf') || url.pathname.endsWith('.jpeg')) {
        filePath = path.join(__dirname, 'documents', path.basename(url.pathname));
    } else {
        filePath = path.join(__dirname, url.pathname);
    }

    // serve html files with header & footer
    if (filePath.endsWith('.html')) {
        serveHtml(req, res, filePath);
    
    // serve other files directly
    } else {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(`${header}${errorContent}${footer}`);
            
            // determine content type based on file extension
            } else {
                let contentType;
                if (filePath.endsWith('.css')) {
                    contentType = 'text/css';
                } else if (filePath.endsWith('.woff2')) {
                    contentType = 'font/woff2';
                } else if (filePath.endsWith('.png')) {
                    contentType = 'image/png';
                } else if (filePath.endsWith('.jpeg') || filePath.endsWith('.jpg')) {
                    contentType = 'image/jpeg';
                } else if (filePath.endsWith('.pdf')) {
                    contentType = 'application/pdf';
                } else {
                    contentType = 'text/plain';
                }

                res.writeHead(200, { 'Content-Type': contentType });
                res.end(data);
            }
        });
    }
});

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});