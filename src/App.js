import { useState } from 'react';
import styles from './App.module.css';
import { readFile } from './utils/fileUploadUtils';
import Table from './components/Table/Table';
import Input from './components/Input/Input';
import MiniTable from './components/MiniTable/MiniTable';
import SelectMenu from './components/SelectMenu/SelectMenu';
import { handleFilter } from './utils/filterUtil';

function App() {
    const [pairs, setPairs] = useState(null);
    const [filterred, setFilterred] = useState(pairs);
    const [options, setOptions] = useState([]);
    const [active, setActive] = useState(null);
    const [commonProjects, setcommonProjects] = useState([]);
    const [activePair, setActivePair] = useState([]);

    function handleFileUpload(e) {
        readFile(e, setPairs, setOptions, setFilterred);
    }

    function handleSelectChange(empId) {
        let filterBy = empId;
        const remainingPairs = handleFilter(pairs, filterBy);
        setFilterred(remainingPairs);
        setActive(false);
    }

    function rowExpand(commonProjects, pair) {
        setActive(true);
        setcommonProjects(commonProjects);
        setActivePair(pair);
    }
    function handleClose() {
        setActive(false);
    }

    return (
        <div className={styles.container}>
            <div className={styles.tableAndSelectContainer}>
                <Input onChange={handleFileUpload} />
                {pairs ? (
                    <SelectMenu
                        options={options}
                        onChange={handleSelectChange}
                    />
                ) : null}
            </div>
            {pairs ? (
                <Table data={filterred} onClick={rowExpand} />
            ) : (
                <h1>No Data</h1>
            )}
            {active ? (
                <MiniTable
                    commonProjects={commonProjects}
                    activePair={activePair}
                    onClose={handleClose}
                />
            ) : null}
        </div>
    );
}

export default App;
