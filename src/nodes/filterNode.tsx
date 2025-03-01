import { Handle, Position, useNodeId, NodeToolbar } from "@xyflow/react";
import { Info, Maximize, Filter } from "lucide-react";
import { sql } from "@codemirror/lang-sql";
import CodeMirror from "@uiw/react-codemirror";
import { useState } from "react";

const FilterNode = ({ data, selected }: any) => {
    const nodeId = useNodeId();
    const [showFilter, setShowFilter] = useState();

    return (
        <div>
            <div
                className={`relative flex items-center justify-between border rounded-lg px-4 py-2 shadow-lg
                    ${selected ? "border-[#70D6FF] ring-2 ring-[#70D6FF] bg-neutral-800" : "border-neutral-700 bg-neutral-900"}
                    hover:border-[#70D6FF] transition-all cursor-pointer`
                }
            >
                {selected && (
                    <NodeToolbar position={Position.Top}>
                        <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded-md shadow-md">
                            {nodeId}
                        </div>
                    </NodeToolbar>
                )}
                <div className="flex items-center gap-2 text-sm font-medium text-white">
                    <Filter onClick={() => setShowFilter(!showFilter)} className="w-4 h-4 text-gray-300 cursor-pointer hover:text-white"/>
                    <Info className="w-4 h-4 text-gray-300 cursor-pointer hover:text-white"/>
                    <span className="text-gray-300">Filter: Cowboy hats</span>
                    <Maximize className="w-4 h-4 text-gray-300 cursor-pointer hover:text-white"/>
                </div>

                <Handle
                    type="target"
                    position={Position.Left}
                    id="facts-input"
                    style={{
                        height: "32px",
                        borderRadius: "0px",
                        background: "linear-gradient(to bottom, #FF9770, #FF70A6)"
                    }}
                />
                <Handle
                    type="source"
                    position={Position.Right}
                    id="facts-output"
                    style={{
                        height: "32px",
                        borderRadius: "0px",
                        background: "linear-gradient(to bottom, #FF9770, #FF70A6)"
                    }}
                />
            </div>

            {showFilter && <CodeMirror
                value={`SELECT * FROM Sales
WHERE {{category_filter}}
GROUP BY week;`}
                extensions={[sql()]}
                theme="dark"
                style={{
                    fontSize: "14px",
                    backgroundColor: "#282c34",
                    borderRadius: "6px",
                }}
            />}
            <input
                type="text"
                placeholder="Category Filter"
                className="bg-neutral-800 mt-1 text-white px-3 py-2 rounded-lg border border-neutral-600 focus:ring-2 focus:ring-[#70D6FF] w-full"
            />
        </div>
    );
}

export default FilterNode;
