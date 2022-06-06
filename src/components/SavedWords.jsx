import styles from './styles/savedWords.module.css';
import hearts from '../assets/favs.png';
const SavedWords = () => {
    console.log('waiting for logic of saved things');
    return (
        <div className={styles.savedContainer}>
            <div className={styles.imageContainer}>
                <img src={hearts} alt="main" className={styles.image}/>
            </div>
            <p className={styles.text}>MY FAV WORDS </p>
        </div>
    )
};

export default SavedWords;