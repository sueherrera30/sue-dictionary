import { useNavigate } from "react-router-dom";

import styles from './styles/savedWords.module.css';
import hearts from '../assets/favs.png';
const SavedWords = () => {
    let navigate = useNavigate();
    return (
        <div className={styles.savedContainer} onClick={() => navigate('/favorites')}>
            <div className={styles.imageContainer}>
                <img src={hearts} alt="main" className={styles.image}/>
            </div>
            <p className={styles.text}>MY FAV WORDS </p>
        </div>
    )
};

export default SavedWords;