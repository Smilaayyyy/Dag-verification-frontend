import React, { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import BaseNode from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '');
  const [handles, setHandles] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 200, height: 80 });
  const textAreaRef = useRef(null);

  useEffect(() => {
    // Function to handle variable detection and handle creation
    const handleVariables = (text) => {
      const regex = /{{\s*([\w]+)\s*}}/g;
      const matches = [];
      let match;
      while ((match = regex.exec(text)) !== null) {
        matches.push(match[1]);
      }
      return matches;
    };

    // Update handles based on detected variables
    const variables = handleVariables(currText);
    const newHandles = variables.map((variable, index) => ({
      type: 'target',
      position: Position.Left,
      id: `${id}-${variable}`,
      style: { top: `${(index + 1) * 20}%` },
    }));

    setHandles(newHandles);
  }, [currText, id]);

  useEffect(() => {
    // Update dimensions based on text area size
    if (textAreaRef.current) {
      const { scrollWidth, scrollHeight } = textAreaRef.current;
      setDimensions({
        width: Math.max(200, scrollWidth + 20),
        height: Math.max(80, scrollHeight + 20),
      });
    }
  }, [currText]);

  const handleTextChange = (e) => setCurrText(e.target.value);

  // Define text input field
  const fields = [
    {
      label: 'Text',
      type: 'textarea',
      value: currText,
      onChange: handleTextChange,
      ref: textAreaRef,
      style: { width: '100%', height: '100%' },
    },
  ];

  return (
    <BaseNode
      id={id}
      type="Text"
      fields={fields}
      handles={[
        ...handles,
        { type: 'source', position: Position.Right, id: 'output' }
      ]}
      dimensions={dimensions}
    />
  );
};

