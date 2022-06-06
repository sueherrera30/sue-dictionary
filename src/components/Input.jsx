import styles from './styles/input.module.css';

const Input = () => {
    console.log("waiting for logic");
    return (
        <p>
            <span className={styles.input}>
                <input type="text" placeholder="write a word..." />
                <span></span> 
            </span>
        </p>
    )
}

export default Input;