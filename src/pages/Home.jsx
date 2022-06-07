import React, { useState } from "react";

import Input from '../components/Input';
import SavedWords from '../components/SavedWords';
import styles from './styles/home.module.css';
import main from '../assets/main.png'

const Home = () => {
    const [word, setWord] = useState();
    console.log("hola home", word);
    return (
        <section className={styles.mainContainer}>
            <div className={styles.container}>
                <div className={styles.imageContainer}>
                    <img src={main} alt="main" className={styles.image}/>
                </div>
                <h1 className={styles.title}>MY DICTIONARY</h1>  
                <p className={styles.subtitle}>Find meanings and save for quick reference</p>
                <Input wordProp={setWord} />
                <SavedWords />
            </div>
        </section>
    )
};

export default Home;
