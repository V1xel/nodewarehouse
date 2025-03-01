import { useCallback } from "react";
import { ReactFlow, NodeChange, applyNodeChanges, EdgeChange, applyEdgeChanges, Connection } from "@xyflow/react";
import CodeMirror from "@uiw/react-codemirror";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useFlowStore } from "./store";
import {yaml} from "@codemirror/lang-yaml";
import ColoredEdge from "./coloredEdge.tsx";
import SourceNode from "./nodes/sourceNode.tsx";
import SaveNode from "./nodes/saveNode.tsx";
import FilterNode from "./nodes/filterNode.tsx";

export default function App() {
    const { nodes, edges, setNodes, setEdges, schema, setSchema } = useFlowStore();
    const onNodesChange = useCallback(
        (changes: NodeChange[]) => {
            setNodes((nds) => applyNodeChanges(changes, nds));
        },
        [setNodes]
    );
    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => {
            setEdges((eds) => applyEdgeChanges(changes, eds));
        },
        [setEdges]
    );
    const onConnect = useCallback(
        (connection: Connection) => {
            setEdges((eds) => [...eds, { type:"custom", id: `${connection.source}-${connection.target}`, ...connection }]);
        },
        [setEdges]
    );

    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <PanelGroup autoSaveId="example" direction="horizontal">
                <Panel>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        nodeTypes={{sourceNode: SourceNode, saveNode: SaveNode, filterNode: FilterNode}}
                        edgeTypes={{custom:ColoredEdge}}
                        onConnect={onConnect} // ✅ Enables connecting nodes
                        colorMode="dark"
                    />
                </Panel>
                <PanelResizeHandle />
                <Panel>
                    <CodeMirror
                        value={schema}
                        onChange={(value) => setSchema(value)}
                        extensions={[yaml()]} // Syntax highlighting for YAML
                        theme="dark"
                        basicSetup={{ lineNumbers: true }} // ✅ Enables line numbers
                        style={{
                            width: "100%",
                            height: "100vh",
                            fontSize: "14px",
                            backgroundColor: "#282c34",
                        }}
                    />
                </Panel>
            </PanelGroup>
        </div>
    );
}
