import React from "react";
import { useNavigate } from 'react-router-dom';
import { MdOutlineArrowBack as Back } from "react-icons/md";

import hearts from '../assets/favs.png';
import thinking from '../assets/thinking.png'
import sharedStyles from './styles/home.module.css';
import styles from './styles/favorites.module.css';
const Favorites = () => {
    let navigate = useNavigate();
    return (
        <section className={sharedStyles.mainContainer}>
            <div className={`${sharedStyles.container} ${styles.container}`}>
                <header className={styles.header}>
                    <Back  className={styles.icons} onClick={() => navigate('/')} />
                    <div className={styles.imageContainer} >
                        <img alt="decoration" src={thinking} className={styles.image} />
                        <img src={hearts} alt="hearts" className={styles.hearts}/>
                    </div>
                    <h2 className={styles.title}>MY FAVORITES WORDS</h2>
                </header>
                <div className={styles.wordsContainer} >
                    <div className={styles.word} >fvoritos</div>
                </div>
            </div>
        </section>
    )
};

export default Favorites;
