import styles from './Input.module.css';

const Input = ({ onChange }) => {
    return (
        <>
            <input
                type="file"
                id="file"
                className={styles.input}
                onChange={onChange}
            />
            <label htmlFor="file" className={styles.label}>
                Upload Here
            </label>
        </>
    );
};

export default Input;
