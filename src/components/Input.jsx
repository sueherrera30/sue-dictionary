import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import styles from './styles/input.module.css';
import book from '../assets/book.png';
const Input = () => {
    const [word, setWord] = useState('');
    const[message, setMessage] = useState({
        state: false,
        content: '',
    })
    let navigate = useNavigate();

    const saveValue = (event) => {
        event.preventDefault();
        const { value } = event.target;
        setWord(value);
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
                content: 'please add just 1 word'
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
        <div className={styles.mainContainer}>
            <div className={styles.imageContainer}>
                <img src={book} alt="main" className={styles.image}/>
            </div>
            <div>
                <span className={styles.input}>
                    <input
                        value={word}
                        onChange={saveValue}
                        onKeyDown={handleSearch}
                        type="text"
                        placeholder="write a word..."
                    />
                    <span></span>
                </span>
                {message.state && <p className={styles.message}>{message.content}</p>}
            </div>
        </div>
    )
}

export default Input;