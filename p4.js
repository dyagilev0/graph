var Graph = require('./graph.js').Graph;
var fs = require('fs');

fs.readFile('SCC.txt', 'utf-8', function(err, data) {
	if (err) throw err;

	console.time('read file and sliting');
	var a = data.split('\n').map(function(item) {
		return item.split(' ')
	});
	console.timeEnd('read file and sliting');

	console.time('create graph')
	var g = new Graph(a);
	console.timeEnd('create graph')

	console.time('start dfs loop')
	dfsLoop(g, g.reverse());
	console.timeEnd('start dfs loop')

	dfsLoop(g, g.reverseWithChanging());
	console.log(g.graph[1]);
	console.log(g.graph[2]);
	console.log(g.graph[3]);
	console.log(g.graph[4]);
	console.log(g.graph[5]);
	console.log(g.graph[6]);
	console.log(g.graph[7]);
	console.log(g.graph[8]);
	console.log(g.graph[9]);

	/*	console.log(countArr.sort(function(a, b) {
		a = Number(a);
		b = Number(b);
		if (a === b) return 0;
		return a < b ? 1 : -1
	}).slice(0, 5));*/

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

	if (counter) counter(oS);
}

var dfs = function(g, s) {
	g._setExplored(false);
	_dfs(g, s);
}

var dfsLoop = function(g, order) {
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

	//console.log(order);
	g._setExplored(false);
	for (var i = 0; i < order.length; i++) {
		if (g.graph[order[i]].explored === false) {
			_dfs(g, g.graph[order[i]].v, counter(g.graph[order[i]].v));
		}
	}
}