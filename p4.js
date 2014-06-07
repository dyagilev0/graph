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

	console.time('read file');
	var arr = data.split('\n').map(function(item) {
		return item.split(' ');
	});
	console.timeEnd('read file');

	console.time('create graph')

	var g = new Graph(arr);
	console.timeEnd('create graph')

	console.time('start dfs loop')
	console.log(g.dfsLoop());
	console.timeEnd('start dfs loop')
	

	console.log(g.graph[1]);
	console.log(g.graph[2]);
	console.log(g.graph[3]);
	console.log(g.graph[4]);
	console.log(g.graph[5]);
	console.log(g.graph[6]);
	console.log(g.graph[7]);
	console.log(g.graph[8]);

	console.log(g.graph[9]);
	
});