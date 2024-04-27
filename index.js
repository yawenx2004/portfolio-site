const http = require('http');
const fs = require('fs');
const path = require('path');

const auth = require('basic-auth');
/* const sqlite3 = require('sqlite3'); */

const port = 1334;
const password = '30dec';

// check authentification
function authenticate(req, res) {
    const credentials = auth(req);

    // go home if you cancel
    if (!credentials || credentials.pass !== password) {
        const homeContent = fs.readFileSync(path.join(__dirname, 'src', 'main.html'), 'utf8');
        res.writeHead(401, { 'WWW-Authenticate': 'Basic realm="example"' });
        res.end(`${header}${homeContent}${footer}`);
        return;

    // otherwise, congratulations, you can see the page! <3
    } else {
        serveHtml(req, res, path.join(__dirname, 'src', 'internal.html'));
    }
}

// errors, header, & footer
const errorFilePath = path.join(__dirname, 'src', 'error.html');
const errorContent = fs.readFileSync(errorFilePath, 'utf8');
const header = fs.readFileSync(path.join(__dirname, 'src', 'header.html'), 'utf8');
const footer = fs.readFileSync(path.join(__dirname, 'src', 'footer.html'), 'utf8');

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

// constants for server
const pathMap = {
    '/': 'main.html',
    '/resume': 'resume.html',
    '/about': 'about.html',
    '/journal': 'journal.html',
    '/cosc25': 'cosc25.html',
    '/art-gallery': 'art-gallery.html',
    '/sandbox': 'sandbox.html'
};
const extensions = {
    '.css': ['style', 'text/css'],
    '.woff2': ['fonts', 'font/woff2'],
    '.png': ['images', 'images/png'],
    '.jpeg': ['images', 'images/jpeg'],
    '.jpg': ['images', 'images/jpeg'],
    '.pdf': ['documents', 'application/pdf']
};

// server!
const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    let filePath;

    // check if url matches path map
    if (pathMap[url.pathname]) {
        filePath = path.join(__dirname, 'src', pathMap[url.pathname]);

    // password-protected:
    } else if (url.pathname == '/internal') {

        // authenticate first
        authenticate(req, res);
        return;
    
    // configuration for non-html pages
    } else {

        // check file extensions
        for (const ext in extensions) {
            if (url.pathname.endsWith(ext)) {
                filePath = path.join(__dirname, extensions[ext][0], path.basename(url.pathname));
                break;
            }

            // if no mapping found, serve directly
            if (!filePath) {
                filePath = path.join(__dirname, url.pathname);
            }
        }
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
                let contentType = 'text/plain';
                for (const ext in extensions) {
                    if (filePath.endsWith(ext)) {
                        contentType = extensions[ext][1];
                    }
                    if (!contentType) {
                        contentType = 'text/plain';
                    }
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