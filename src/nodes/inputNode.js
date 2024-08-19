// InputNode.js
import { useState } from 'react';
import BaseNode from './BaseNode';
import { Handle, Position } from 'reactflow';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => setCurrName(e.target.value);
  const handleTypeChange = (e) => setInputType(e.target.value);

  const fields = [
    { 
      label: 'Name', 
      type: 'text', 
      value: currName, 
      onChange: handleNameChange 
    },
    { 
      label: 'Type', 
      type: 'select', 
      value: inputType, 
      onChange: handleTypeChange, 
      options: [
        { value: 'Text', label: 'Text' },
        { value: 'File', label: 'File' }
      ] 
    }
  ];

  return (
    <BaseNode
      id={id}
      type="Input"
      fields={fields}
      handles={[
        { type: 'source', position: Position.Right, id: 'value' }
      ]}
    />
  );
};
