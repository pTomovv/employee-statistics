import { useState } from 'react';
import './App.css';
import { readFile } from './utils/fileUploadUtils';
import Table from './components/Table';
import Input from './components/Input/Input';

function App() {
    const [pairs, setPairs] = useState(null);

    function handleFileUpload(e) {
        readFile(e, setPairs);
    }

    return (
        <div className="App">
            <div className="input-wrapper">
                <Input onChange={handleFileUpload} />
            </div>
            <div className="table-wrapper">
                {pairs ? <Table /> : <p>No Data</p>}
            </div>
        </div>
    );
}

export default App;
