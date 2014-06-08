(function() {
	function Graph(a) {
		this.graph = {};
		this.length = 0;

		if (a) {
			for (i = 0; i < a.length; i++) {
				this.loadLine(a[i]);
			}
		}
	}

	Graph.prototype.addVertex = function(v) {
		var oV = {};
		if (!this.hasVertex.call(this, v)) {
			oV = {
				v: v,
				e: []
			};
			this.graph[v] = oV;
			this.length++;
		}
		return oV;
	}

	Graph.prototype.delVertex = function(v) {
		for (i in this.graph.length) {
			this.delUndirectEdge(v, this.graph[i].v);
		};
		delete this.graph[v];
		this.length++;
		return this;
	}

	Graph.prototype.addDirectEdge = function(u, v) {
		var oU = this.getVertex.call(this, u);
		var oV = this.getVertex.call(this, v);

		if (!oU) oU = this.addVertex.call(this, u);
		if (!oV) oV = this.addVertex.call(this, v);

		oU.e.push(v);

		return this;
	}

	Graph.prototype.delUndirectEdge = function(u, v) {
		var oU = this.getVertex(u);
		var oV = this.getVertex(v);

		if (!oU || !oV || !this.hasUndirectEdge(u, v)) {
			return null;
		}

		oU.e = oU.e.filter(function(item) {
			return item !== v;
		});

		oV.e = oV.e.filter(function(item) {
			return item !== u;
		});

		return this;
	}

	Graph.prototype.delDirectEdge = function(u, v) {
		var oU = this.getVertex(u);

		if (!oU || !this.hasDirectEdge(u, v)) {
			return null;
		}

		oU.e = oU.e.filter(function(item) {
			return item !== v;
		});
	}

	Graph.prototype.hasUndirectEdge = function(u, v) {
		var oU = this.getVertex(u);
		var oV = this.getVertex(v);

		if (!oU || !oV) {
			return null;
		}

		if (oU.e.some(function(item) {
			return item === v;
		}) && oV.e.some(function(item) {
			return item === u;
		})) {
			return true;
		}

		return false;
	}

	Graph.prototype.hasDirectEdge = function(u, v) {
		var oU = this.getVertex(u);

		if (!oU) {
			return null;
		}

		if (oU.e.some(function(item) {
			return item === v;
		})) {
			return true;
		}

		return false;
	}

	Graph.prototype.getVertex = function(v) {
		return this.graph[v];
	}

	Graph.prototype.hasVertex = function(v) {
		return this.graph[v] ? true : false;
	}

	Graph.prototype.getArrayOfNode = function(property) {
		var m = [],
			i;
		for (i in this.graph) {
			m.push(Number(this.graph[i][property]));
		}

		return m.sort(function(a, b) {
			return a < b ? 1 : -1
		})
	}

	Graph.prototype.reverse = function() {
		var t = new Graph(),
			v;
		for (i in this.graph) {
			v = this.graph[i].v;
			for (j = 0; j < this.graph[i].e.length; j++) {
				t.addDirectEdge(this.graph[i].e[j], v);
			}
		}
		this.graph = t.graph;
		delete t;

		return this;
	}

	Graph.prototype.reverseWithChanging = function() {
		var t = new Graph(),
			a = {},
			v;
		for (i in this.graph) {
			a[this.graph[i].v] = this.graph[i].n;
		}

		for (i in this.graph) {
			v = this.graph[i].v;
			for (j = 0; j < this.graph[i].e.length; j++) {
				t.addDirectEdge(a[this.graph[i].e[j]], a[v]);
			}
		}
		this.graph = t.graph;
		delete t;

		return this;
	}

	Graph.prototype.mergeVertices = function(u, v) {
		var oU = this.getVertex(u);
		var oV = this.getVertex(v);

		if (!oU || !oV) {
			return null;
		}

		this._changeEdge(u, v);
		oV.e = oV.e.concat(oU.e);

		this.delVertex(u)._delSelfLoop(oV);

		return this;
	}

	// u <-- v
	Graph.prototype._changeEdge = function(u, v) {
		var i, oV;
		for (i in this.graph) {
			oV = this.graph[i];
			oV.e = oV.e.map(function(item) {
				return item !== u ? item : v;
			});
		}

		return this;
	}

	Graph.prototype._delSelfLoop = function(oV) {
		oV.e = oV.e.filter(function(item) {
			return item !== oV.v;
		});

		return this;
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

	Graph.prototype._getRandom = function(max) {
		return Math.floor(Math.random() * max);
	}

	Graph.prototype.loadLine = function(a) {
		var v = a[0],
			i;
		if (a.length > 1) {
			for (i = 1; i < a.length; i++) {
				if (a[i]) this.addDirectEdge(v, a[i]);
			}
		} else {
			this.addVertex(v);
		}
	}

	Graph.prototype._setExplored = function(flag) {
		for (i in this.graph) {
			this.graph[i].explored = flag;
		}
	}

	exports.Graph = Graph;

}());