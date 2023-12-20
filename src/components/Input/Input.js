import './input.css';

const Input = ({ onChange }) => {
    return (
        <>
            <input type="file" id="file" onChange={onChange} />
            <label htmlFor="file">Upload Here</label>
        </>
    );
};

export default Input;
