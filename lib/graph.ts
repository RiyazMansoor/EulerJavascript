
export type ComparatorResult = -1 | 0 | 1 ;
export type Comparator<T> = ( a: T, b: T ) => ComparatorResult ;

export type HasherResult = string;
export type Hasher<T> = ( a: T ) => string ;


export class Node<T> {

    private data: T;
    private adjacent: Node<T>[];
    private comparator: Comparator<T>;
  
    constructor(data: T, comparator: Comparator<T>) {
        this.data = data;
        this.adjacent = [];
        this.comparator = comparator;
    }

    getData(): T {
        return this.data;
    }
  
    addAdjacent(node: Node<T>): void {
        this.adjacent.push(node);
    }
  
    removeAdjacent(data: T): Node<T> | null {
        const index = this.adjacent.findIndex( node => this.comparator(node.data, data) === 0 );
        if (index === -1) return null;
        return this.adjacent.splice(index, 1)[0];
    }

    removeAllAdjacent(): Node<T>[] | null {
        return this.adjacent.splice(0);
    }

}
  
export class Graph<T> {

    private nodes: Map<HasherResult, Node<T>> = new Map();
    private comparator: Comparator<T>;
    private hasher: Hasher<T>;
  
    constructor(comparator: Comparator<T>, hasher: Hasher<T>) {
        this.comparator = comparator;
        this.hasher = hasher;
    }

    getNode(data: T): Node<T> | undefined {
        const hash: HasherResult = this.hasher(data);
        return this.nodes.get(hash);    
    }
  
    /**
     * Add a new node if it was not added before
     *
     * @param {T} data
     * @returns {Node<T>}
     */
    addNode(data: T): Node<T> {
        let node: Node<T> | undefined = this.getNode(data);
        if (!node) {
            node = new Node(data, this.comparator);
            this.nodes.set(this.hasher(data), node);
        }
        return node;
    }
  
    /**
     * Remove a node, also remove it from other nodes adjacency list
     *
     * @param {T} data
     * @returns {Node<T> | null}
     */
    removeNode(data: T): Node<T> | null {
        const node: Node<T> | undefined = this.getNode(data);
        if (!node) return null;
        node.removeAllAdjacent();
        this.nodes.delete(this.hasher(data));  
        return node;
    }
  
    /**
     * Create an edge between two nodes
     *
     * @param {T} source
     * @param {T} destination
     */
    addEdge(source: T, destination: T): void {
        const sourceNode = this.getNode(source)!;
        const destinationNode = this.getNode(destination)!;  
        sourceNode.addAdjacent(destinationNode);
    }
  
    /**
     * Remove an edge between two nodes
     *
     * @param {T} source
     * @param {T} destination
     */
    removeEdge(source: T, destination: T): void {
        const sourceNode = this.getNode(source)!;
        const destinationNode = this.getNode(destination)!;    
        if (sourceNode && destinationNode) {
            sourceNode.removeAdjacent(destination);
        }
    }
  
    /**
     * Depth-first search
     *
     * @param {T} data
     * @param {Map<T, boolean>} visited
     * @returns
     * /
    private depthFirstSearchAux(node: Node<T>, visited: Map<HasherResult, boolean>): void {
        if (!node) return;
        visited.set(this.hasher(node), true);
    
        console.log(node.data);
    
        node.adjacent.forEach((item) => {
            if (!visited.has(item.data)) {
            this.depthFirstSearchAux(item, visited);
            }
        });
    }
  
    depthFirstSearch() {
      const visited: Map<T, boolean> = new Map();
      this.nodes.forEach((node) => {
        if (!visited.has(node.data)) {
          this.depthFirstSearchAux(node, visited);
        }
      });
    }
  
    /**
     * Breadth-first search
     *
     * @param {T} data
     * @returns
     * /
    private breadthFirstSearchAux(node: Node<T>, visited: Map<T, boolean>): void {
      const queue: Queue<Node<T>> = new Queue();
  
      if (!node) return;
  
      queue.add(node);
      visited.set(node.data, true);
  
      while (!queue.isEmpty()) {
        node = queue.remove();
  
        if (!node) continue;
  
        console.log(node.data);
  
        node.adjacent.forEach((item) => {
          if (!visited.has(item.data)) {
            visited.set(item.data, true);
            queue.add(item);
          }
        });
      }
    }
  
    breadthFirstSearch() {
      const visited: Map<T, boolean> = new Map();
      this.nodes.forEach((node) => {
        if (!visited.has(node.data)) {
          this.breadthFirstSearchAux(node, visited);
        }
      });
    }
    */
  }
  
export function NumberComparator(a: number, b: number) {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
}
  
// const graph = new Graph(NumberComparator);