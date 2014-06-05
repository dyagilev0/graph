var Graph = require('./graph.js').Graph;
var assert = require('assert');
var g = new Graph();

console.log('Test start:');

console.log('Check addVertex and getVertex:');
assert(g.addVertex(1) === g.getVertex(1), 'vertex add');
assert(g.getVertex(1).v === 1, 'vertex add (v)');
assert(g.getVertex(1).e.length === 0, 'vertex add (e)');
console.log('done');

console.log('Check delVertex:');
assert(g.delVertex(1) === g, 'vertex del');
assert(g.getVertex(1) === null, 'vertex delete (v)');
console.log('done');


console.log('Check addDirectEdge:');
g.addVertex(1);
g.addVertex(2);

g.addDirectEdge(1, 2);
assert(g.getVertex(1).e[0] === 2, 'edge add 1 -> 2');

g.addDirectEdge(2, 1);
assert(g.getVertex(2).e[0] === 1, 'edge add 2 -> 1');

assert(g.addDirectEdge(1, 3) === g, 'edge add 1 -> 3 === null');
assert(g.addDirectEdge(3, 1) === g, 'edge add 3 -> 1 === null');
console.log('done');

console.log('Check hasUndirectEdge:');
assert(g.hasUndirectEdge(1, 2), 'has edge 1 -> 2 && 2 -> 1');
assert(g.hasUndirectEdge(1, 4) === null, 'has not vertex 4');
g.addVertex(4);
assert(g.hasUndirectEdge(1, 4) === false, 'has not edge 1 -> 4 && 4 -> 1');
console.log('done');


console.log('Check delUndirectEdge:');
g.delUndirectEdge(1,2);
assert(g.getVertex(1).e.length === 1, 'edge del 1 -> 2');
assert(g.getVertex(2).e.length === 0, 'edge del 2 -> 1');
console.log('done');

console.log('Check validator');
assert(g.validate(),'valid edge');
g.addDirectEdge(1,2);
g.addDirectEdge(2,1);
assert(g.validate(),'valid edge');
g.delVertex(2);
assert(g.validate(),'valid edge');
console.log('done');



console.log('Check delDirectEdge');
var g2 = new Graph();
g2.addDirectEdge(1,2);
g2.addDirectEdge(2,1);
g2.delDirectEdge(1,2);
assert(g2.hasDirectEdge(1,2) === false,'valid direct edge 1');
assert(g2.hasDirectEdge(2,1),'valid direct edge 2');

console.log('done');


console.log('Test successfully completed.');
