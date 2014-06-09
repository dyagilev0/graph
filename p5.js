var Graph = require('./graph.js').Graph;
var fs = require('fs');

fs.readFile('dijkstraData.txt', 'utf-8', function(err, data) {
	if (err) throw err;

	var arr = data.split('\r\n').map(function(item) {
		return item.split('\t');
	});

	var g = new Graph(arr);

	console.log(g.graph[1]);
});