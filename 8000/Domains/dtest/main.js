const request = function(req, res)
{
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end("It worked yay");
}

console.log("Required")

exports.request = request