import styles from './SelectMenu.module.css';

const SelectMenu = ({ options, onChange }) => {
    function handleSelectChange(e) {
        onChange(e.target.value);
    }
    return (
        <select
            name="employees"
            id="employees"
            className={styles.select}
            onChange={handleSelectChange}
            title="Select an employee"
        >
            <option value="all" className={styles.option}>
                All Employees
            </option>
            {options.map((e) => {
                return (
                    <option key={e} value={e} className={styles.option}>
                        {e}
                    </option>
                );
            })}
        </select>
    );
};

export default SelectMenu;
