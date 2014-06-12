var Graph = require('./graph.js').Graph;
var fs = require('fs');

fs.readFile('dijkstraData.txt', 'utf-8', function(err, data) {
	if (err) throw err;

	var arr = data.split('\r\n').map(function(item) {
		return item.split('\t');
	});

	var g = new Graph(arr);

	var s = '1',
		e = '7';
	console.time(1);
	var x = new X(s, makeArrayEdges(g.getVertex(s)));

	while (x.complete()) {
		var nextEdge = x.getEdgeWithLowestLength();
		var nextVertex = g.getVertex(nextEdge.getV());
		x.addArrayOfEdges(makeArrayEdges(nextVertex));
		x.setNewLength(nextEdge);
		x.check();
	}
	console.timeEnd(1);

	var vert = [7, 37, 59, 82, 99, 115, 133, 165, 188, 197];
	var result = [];
	for (var i = 0; i < vert.length; i++) {
		result.push(x.a[vert[i]]);
	}

	console.log(result.join(','));
});

var X = function(s, sEdges) {
	this.a = {};
	this.a[s] = 0;
	this.b = [];
	this.edges = sEdges;
}

X.prototype.complete = function(e) {
	return !!this.edges.length;
}

X.prototype.getEdgeWithLowestLength = function() {
	var that = this;
	var edge = this.edges.reduce(function(min, edge) {
		return (Number(edge.getL()) + Number(that.a[edge.getU()]) < Number(min.getL()) + Number(that.a[min.getU()])) ? edge : min;
	}, new Edge('1', '1', Infinity));

	return edge;
}

X.prototype.check = function() {
	var i;
	for (i = 0; i < this.edges.length; i++) {
		if (this.a[this.edges[i].getV()]) {
			delete this.edges[i];
		}
	}
	this.edges = this.edges.filter(function(edge) {
		return edge
	});
}

X.prototype.delEdgeByHead = function(v) {
	console.log(typeof v);
	this.edges = this.edges.filter(function(edge) {
		return edge.getV() !== v;
	});
}

X.prototype.addArrayOfEdges = function(a) {
	var i, result = [],
		that = this;
	result = a.filter(function(itm) {
		return !that.a.hasOwnProperty(itm.getV());
	});
	for (i = 0; i < result.length; i++) {
		this.edges.push(result[i]);
	}
}

X.prototype.addEdge = function(a) {
	this.edges.push(a);
}


X.prototype.setNewLength = function(oEdge) {
	this.b.push(oEdge);
	this.set(oEdge.getV(), Number(this.get(oEdge.getU())) + Number(oEdge.getL()));
}

X.prototype.set = function(v, l) {
	this.a[v] = l;
}

X.prototype.get = function(v) {
	return this.a[v];
}

var Edge = function(u, v, l) {
	this.u = u;
	this.v = v;
	this.l = l;
}

Edge.prototype.getL = function() {
	return this.l;
}

Edge.prototype.getU = function() {
	return this.u;
}

Edge.prototype.getV = function() {
	return this.v;
}

var makeArrayEdges = function(oV) {
	var result = [],
		i, v = oV.v;
	for (i = 0; i < oV.e.length; i++) {
		result.push(new Edge(v, oV.e[i], oV.l[i]));
	}

	return result;
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