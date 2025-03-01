import { BaseEdge, EdgeProps, getBezierPath, useReactFlow } from "@xyflow/react";

// ✅ Function to get colors based on node types
const getNodeColor = (nodeType: string) => {
    const colors = {
        Dimension: "#FF9770", // Light Blue
        Fact: "#FF70A6", // Pink
        Default: "#FFD670", // Yellow
    };
    return colors[nodeType] || colors.Default;
};

// ✅ Custom Edge Component with Dynamic Gradient
const ColoredEdge = ({ id, sourceX, sourceY, targetX, targetY, source, target, sourcePosition, targetPosition }: EdgeProps) => {
    const { getNode } = useReactFlow(); // Get node data
    const sourceNode = getNode(source);
    const targetNode = getNode(target);

    // ✅ Get colors for source & target nodes
    const sourceColor = getNodeColor(sourceNode?.data?.dataType);
    const targetColor = getNodeColor(targetNode?.data?.dataType);

    // ✅ Create smooth Bezier curve
    const curvature = 0.3;
    const [edgePath] = getBezierPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition,
        curvature,
    });

    return (
        <g>
            {/* ✅ Define a dynamic gradient for this edge */}
            <defs>
                <linearGradient id={`gradient-${id}`} gradientUnits="userSpaceOnUse" x1={sourceX} x2={targetX}>
                    <stop offset="0%" stopColor={sourceColor} stopOpacity={1} />
                    <stop offset="100%" stopColor={targetColor} stopOpacity={1} />
                </linearGradient>
            </defs>

            {/* ✅ Draw the custom edge with gradient */}
            <path
                d={edgePath}
                stroke={`url(#gradient-${id})`}
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
            />
        </g>
    );
};

export default ColoredEdge;
