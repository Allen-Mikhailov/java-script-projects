const http = require("http");
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 8000;

const Error = function(err, data)
{
    if (err) 
        throw err;
}

const data = JSON.parse(fs.readFileSync("./DataBase.json", Error));

console.log(data);


const Page = fs.readFileSync("./Page.htm");
const Styles = fs.readFileSync("./styles.css");

function UserDataTemplateCreate()
{
    return {
        Password : "",
        Notes : {},
        Reminders : {}
    }
}

const UserDataTemplate = UserDataTemplateCreate()

const SaveData = function()
{
    const d = JSON.stringify(data, null, 2);
    fs.writeFileSync("./DataBase.json", d);
}

const listen = function(req, res)
{
    console.log(req.url);
    res.statusCode = 200;

    const url = req.url.slice(1);

    const firstSlash = url.indexOf("/");
    const secondSlash = url.lastIndexOf("/")
    let cmd = "";
    if (firstSlash == -1)
    {
        cmd = url
    } else {
        cmd = url.slice(0, firstSlash);
    }

    var H1 = "";
    var H2 = "";
    H1 = "Content-Type";

    var Send

    switch (cmd)
    {
        case ("Login"):
            var Username = url.slice(firstSlash+1, secondSlash);
            var GivenPassword = url.slice(secondSlash+1);
            console.log(Username);
            console.log(GivenPassword);

            H2 = "application/json";
            if (data[Username] && GivenPassword == data[Username])
            {
                Send = "Login";
                console.log("Loged In");
            } else {
                Send = "IncorrectPassword";
            }
            break;

        case ("CreateUser"):
            var Username = url.slice(firstSlash+1, secondSlash);
            var GivenPassword = url.slice(secondSlash+1);

            H2 = "application/json";
            if (data[Username] == null)
            {
                data[Username] = GivenPassword;

                SaveData();
            
                Send = "Created User"
            } else {
                Send = "There is Already a user with that Name"
            }
            break;

        case ("favicon.ico"):
            console.log("favicon"+url)
            Send = "Stuff";
            break;
        case ("styles.css"):
            console.log("SentCSS"+url)
            H2 = "text/css";
            Send = Styles;
            break;
        default:
            H2 = "text/html";
            Send = Page;
            break;
    }

    console.log(Send);
    res.setHeader(H1, H2);
    res.end(Send);
}

const server = http.createServer(listen);
  
  server.listen(port, hostname, () => {
    console.log(hostname);
    console.log(`Server running at http://${hostname}:${port}/`);
});

server.listen(port);