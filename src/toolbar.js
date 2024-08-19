import { DraggableNode } from './draggableNode'; // Assuming correct path

export const PipelineToolbar = () => {
  return (
    <div style={{ padding: '10px' }}>
      <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        <DraggableNode type="customInput" label="Input" />
        <DraggableNode type="llm" label="LLM" />
        <DraggableNode type="customOutput" label="Output" />
        <DraggableNode type="text" label="Text" />
        <DraggableNode type="condition" label="Condition" />
        <DraggableNode type="filter" label="DataFilter" />
        <DraggableNode type="apicall" label="API Call" />
        <DraggableNode type="merge" label="Data Merge" />
        <DraggableNode type="Calculation" label="Calculation" />
      </div>
    </div>
  );
};
