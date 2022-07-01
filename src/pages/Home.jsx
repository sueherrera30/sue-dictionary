import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import Input from '../components/Input';
import SavedWords from '../components/SavedWords';
import styles from './styles/home.module.css';
import main from '../assets/main.png'
import school from '../assets/school.png';
import microscopy from '../assets/microscopy.png';
import world from '../assets/world.png';

const Home = () => {
    const[message, setMessage] = useState({
        state: false,
        content: '',
    });
    const [word, setWord] = useState('');
    let navigate = useNavigate();

    const saveValue = (event) => {
        event.preventDefault();
        const { value } = event.target;
        setWord(value);
        localStorage.setItem('word', JSON.stringify(value))
    };

    const handleSearch = (event) => {
        if (event.key === 'Enter')  {
            if(word === '') setMessage(() => {
                return {
                state: true,
                content: 'please add a word!'
            }})
            else if(word.split(' ').length > 1) setMessage(() => { 
                return {
                state: true,
                content: 'please add just 1 word or delete empty spaces'
            }})
            else {
                navigate(`/definition/${word}`)  
            }
        }
        if(event.key === 'Backspace') {
            setMessage(() => {
                return {
                state: false,
                content: ''
            }})
        }
    };
    return (
        <section className={styles.mainContainer}>
            <div className={styles.container}>
                <div className={styles.imageContainer}>
                    <img src={main} alt="main" className={styles.image}/>
                    <img src={school} alt="main" className={`${styles.floatingImage} ${styles.school}`}/>
                    <img src={microscopy} alt="main" className={`${styles.floatingImage} ${styles.microscopy}`}/>
                    <img src={world} alt="main" className={`${styles.floatingImage} ${styles.world}`}/>
                </div>
                <h1 className={styles.title}>MY DICTIONARY</h1>  
                <p className={styles.subtitle}>Find meanings and save for quick reference</p>
                <Input handleSearch={handleSearch} message={message} saveValue={saveValue} word={word} />
                <SavedWords />
            </div>
        </section>
    )
};

export default Home;
