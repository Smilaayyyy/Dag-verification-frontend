import React from 'react';
import { Handle } from 'reactflow';

const BaseNode = ({
  id,
  type,
  data = {},
  nameLabel,
  handleNameChange,
  handleTypeChange,
  handleTypeOptions = [],
  handles = [],
  dimensions = { width: 200, height: 80 }
}) => {
  return (
    <div style={{ width: dimensions.width, height: dimensions.height, border: '1px solid black' }}>
      <div>{type} Node</div>
      <div>
        <label>{nameLabel}:</label>
        <input type="text" value={data.name} onChange={handleNameChange} />
      </div>
      <div>
      <label>
          Type:
          <select value={type.name} onChange={handleTypeChange}>
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
      {handles.map(handle => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={handle.id}
        />
      ))}
    </div>
  );
};

export default BaseNode;
