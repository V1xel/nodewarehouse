import { Handle, Position, useNodeId, NodeToolbar } from "@xyflow/react";
import { Settings, Info, Maximize } from "lucide-react"; // ✅ Import icons

const FilterNode = ({ data, selected }: any) => {
    const nodeId = useNodeId();

    const inputColors: Record<string, string> = {
        Dimensions: "#FF9770", // Orange
        Facts: "#FF70A6", // Pink
    };

    return (
        <div
            className={`relative flex items-center border rounded-lg px-4 py-2 shadow-lg min-w-[200px]
                ${selected ? "border-[#70D6FF] ring-2 ring-[#70D6FF]" : "border-neutral-700"}
                hover:border-[#70D6FF] transition-all cursor-pointer bg-transparent`
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

            {/* ✅ Left-Side Handles + Labels */}
            <div className="absolute left-[-20px] flex flex-col gap-2">
                {/* Dimensions Handle */}
                <div className="relative flex items-center gap-2">
                    <Handle
                        type="target"
                        position={Position.Left}
                        id="dimensions-input"
                        className="absolute"
                        style={{
                            width: "8px",
                            height: "28px", // ✅ Wider and aligned
                            borderRadius: "4px",
                            backgroundColor: inputColors.Dimensions // ✅ Orange
                        }}
                    />
                    <span className="ml-4 text-gray-300 text-sm">Dimensions</span>
                </div>

                {/* Facts Handle */}
                <div className="relative flex items-center gap-2">
                    <Handle
                        type="target"
                        position={Position.Left}
                        id="facts-input"
                        className="absolute"
                        style={{
                            width: "8px",
                            height: "28px", // ✅ Wider and aligned
                            borderRadius: "4px",
                            backgroundColor: inputColors.Facts // ✅ Pink
                        }}
                    />
                    <span className="ml-4 text-gray-300 text-sm">Facts</span>
                </div>
            </div>

            {/* ✅ Node Icons & Label */}
            <div className="flex items-center flex-1 gap-2 justify-center">
                <Settings className="w-4 h-4 text-gray-300 cursor-pointer hover:text-white" />
                <Info className="w-4 h-4 text-gray-300 cursor-pointer hover:text-white" />
                <span className="text-white font-medium">Filter</span>
            </div>

            {/* ✅ Right-Side Icon */}
            <Maximize className="w-4 h-4 text-gray-300 cursor-pointer hover:text-white" />
        </div>
    );
};

export default FilterNode;
