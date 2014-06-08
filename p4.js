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


fs.readFile('dfs.txt', 'utf-8', function(err, data) {
	if (err) throw err;

	console.time('read file');
	var a = data.split('\n').map(function(item) {
		return item.trim().split(' ').reverse()
	});
	console.timeEnd('read file');
	console.log(a[0]);


	console.time('create graph')

	var g = new Graph(a);

	console.timeEnd('create graph')

	console.time('start dfs loop')
	dfsLoop(g);
	console.timeEnd('start dfs loop')

	/*console.time('read file');
	var a = data.split('\n').map(function(item) {
		return item.split(' ');
	});
	console.timeEnd('read file');

	console.time('create graph')
	var g = new Graph(a);
	console.timeEnd('create graph')

	console.time('start dfs loop')
	console.log(dfsLoop(g));
	console.timeEnd('start dfs loop')*/

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

var _dfs = function(g, s, counter) {
	var oS = g.getVertex(s),
		i, oV;

	if (!oS) return null;

	oS.explored = true;
	for (i = 0; i < oS.e.length; i++) {
		oV = g.getVertex(oS.e[i]);
		if (oV.explored === false) {
			oV.explored = true;
			_dfs(g, oV.v, counter);
		}
	}

	if (counter) oS.n = counter();

}

var dfs = function(g, s) {
	g._setExplored(false);
	_dfs(g, s);
}

var dfsLoop = function(g) {
	var m = g.getArrayOfNode('v');
	var counter = (function() {
		var t = 0;
		return function() {
			return ++t;
		}
	})();
	//console.log(m);
	g._setExplored(false);
	for (var i = 0; i < g.length; i++) {
		//console.log(i, m[i], g.graph[m[i]]);
		if (g.graph[m[i]].explored === false) {
			_dfs(g, g.graph[m[i]].v, counter);
		}
	}
}