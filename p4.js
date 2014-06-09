var Graph = require('./graph.js').Graph;
var fs = require('fs');

fs.readFile('dfs.txt', 'utf-8', function(err, data) {
	if (err) throw err;

	console.time('read file');
	var a = data.split('\n').map(function(item) {
		return item.split(' ')
	});

	console.timeEnd('read file');

	console.time('create graph')

	var g = new Graph(a);

	console.timeEnd('create graph')

	console.time('start dfs loop')
	dfsLoop(g.reverse());
	console.timeEnd('start dfs loop')

	dfsLoop(g.reverseWithChanging());
	console.log(g.graph[1]);
	console.log(g.graph[2]);
	console.log(g.graph[3]);
	console.log(g.graph[4]);
	console.log(g.graph[5]);
	console.log(g.graph[6]);
	console.log(g.graph[7]);
	console.log(g.graph[8]);
	console.log(g.graph[9]);

	console.log(countArr.sort(function(a, b) {
		a = Number(a);
		b = Number(b);
		if (a === b) return 0;
		return a < b ? 1 : -1
	}).slice(0, 5));

	var compare = function(a, b) {
		a = Number(a);
		b = Number(b);
		if (a < b)
			return 1;
		if (a > b)
			return -1;
		return 0;
	}
});

var count = null;
var countArr = null;

var _dfs = function(g, s, counter) {
	var oS = g.getVertex(s),
		i, oV;

	if (!oS) return null;

	count++;
	oS.explored = true;

	for (i = 0; i < oS.e.length; i++) {
		oV = g.getVertex(oS.e[i]);
		if (oV.explored === false) {
			oV.explored = true;
			_dfs(g, oV.v, counter);
		}
	}

	if (counter) counter(oS);

}

var dfs = function(g, s) {
	g._setExplored(false);
	_dfs(g, s);
}

var dfsLoop = function(g) {
	var m = g.getArrayOfNode('v');

	var counter = (function() {
		var t = 0;
		return function(l) {
			var leader = l;
			return function(oV) {
				oV.leader = leader;
				return oV.n = ++t;
			}
		}
	})();


	count = 0;
	countArr = [];
	g._setExplored(false);
	for (var i = 0; i < g.length; i++) {
		if (g.graph[m[i]].explored === false) {
			_dfs(g, g.graph[m[i]].v, counter(g.graph[m[i]].v));
			countArr.push(count);
			count = 0;
		}
	}
}