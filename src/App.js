import { useState } from 'react';
import './App.css';
import { readFile } from './utils/fileUploadUtils';
import Table from './components/Table/Table';
import Input from './components/Input/Input';
import MiniTable from './components/MiniTable/MiniTable';

function App() {
    const [pairs, setPairs] = useState(null);
    const [active, setActive] = useState({});

    function rowExpand(info) {
        setActive({ isActive: true, info: info });
    }
    function handleClose() {
        setActive({});
    }

    function handleFileUpload(e) {
        readFile(e, setPairs);
    }

    return (
        <div className="App">
            <Input onChange={handleFileUpload} />
            {pairs ? (
                <Table data={pairs} onClick={rowExpand} />
            ) : (
                <p>No Data</p>
            )}
            {active.isActive ? (
                <MiniTable info={active.info} onClose={handleClose} />
            ) : (
                <></>
            )}
        </div>
    );
}

export default App;
