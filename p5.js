var Graph = require('./graph.js').Graph;
var fs = require('fs');

fs.readFile('test.txt', 'utf-8', function(err, data) {
	if (err) throw err;

	var arr = data.split('\r\n').map(function(item) {
		return item.split('\t');
	});

	var g = new Graph(arr);

	console.time(1);
	//var n = fraction(g);
	g = fraction(g);
	bfs(g, 1);
	console.timeEnd(1);
	/*console.log(n.graph[1]);
	console.log(n.graph[2]);
	console.log(n.graph[3]);
	console.log(n.graph[4]);*/
	console.log(g.graph);
});


var dij = function(g) {
	g._setExplored(false);
	var oS = g.graph[1],
		i, minIndex, min, a = {},
		b = {};
	while (isExplored(g) === false) {
		_dig(g, oS, a, b);
	}
}

var _dij = function(g, oS, a, b) {
	var min = oS.l[0];
	var minIndex = 0;
	oS.explored = true;
	for (i = 1; i < oS.e.length; i++) {
		if (min > oS.l[i]) {
			min = oS.l[i];
			minIndex = i;
		}
	}
}

var fraction = function(g) {
	var n = new Graph();
	var i, j, k, oV;
	for (i in g.graph) {
		oV = g.getVertex(i);
		for (j = 0; j < oV.e.length; j++) {
			if (oV.l[j] === '1') {
				n.addDirectEdge(oV.v, oV.e[j]);
			} else {
				var s = oV.v,
					t;
				for (k = 0; k < Number(oV.l[j]) - 1; k++) {
					t = oV.v + "_" + oV.e[j] + '_' + k;
					n.addDirectEdge(s, t)
					s = oV.v + "_" + oV.e[j] + '_' + k;
				}
				n.addDirectEdge(s, oV.e[j]);
			}
		}
	}
	return n;
}

var bfs = function(g, s) {
	g._setExplored(false);
	var oS = g.getVertex(s);
	oS.explored = true;
	var Q = [oS],
		i, oU, t = 0;
	while (Q.length) {
		oV = Q.shift();
		t++;
		for (i = 0; i < oV.e.length; i++) {
			oU = g.getVertex(oV.e[i]);
			if (oU.explored === false) {
				oU.explored = true;
				Q.push(oU);
				oU.n = t;
			}
		}
	}
}


var isExplored = function(g) {
	for (i in g.graph) {
		if (g.graph[i].explored === false) return false;
	}
	return true;
}