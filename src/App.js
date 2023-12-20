import { useState } from 'react';
import styles from './App.module.css';
import { readFile } from './utils/fileUploadUtils';
import Table from './components/Table/Table';
import Input from './components/Input/Input';
import MiniTable from './components/MiniTable/MiniTable';
import SelectMenu from './components/selectMenu/selectMenu';
import { handleFilter } from './utils/filterUtil';

function App() {
    const [pairs, setPairs] = useState(null);
    const [filterred, setFilterred] = useState(pairs);
    const [options, setOptions] = useState([]);
    const [active, setActive] = useState({});

    function handleFileUpload(e) {
        readFile(e, setPairs, setOptions, setFilterred);
    }

    function handleSelectChange(empId) {
        let filterBy = empId;
        const remainingPairs = handleFilter(pairs, filterBy);
        setFilterred(remainingPairs);
        setActive({});
    }

    function rowExpand(info) {
        setActive({ isActive: true, info });
    }
    function handleClose() {
        setActive({});
    }

    return (
        <div className={styles.App}>
            <div className={styles.tableAndSelectContainer}>
                <Input onChange={handleFileUpload} />
                {pairs ? (
                    <SelectMenu
                        options={options}
                        onChange={handleSelectChange}
                    />
                ) : (
                    <></>
                )}
            </div>
            {pairs ? (
                <Table data={filterred} onClick={rowExpand} />
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
