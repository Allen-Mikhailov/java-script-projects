const http = require("http")
const fs = require('fs');
const { Console } = require("console");

const hostname = '127.0.0.1';
const port = 8000;

function _404(res)
{
    res.statusCode = 404;
    res.end();
}

function OnRequest(req, res)
{
    //Finding Domain
    const DomainIndex = req.url.lastIndexOf("/", 1)


}

const server = http.createServer(OnRequest);
  
  server.listen(port, hostname, () => {
    console.log(hostname);
    console.log(`Server running at http://${hostname}:${port}/`);
});

server.listen(port);