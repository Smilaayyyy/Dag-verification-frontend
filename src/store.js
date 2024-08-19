import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { applyNodeChanges, addEdge, applyEdgeChanges } from 'reactflow';
const useStore = create(devtools((set) => ({
  nodes: [],
  edges: [],
  getNodeID: (type) => `node-${type}-${Date.now()}`,
  addNode: (node) => set((state) => ({ nodes: [...state.nodes, node] })),
  onNodesChange: (changes) => set((state) => ({
    nodes: applyNodeChanges(changes, state.nodes),
  })),
  onEdgesChange: (changes) => set((state) => ({
    edges: applyEdgeChanges(changes, state.edges),
  })),
  onConnect: (params) => set((state) => ({
    edges: addEdge(params, state.edges),
  })),
})));

export default useStore;
