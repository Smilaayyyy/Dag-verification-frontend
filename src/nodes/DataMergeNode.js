import BaseNode from './BaseNode';
import { useEdges, Position } from 'reactflow'; // Import for handling connected edges

const DataMergeNode = ({ id, data }) => {
  const edges  = useEdges(); // Get connected edges using useEdges hook

  const getInputData = () => {
    const connectedInputs = edges.filter((edge) => edge.target === id && edge.type === 'target'); // Filter incoming edges
    return connectedInputs.reduce((acc, edge) => {
      const sourceData = data?.[edge.source] || {}; // Extract data from connected sources
      return { ...acc, ...sourceData }; // Merge data from all sources into a single dataset
    }, {});
  };

  const mergedData = getInputData(); // Merge data from connected inputs

  // Implement UI logic for displaying or manipulating merged data here

  return (
    <BaseNode
      id={id}
      data={data}
      type="merge"
      nameLabel="Merge"
      handles={[
        { type: 'target', position: Position.Left, id: 'input1' },
        { type: 'target', position: Position.Top, id: 'input2' }, // Add more targets as needed
        { type: 'source', position: Position.Right, id: 'output' },
      ]}
    />
  );
};

export default DataMergeNode;
