const http = require("http");
const fs = require("fs");

const requestHandler = (req, res) => {
    const url = req.url;
	const method = req.method;
    if (url === "/") {
        res.write("<html>");
        res.write("<head><title>Enter Message</title></head>");
        res.write(
            '<body><form action="/message" method="Post">' +
                '<input type="text" name="message"><button type="submit" >Send</button></form></body>'
        );
        res.write("</html>");
        return res.end();
    }
    if (url === "/message" && method === "POST") {
        console.log('in post method ');
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            console.log(parsedBody);
            fs.writeFile("message.txt", message, (err) => {
                res.statusCode = 302;
                res.setHeader("Location", "/");
                return res.end();        
            });
        });
    } else {
        res.setHeader("Content-Type", "text/html");
        res.write("<html>");
        res.write("<head><title>my First Page</title></head>");
        res.write("<body><h1>Hello from my Node.js Server!</h1></body>");
        res.write("</html>");
        res.end();
    }
};

module.exports = {
    handler: requestHandler,
    someText: 'some hard coded text'
}

// module.exports.handler = requestHandler;
// module.exports.someText = 'some hard coded text';

// exports.handler = requestHandler;
// exports.someText = 'some hard coded text';

//requestHandler;