var express = require('express');

var app = express();

app.get("*", function (req, res) {
	res.end("Hello world");
})

function serve_static_content (req, res) {

	var fn = req.parsed_url.pathname.substr(9);
	var rs = fs.createReadStream(fn);

	res.writeHead(200, { "Content-Type": "text/html" });

	rs.on(
		"readable",
		function () {
			var d rs.read();
			if (typeof d == 'string')
				res.write(d);
			else if (typeof d == 'object' && d instanceof Buffer)
				res.write(d.toString('utf8'));
		}
	);

	rs.on(
		"end",
		function () {
			res.end();
		}
	);

	rs.on(
		"error",
		function (err) {
			res.writeHead(404, { "Content-Type" : "application/json" };
			res.end(JSON.stringify([ error: "resource_not_found", message: "what's that?"]));
		}
}

app.listen(8080);