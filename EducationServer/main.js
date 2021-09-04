const http = require("http");
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 8000;

const RequestPasses = JSON.parse(fs.readFileSync('./RequestPass.json'))
const RequestFiles = {}

fs.readdirSync('./Requests').forEach(element => {
    let data 

    const type = element.slice(element.lastIndexOf("."))

    data = fs.readFileSync('./Requests/'+element)

    RequestFiles[element] = data
});

const server = http.createServer((req, res) => {

    const url = req.url

    // console.log(url)

    if (RequestPasses[url])
    {
        const pass = RequestPasses[url]
        res.statusCode = pass.statusCode || 200;
        res.setHeader('Content-Type', pass.header || "text/html");
        
        res.end(fs.readFileSync('./Requests/'+pass.FileName)) //Using this so it updates when I refresh
        // res.end(RequestFiles[pass.FileName]);
    } else {
        console.log("Missing : "+url)
        res.statusCode = 404;
        res.setHeader('Content-Type', "text/html");
        res.end(RequestFiles["404Page.htm"]);
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});