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