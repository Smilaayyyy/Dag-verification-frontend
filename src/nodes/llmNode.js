import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';

const LLMNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '');

  const handleTextChange = (e) => setCurrText(e.target.value);

  return (
    <div style={{ width: 200, height: 80, border: '1px solid black', padding: '10px' }}>
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-system`}
        style={{ top: `${100 / 3}%` }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-prompt`}
        style={{ top: `${200 / 3}%` }}
      />
      <div>
        <span> This is LLM Node</span>
      </div>
      <textarea
        value={currText}
        onChange={handleTextChange}
        style={{ width: '100%', height: '40px' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-response`}
      />
    </div>
  );
};

export default LLMNode; // Export LLMNode as default
