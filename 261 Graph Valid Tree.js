// Given n nodes labeled from 0 to n - 1 and a list of undirected edges (each edge is a pair of nodes), write a function to check whether these edges make up a valid tree.

// For example:

// Given n = 5 and edges = [[0, 1], [0, 2], [0, 3], [1, 4]], return true.

// Given n = 5 and edges = [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]], return false.

// Show Hint 
// Note: you can assume that no duplicate edges will appear in edges. Since all edges are undirected, [0, 1] is the same as [1, 0] and thus will not appear together in edges.

// Hide Company Tags Google Facebook Zenefits
// Hide Tags Depth-first Search Breadth-first Search Graph Union Find
// Hide Similar Problems (M) Course Schedule (M) Number of Connected Components in an Undirected Graph


/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean}
 */


// reference: https://segmentfault.com/a/1190000003791051

var validTree = function(n, edges) {
    var unionFind = new UnionFind(n);
    
    for(var i = 0; i < edges.length; i++) {
        if(!unionFind.union(edges[i][0], edges[i][1])) {
            return false;
        }
    }
    
    return unionFind.unionCount() === 1;
};

// reference: http://blog.csdn.net/dm_vincent/article/details/7655764
class UnionFind {
    constructor(size) {
        this.ids = [];
        
        for(var i = 0; i < size; i++) {
            this.ids[i] = i;
        }
        
        this.count = size;
    }
    
    union(m, n) {
        var src = this.find(m);
        var dest = this.find(n);
        
        if(src === dest) {
            return false;
        }
        
        for(var i = 0; i < this.ids.length; i++) {
            if(this.ids[i] === src) {
                this.ids[i] = dest;
            }
        }
        
        // once union, count-- -> count === 1 means it's a tree with no circle
        this.count--;
        
        return true;
    }
    
    find(m) {
        return this.ids[m];
    }
    
    areConnected(m, n) {
        return this.find(m) === this.find(n);
    }
    
    unionCount() {
        return this.count;
    }
}