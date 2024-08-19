import React, { useState } from 'react';
import BaseNode from './BaseNode';
import { Handle, Position } from 'reactflow';

export const ConditionNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'true');

  const handleConditionChange = (e) => {
    setCondition(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={{ name: condition }}
      type="Condition"
      nameLabel="Condition"
      handleNameChange={handleConditionChange}
      handles={[
        { type: 'source', position: Position.Right, id: 'output' },
        { type: 'target', position: Position.Left, id: 'input' },
      ]}
      customContent={
        <label>
          Condition:
          <input 
            type="text" 
            value={condition} 
            onChange={handleConditionChange} 
          />
        </label>
      }
    />
  );
};

export default ConditionNode;
