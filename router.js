const fs = require("fs")


const reqUrl = (req,res)=>{
    const url = req.url
    const method = req.method
    if(url==="/"){
        res.setHeader("Content-type","text/html")
        res.write("<html>")
        res.write("<head><title>My Website</title></head>")
        res.write("<body><form action='/message' method='POST'><input type='text' name='msg'><button type='submit'>Send</button> </form></body>")
        res.write("</html>")
        return res.end()
        } 
    if(url==="/message" && method === "POST"){
        const body = []
        req.on("data",(chunk)=>{
            body.push(chunk)
            console.log(chunk)
        })
        req.on("end",()=>{
            const pressData = Buffer.concat(body).toString()
            const message = pressData.split('=')[1]
            fs.writeFileSync("message.txt",message)
            console.log(message)
        })
       
        res.statusCode = 302;
        res.setHeader("Location","/")
        return res.end()
    
    }    
    
    res.setHeader("Content-type","text/html")
    res.write("<html>")
    res.write("<head><title>My Website</title></head>")
    res.write("<body><h1> Hello welcome my web page</h1></body>")
    res.write("</html>")
    res.end()
}


// module.exports = {
//     handler : reqUrl,
//     SomeText : "Hard code text"
// }

exports.handler = reqUrl
exports.SomeText = "Hard Code Text"

