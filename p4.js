var Graph = require('./graph.js').Graph;
var fs = require('fs');

/*var readline = require('readline');
var stream = require('stream');

var instream = fs.createReadStream('SCC.txt');
var outstream = new stream;
var rl = readline.createInterface(instream, outstream);

var g = new Graph();

rl.on('line', function(line) {
	g.loadLine(line.split(' '));
});*/


fs.readFile('SCC.txt', 'utf-8', function(err, data) {
	if (err) throw err;

	console.log('read file');
	var arr = data.split('\n').map(function(item) {
		return item.split(' ');
	});

	console.log('create graph')
	var g = new Graph(arr);

	console.log('start dfs loop')
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
