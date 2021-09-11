const http = require("http")
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 8000;

var domains = {}
var DomainPage = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>8k</title>
</head>
<body>
    <h1>Domains</h1>
`

fs.readdirSync("./Domains").forEach(function(domainname)
{
    domains[domainname] = require("./Domains/"+domainname+"/main.js")
    DomainPage += "<a href = "
})

DomainPage += "</body></html>"

function _404(res, error)
{
    console.log("404 : " + error)
    res.statusCode = 404;
    res.end(error);
}

function OnRequest(req, res)
{
    //Finding Domain
    const DomainIndex = req.url.lastIndexOf("/")
    if (DomainIndex == -1 || DomainIndex == 0) {
        if (req.url == "/")
        {
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html");
            res.end(DomainPage);
        }
        return
    }

    const domain = req.url.substring(1, DomainIndex).toLowerCase()

    console.log("Domain : " + domain)

    if (!domains[domain]) {return _404(res, "Invalid Domain {"+domain+"}")}

    domains[domain].request(req, res)
}

const server = http.createServer(OnRequest);
  
  server.listen(port, hostname, () => {
    console.log(hostname);
    console.log(`Server running at http://${hostname}:${port}/`);
});

server.listen(port);
