const http = require("http")

const router = require("./router")

console.log(router.SomeText)

const server= http.createServer(router.handler)


server.listen(5000)