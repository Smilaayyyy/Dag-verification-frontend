import { useState } from 'react';
import BaseNode from './BaseNode';
import { Handle, Position } from 'reactflow';

export const OutputNode = ({ id, data }) => {
  const [outputName, setOutputName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));

  const handleNameChange = (e) => {
    setOutputName(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      type="Output"
      data={{ name: outputName }}
      nameLabel="Output Name"
      handleNameChange={handleNameChange}
      handleTypeChange={() => {}}
      handleTypeOptions={[]}
      handles={[
        { type: 'target', position: Position.Left, id: 'input' }
      ]}
    />
  );
};
