import { create } from "zustand";
import { Node, Edge } from "@xyflow/react";
import * as yaml from "js-yaml";

const yamlSchema = `
nodes:
  - id: "1"
    position: { x: 100, y: 100 }
    type: sourceNode
    data:
        dataType: Dimension
        name: Product
        source: CSV
        saveToDatabase: true
  - id: "2"
    position: { x: 100, y: 300 }
    type: sourceNode
    data:
        dataType: Fact
        name: Sales
        source: CSV
        saveToDatabase: false
  - id: "3"
    position: { x: 300, y: 500 }
    type: saveNode
    data:
        dataType: Fact
        name: Sales
        source: CSV
        saveToDatabase: false
  - id: "4"
    position: { x: 500, y: 700 }
    type: filterNode
    data:
        dataType: Fact
        name: Sales
        source: CSV
        saveToDatabase: false
edges: []
`;

interface FlowState {
    schema: string;
    nodes: Node[];
    edges: Edge[];
    setNodes: (nodes: Node[] | ((nds: Node[]) => Node[])) => void;
    setEdges: (edges: Edge[] | ((eds: Edge[]) => Edge[])) => void;
    setSchema: (newSchema: string) => void;
    updateSchema: () => void;
}

const generateYaml = (nodes: Node[], edges: Edge[]): string => {
    return yaml.dump({
        nodes: nodes.map(n => ({
            id: n.id,
            type: n.type,
            data: n.data,
        })),
        edges,
    });
};

const mergeNodes = (oldNodes: Node[], newNodes: Partial<Node>[]): Node[] => {
    const newIds = new Set(newNodes.map(n => n.id)); // Track nodes in new YAML

    return newNodes.map(n => {
        const existingNode = oldNodes.find(node => node.id === n.id);
        return {
            ...existingNode, // Preserve existing fields if available
            ...n, // Apply new updates
            position: existingNode?.position || { x: 0, y: 0 }, // Keep position if it existed before
            data: { ...existingNode?.data, ...n.data }, // Merge data fields
        };
    }).filter(node => newIds.has(node.id)); // Only keep nodes in new YAML
};

const parseYaml = (schema: string, oldNodes: Node[], oldEdges: Edge[]): { nodes: Node[]; edges: Edge[] } => {
    try {
        const parsed = yaml.load(schema) as { nodes?: any[]; edges?: any[] };
        return {
            nodes: mergeNodes(oldNodes, parsed.nodes || []), // Merge only existing nodes
            edges: parsed.edges || [], // Fully replace edges
        };
    } catch (error) {
        console.error("Invalid YAML format:", error);
        return { nodes: oldNodes, edges: oldEdges };
    }
};

export const useFlowStore = create<FlowState>((set, get) => {
    const { nodes, edges } = parseYaml(yamlSchema, [], []);

    return {
        schema: yamlSchema,
        nodes,
        edges,

        setNodes: (nodes) => {
            set((state) => {
                const updatedNodes = typeof nodes === "function" ? nodes(state.nodes) : nodes;
                return { nodes: updatedNodes, schema: generateYaml(updatedNodes, state.edges) };
            });
        },

        setEdges: (edges) => {
            set((state) => {
                const updatedEdges = typeof edges === "function" ? edges(state.edges) : edges;
                return { edges: updatedEdges, schema: generateYaml(state.nodes, updatedEdges) };
            });
        },

        setSchema: (newSchema) => {
            set((state) => {
                const { nodes, edges } = parseYaml(newSchema, state.nodes, state.edges);
                return { schema: newSchema, nodes, edges };
            });
        },

        updateSchema: () => {
            set((state) => ({
                schema: generateYaml(state.nodes, state.edges),
            }));
        },
    };
});
