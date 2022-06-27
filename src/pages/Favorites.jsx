import React, { Fragment } from "react";
import { useNavigate } from 'react-router-dom';
import { MdOutlineArrowBack as Back } from "react-icons/md";
import { IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import hearts from '../assets/favs.png';
import thinking from '../assets/thinking.png'
import sharedStyles from './styles/home.module.css';
import styles from './styles/favorites.module.css';
const Favorites = ({ favorites, setFavorites }) => {
    let navigate = useNavigate();

    const goToDefinition = (word) => {
        navigate(`/definition/${word}`)
    };

    const deleteWord = (word) => {
        const filteredFavs = favorites.filter(item => item !== word);
        setFavorites(filteredFavs);
    }

    return (
        <section className={sharedStyles.mainContainer}>
            <div className={`${sharedStyles.container} ${styles.container}`}>
                <header className={styles.header}>
                    <Back data-testid="back-button" className={styles.icons} onClick={() => navigate('/')} />
                    <div className={styles.imageContainer} >
                        <img alt="decoration" src={thinking} className={styles.image} />
                        <img src={hearts} alt="hearts" className={styles.hearts}/>
                    </div>
                    <h2 className={styles.title}>MY FAVORITES WORDS</h2>
                </header>
                <div className={styles.wordsContainer} >
                    {
                        favorites.length !== 0 ?
                        favorites.map((favWord, idx) => (
                            <Fragment key={`${favWord}-${idx}`}>
                                <div data-testid="word-saved" onClick={() => goToDefinition(favWord)} className={styles.word}>
                                    {favWord}
                                </div>
                                 <IconButton data-testid="delete-button" onClick={() => deleteWord(favWord)}><ClearIcon className={styles.DeleteIcon} /></IconButton>
                            </Fragment>
                        )) : <p  className={styles.message}>there are no favorites words saved, go ahead!</p>
                    }
                </div>
            </div>
        </section>
    )
};

export default Favorites;
