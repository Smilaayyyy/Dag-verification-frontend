import React, { useRef, useState, useCallback } from 'react';
import ReactFlow, {  Controls, Background, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';
import useStore from './store';
import { InputNode, OutputNode, TextNode, ConditionNode, DataMergeNode, DataFilterNode, ApiCallNode, AudioNode } from './nodes';

const nodeTypes = {
  input: InputNode,
  output: OutputNode,
  text: TextNode,
  condition: ConditionNode,
  merge: DataMergeNode,
  filter: DataFilterNode,
  apicall: ApiCallNode,
  audio: AudioNode,
};

const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const { nodes, edges, getNodeID, addNode, onNodesChange, onEdgesChange, onConnect } = useStore();

  const getInitNodeData = (nodeID, type) => ({ id: nodeID, nodeType: type });

  const onDrop = useCallback((event) => {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
    const type = appData?.nodeType;

    if (!type || !nodeTypes[type]) return;

    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    const nodeID = getNodeID(type);
    const newNode = { id: nodeID, type, position, data: getInitNodeData(nodeID, type) };
    addNode(newNode);
  }, [reactFlowInstance, getNodeID, addNode]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div>
      <div ref={reactFlowWrapper} style={{ width: '100vw', height: '80vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={(instance) => setReactFlowInstance(instance)}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background color="#aaa" gap={16} />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
      {/* Assuming SubmitButton component is rendering a submit button */}
      <SubmitButton nodes={nodes} edges={edges} />
    </div>
  );
};

export default PipelineUI;
