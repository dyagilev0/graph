(function() {
	function Graph() {
		this.graph = [];
	}

	Graph.prototype.addVertex = function(v) {
		var oV = {};
		if (!this.hasVertex(v)) {
			oV = {
				v: v,
				e: []
			};
			this.graph.push(oV);
		}
		return oV;
	}

	Graph.prototype.delVertex = function(v) {
		for (var i = 0; i < this.graph.length; i++) {
			this.delUndirectEdge(v, this.graph[i].v);
		};
		this.graph = this.graph.filter(function(item) {
			return item.v !== v;
		})

		return this;
	}

	Graph.prototype.addDirectEdge = function(u, v) {
		var oU = this.getVertex(u);
		var oV = this.getVertex(v);

		/*		if (!oU || !oV) {
			return null;
		}*/
		if (!oU) oU = this.addVertex(u);
		if (!oV) oV = this.addVertex(v);

		oU.e.push(v);
		//oV.e.push(u);

		return this;
	}

	Graph.prototype.delUndirectEdge = function(u, v) {
		var oU = this.getVertex(u);
		var oV = this.getVertex(v);

		if (!oU || !oV || !this.hasEdge(u, v)) {
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

	Graph.prototype.hasEdge = function(u, v) {
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

	Graph.prototype.getVertex = function(v) {
		for (var i = 0; i < this.graph.length; i++) {
			if (this.graph[i].v === v) return this.graph[i];
		}

		console.log('WARN: vertex (' + v + ') not found');
		return null;
	}

	Graph.prototype.hasVertex = function(v) {
		return this.graph.some(function(item) {
			return item.v === v;
		});
	}

	Graph.prototype.validate = function() {
		var i, j, oV;
		for (i = 0; i < this.graph.length; i++) {
			oV = this.graph[i];
			for (j = 0; j < oV.e.length; j++) {
				if (!this.hasVertex(oV.e[j])) {
					console.log('ERR: not valid graph');
					return false;
				}
			}
		}
		return true;
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
		for (i = 0; i < this.graph.length; i++) {
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

		while (this.graph.length < 2) {
			vertex = this._getRandom(this.graph.length);
			edge = this._getRandom(this.graph[vertex].e.length);
			console.log(vertex, edge);
			this.mergeVertices(this.graph[vertex].v, this.graph[vertex].e[edge]);
		}

		return this.graph[0].e[0].length;
	}

	Graph.prototype._getRandom = function(max) {
		return Math.floor(Math.random() * max);
	}

	exports.Graph = Graph;

}());