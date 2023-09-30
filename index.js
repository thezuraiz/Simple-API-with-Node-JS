const http = require('http');
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));
let product = data.products;
const template = fs.readFileSync('./index.html', 'utf-8');

const server = http.createServer((req, res) => { 

    if (req.url == '/') {
        res.end("<h1>Home Page</h1>");
    }
    else if (req.url == '/about') {
        res.end("<h1>About Page</h1>");
    }
    else if (req.url == '/api') {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(data));
    }
    else if (req.url.startsWith('/product')) {
        let id = req.url.split('/')[2];
        let prd = product.find((p) => {
            return p.id == id;
        });
        if (prd === undefined) {
            res.end('<h1>Product Not Found</h1>')
            return;
        }
        res.writeHead(200, { "Content-Type": "text/html" })
        let html = template
            .replace('{{src}}', prd.images[0])
            .replace('{{title}}', prd.title)
            .replace('{{brand}}', prd.brand)
            .replace('{{price}}', prd.price)
            .replace('{{rating}}', prd.rating)
        res.end(html);
    }
    else {
        res.writeHead(404);
        res.end('<h1>Page Not Found</h1>')
     }
})

const port = 3000;
server.listen(port, () => { 
    console.log(`Your Server is running on port http://localhost:${port}`);
})