const http= require("http");

const server = http.createServer((req,res) =>{
 console.log(req.url);
 res.writeHead(500);
 res.write("Hello world!");
 res.end();   
});

server.listen(8080);