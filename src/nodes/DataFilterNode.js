import BaseNode from './BaseNode';
import { useEdges, Position} from 'reactflow'; // Import for handling connected edges
import { useState, useEffect } from 'react';

const DataFilterNode = ({ id, data }) => {
  const edges  = useEdges();
  const [filterCriteria, setFilterCriteria] = useState(data?.filter || '');
  const [filteredData, setFilteredData] = useState([]); // Store filtered data

  const getInputData = () => {
    const connectedInput = edges.find((edge) => edge.target === id && edge.type === 'target'); // Find connected input edge
    return data?.[connectedInput?.source] || {}; // Extract data from connected source
  };

  const handleFilterChange = (e) => {
    setFilterCriteria(e.target.value);
  };

  useEffect(() => {
    const inputData = getInputData();
    const filtered = Object.entries(inputData).filter(([key, value]) => {
      // Implement your filtering logic here based on filterCriteria and data values
      return key.includes(filterCriteria) || value.toString().includes(filterCriteria); // Example: filter by key or value containing the criteria
    });
    setFilteredData(Object.fromEntries(filtered)); // Update filtered data
  }, [filterCriteria, edges]); // Re-run on filter change or edge changes

  // Implement UI logic for displaying or manipulating filtered data here

  return (
    <BaseNode
      id={id}
      data={data}
      type="filter"
      nameLabel="Filter"
      customContent={() => (
        <div>
          <label htmlFor={`${id}-filter`}>Criteria:</label>
          <input id={`${id}-filter`} type="text" value={filterCriteria} onChange={handleFilterChange} />
        </div>
      )}
      handles={[
        { type: 'target', position: Position.Left, id: 'input' }, // One target for incoming data
        { type: 'source', position: Position.Right, id: 'output' }, // One source for filtered data
      ]}
    />
  );
};

export default DataFilterNode;
