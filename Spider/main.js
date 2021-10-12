const { time } = require('console')
const https = require('https')
const fs = require("fs")

const startpoint = "https://en.wikipedia.org/wiki/Main_Page"
const LinkStart = '<ahref="'
const LinkStartLength = LinkStart.length

var VisitedLinks = {}

function LinkCheck()
{

}

function WriteFile(Link, data)
{

}

function LogLink(Link)
{
  console.log(Link)
  https.get(Link, resp => {
    let data = "";
  
    resp.on("data", chunk => {
      data += chunk
    })
  
    resp.on("end", () => {
      var Head = 0
      var CurrentLink = ""
      let WritingLink = false

      WriteFile(Link, Data)
      fs.writeFileSync("./Pages/"+Link, data)

      data = data.toLowerCase()

      for (var i = 0; i < data.length; i++)
      {
        const char = data.charAt(i)
  
        if (WritingLink) 
        {
          if (char == '"') 
          {
            Head = 0
            WritingLink = false

            if (CurrentLink.charAt(0) =="/")
            {
              CurrentLink = Link+CurrentLink.slice(1)
            }
            // if (CurrentLink.length > 100){continue}

            console.log(CurrentLink)

            LogLink(CurrentLink)
  
            CurrentLink = ""
          } else {CurrentLink += char}
          continue;
        }
  
        if (char == " "){continue;}
        if (char == LinkStart.charAt(Head))
        {
          Head++;
  
          if (Head >= LinkStartLength)
          {
            WritingLink = true
          }
        } else {
          Head = 0
        }
        
      }
      
      VisitedLinks[Link] = true
    })

    resp.on('error', error => {
      
    })
  })
}

LogLink(startpoint)

function ReturnLogs()
{
  // console.log(VisitedLinks)
}

setTimeout(ReturnLogs, 10000)

