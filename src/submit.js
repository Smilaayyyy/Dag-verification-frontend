import React from 'react';
import useStore from './store';

const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const handleSubmit = async () => {
    const pipeline = { nodes, edges };

    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pipeline),
      });
      const data = await response.json();
      alert(`Nodes: ${data.num_nodes}, Edges: ${data.num_edges}, Is DAG: ${data.is_dag}`);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while parsing the pipeline.');
    }
  };

  return (
    <button onClick={handleSubmit}>Submit</button>
  );
};

export default SubmitButton;
