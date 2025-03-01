import { Handle, Position, useNodeId, NodeToolbar } from "@xyflow/react";
import { Maximize, Info, Settings } from "lucide-react"; // ✅ Import icons

const SaveNode = ({ data, selected }: any) => {
    const nodeId = useNodeId();

    // ✅ Define colors for different data types
    const dataTypeColors: Record<string, string> = {
        ["Dimension"]: "#FF9770",
        ["Fact"]: "#FF70A6"
    };

    // ✅ Get the color for the current dataType, fallback to default
    const typeColor = dataTypeColors[data.dataType] || "#E9FF70"; // Default to Lime if not found

    return (
        <div
            className={`relative flex items-center justify-between border rounded-lg px-4 py-2 shadow-lg
                ${selected ? "border-[#70D6FF] ring-2 ring-[#70D6FF] bg-neutral-800" : "border-neutral-700 bg-neutral-900"}
                hover:border-[#70D6FF] transition-all cursor-pointer`
            }
        >
            {/* Toolbar (Shows when selected) */}
            {selected && (
                <NodeToolbar position={Position.Top}>
                    <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded-md shadow-md">
                        {nodeId}
                    </div>
                </NodeToolbar>
            )}

            {/* Node Content with Icons */}
            <div className="flex items-center gap-2 text-sm font-medium text-white">
                <Settings className="w-4 h-4 text-gray-300 cursor-pointer hover:text-white" />
                <Info className="w-4 h-4 text-gray-300 cursor-pointer hover:text-white" />
                <span className="text-gray-300">{data.dataType}:</span>
                <span className="font-semibold" style={{ color: typeColor }}>{data.name}</span>
            </div>

            <Handle
                type="target"
                position={Position.Left}
                id="left"
                className="w-2"
                style={{
                    borderRadius: "0px",
                    height: "15px",
                    backgroundColor: typeColor // ✅ Handle color matches `dataType`
                }}
            />
        </div>
    );
};

export default SaveNode;
