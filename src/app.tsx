import { useCallback } from "react";
import { ReactFlow, NodeChange, applyNodeChanges, EdgeChange, applyEdgeChanges } from "@xyflow/react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useFlowStore } from "./store";

export default function App() {
    const {nodes, edges, setNodes, setEdges, schema, setSchema} = useFlowStore();

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

    return (
        <div style={{width: "100vw", height: "100vh"}}>
            <PanelGroup autoSaveId="example" direction="horizontal">
                <Panel>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        colorMode="dark"
                    ></ReactFlow>
                </Panel>
                <PanelResizeHandle/>
                <Panel>
                    <CodeEditor
                        data-color-mode="dark"
                        value={schema}
                        onChange={(e) => setSchema(e.target.value)}
                        language="sql"
                        placeholder="Please enter SQL code."
                        style={{
                            width: "100vw", height: "100vh",
                            backgroundColor: "#101828",
                            fontFamily:
                                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                        }}
                    />
                </Panel>
            </PanelGroup>
        </div>
    );
}
