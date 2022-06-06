import styles from './styles/input.module.css';
import book from '../assets/book.png';
const Input = () => {
    console.log("waiting for logic");
    return (
        <div className={styles.mainContainer}>
            <div className={styles.imageContainer}>
                <img src={book} alt="main" className={styles.image}/>
            </div>
            <p>
                <span className={styles.input}>
                    <input type="text" placeholder="write a word..." />
                    <span></span> 
                </span>
            </p>
        </div>
    )
}

export default Input;