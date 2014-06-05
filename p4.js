var Graph = require('./graph.js').Graph;
var fs = require('fs');



fs.readFile('dfs.txt', 'utf-8', function(err, data) {
	if (err) throw err;

	var arr = data.split('\r\n').map(function(item) {
		return item.split('\t');
	});
	
	var g = new Graph(arr);

	g.dfsLoop();

	console.log(g.graph[0]);
	console.log(g.graph[1]);
	console.log(g.graph[2]);
	console.log(g.graph[3]);
	console.log(g.graph[4]);
	console.log(g.graph[5]);
	console.log(g.graph[6]);
	console.log(g.graph[7]);
	
});
