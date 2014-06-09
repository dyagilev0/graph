var Graph = require('./graph.js').Graph;
var fs = require('fs');



fs.readFile('kargerMinCut.txt', 'utf-8', function(err, data) {
	if (err) throw err;

	var arr = data.split('\n').map(function(item) {
		return item.split('\t');
	});
	var m = [];
	console.time(1);
	for (var i = 0; i < 100; i++) {
		var g = new Graph(arr);
		m.push(g.cutOnce());
	}
	console.timeEnd(1);
	console.log(getMaxOfArray(m));
});

var getMaxOfArray = function(numArray) {
	return Math.min.apply(null, numArray);
}

Graph.prototype.cutOnce = function() {
		var vertex, edge;
		while (this.length > 2) {
			vertex = this._getRandom(this.length);
			console.log(vertex);
			edge = this._getRandom(this.graph[vertex].e.length);
			this.mergeVertices(this.graph[vertex].v, this.graph[vertex].e[edge]);
		}

		for (i in this.graph) {
			return this.graph[i].e.length;
		}
	}

	Graph.prototype.cut = function(times) {
		var i, a = [];
		times = times || this.graph.length * this.graph.length * Math.log(this.graph.length);
		for (i = 0; i < times; i++) {
			a.push(this.cutOnce());
		}

		function getMinOfArray(numArray) {
			return Math.min.apply(null, numArray);
		}

		return getMinOfArray(a);
	}