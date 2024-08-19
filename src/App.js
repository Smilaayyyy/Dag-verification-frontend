import { PipelineToolbar } from './toolbar';
import  PipelineUI  from './ui';
import  SubmitButton  from './submit';

const nodes = [/* Your nodes data */];
const edges = [/* Your edges data */];

function App() {
  return (
    <div>
      <PipelineToolbar />

      
      <PipelineUI />
    </div>
  );
}

export default App;
