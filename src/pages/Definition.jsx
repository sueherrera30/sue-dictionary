import React from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { BsBookmarkHeart as BookmarkHeart } from "react-icons/bs";
import { MdOutlineArrowBack as Back } from "react-icons/md";
import { GiSpeaker as Speaker } from "react-icons/gi";

import DefinitionBox from '../components/DefinitionBox';
import sharedStyles from './styles/home.module.css';
import styles from './styles/definition.module.css';

const Definition = () => {
    const { word } = useParams();
    let navigate = useNavigate();
    return (
        <section className={sharedStyles.mainContainer}>
            <div className={`${sharedStyles.container} ${styles.container}`}>
                <div className={styles.iconsContainer}>
                    <Back  className={styles.icons} onClick={() => navigate('/')} />
                    <BookmarkHeart className={styles.icons} onClick={() => navigate('/favorites')}/>
                </div>
                <div className={styles.wordContainer}>
                    <p className={styles.wordTitle}>{word}</p>
                    <Speaker className={`${styles.icons} ${styles.soundIcon}`} />
                </div>
                <div className={styles.definitionsContainer}>
                    <DefinitionBox content="hola aqui una prueba detodo lo que recibia" />
                    <hr className={styles.divider} />
                </div>
            </div>
        </section>
    )
};

export default Definition;
