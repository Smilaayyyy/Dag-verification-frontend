import React, { useRef, useState, useCallback } from 'react';
import ReactFlow, { ReactFlowProvider, Controls, Background, MiniMap, addEdges } from 'reactflow';
import './styles.css';
import 'reactflow/dist/style.css';
import useStore from './store';
import { InputNode } from './nodes/inputNode';
import LLMNode from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import SubmitButton from './submit';
import { ConditionNode } from './nodes/ConditionNode';
import DataMergeNode from './nodes/DataMergeNode';
import DataFilterNode from './nodes/DataFilterNode';
import ApiCallNode from './nodes/ApiCallNode';

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  condition: ConditionNode,
  merge: DataMergeNode,
  filter: DataFilterNode,
  apicall: ApiCallNode,
};

const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const getNodeID = useStore((state) => state.getNodeID);
  const addNode = useStore((state) => state.addNode);
  const onNodesChange = useStore((state) => state.onNodesChange);
  const onEdgesChange = useStore((state) => state.onEdgesChange);
  const onConnect = useStore((state) => state.onConnect);

  const getInitNodeData = (nodeID, type) => {
    let nodeData = { id: nodeID, nodeType: `${type}` };
    return nodeData;
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData('application/reactflow')) {
        const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
        const type = appData?.nodeType;

        // Check if the dropped element is valid
        if (typeof type === 'undefined' || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);

        // Use nodeTypes object for type check
        if (nodeTypes[type]) {
          // Check if the type exists in nodeTypes
          const newNode = {
            id: nodeID,
            type,
            position,
            data: getInitNodeData(nodeID, type),
          };
          addNode(newNode);
        }
      }
    },
    [reactFlowInstance]
  );

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
      <SubmitButton nodes={nodes} edges={edges} />
    </div>
  );
};

export default PipelineUI;