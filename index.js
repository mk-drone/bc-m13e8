let http = require('http');
let fs = require('fs');

let serv = http.createServer();


serv.on('request', (req, resp)=>{
    
    if(req.method === 'GET'){
        console.log(`requested: ${req.url} via ${req.method}`);
        if(req.url === '/'){
            resp.setHeader("Content-Type", "text/html; charset=utf-8");
            //read index.html and serve as response
            fs.readFile('./index.html', 'utf-8',(err, data)=>{                
                if(!err){
                    resp.write(data);
                }else{
                    resp.write('error while reading file: index.html');
                    console.log(err);
                }
                resp.end();
            });
        }else{
            //read 404 image and serve as response
            fs.readFile('./cat.jpg',  (err, data)=>{
                if(!err){
                    resp.write(data);
                }else{
                    resp.write('error while reading file: 404.html');
                    console.log(err);
                }
                resp.end();
            });
        }
    }else{
        resp.write('Invalid HTTP method');
        resp.end();
    }    
});

console.log('starting server on port 9000');
serv.listen(9000);
