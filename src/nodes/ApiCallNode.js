import BaseNode from './BaseNode';
import { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';

const ApiCallNode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || 'https://jsonplaceholder.typicode.com/posts/1');
  const [headers, setHeaders] = useState(data?.headers ? JSON.stringify(data.headers, null, 2) : '{}');
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleHeadersChange = (e) => {
    setHeaders(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const parsedHeaders = JSON.parse(headers);
        const response = await fetch(url, { headers: parsedHeaders });

        if (!response.ok) {
          throw new Error(`API call failed with status: ${response.status}`);
        }

        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          setApiData(data);
          setError(null);
        } else {
          const text = await response.text();
          throw new Error(`Response is not JSON. Response text: ${text}`);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
    };

    fetchData();
  }, [url, headers]);

  return (
    <BaseNode
      id={id}
      data={data}
      type="api-call"
      nameLabel="API URL"
      customContent={() => (
        <div>
          <label htmlFor={`${id}-url`}>URL:</label>
          <input id={`${id}-url`} type="text" value={url} onChange={handleUrlChange} />
          <label htmlFor={`${id}-headers`}>Headers (JSON):</label>
          <textarea id={`${id}-headers`} value={headers} onChange={handleHeadersChange} />
          {error && <div className="error-message">{error}</div>}
          {apiData && (
            <div>
              <h3>API Data:</h3>
              <pre>{JSON.stringify(apiData, null, 2)}</pre>
            </div>
          )}
        </div>
      )}
      handles={[
        { type: 'source', position: Position.Right, id: 'output' },
        { type: 'target', position: Position.Left, id: 'input' },
      ]}
    />
  );
};

export default ApiCallNode;
