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
            {options.map((option) => {
                return (
                    <option
                        key={option}
                        value={option}
                        className={styles.option}
                    >
                        {option}
                    </option>
                );
            })}
        </select>
    );
};

export default SelectMenu;
