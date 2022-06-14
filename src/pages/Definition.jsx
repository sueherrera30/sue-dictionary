import React, { Fragment, useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Tooltip, IconButton, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import axios from "axios";

import { BsBookmarkHeart as BookmarkHeart } from "react-icons/bs";
import { MdOutlineArrowBack as Back } from "react-icons/md";
import { GiSpeaker as Speaker } from "react-icons/gi";

import Sad from '../assets/sad.png'
import DefinitionBox from '../components/DefinitionBox';
import sharedStyles from './styles/home.module.css';
import styles from './styles/definition.module.css';

const Definition = () => {
    const { word } = useParams();
    let navigate = useNavigate();
    const [favorites, setfavorites] = useState([]);
    const [definitions, setDefinitions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [audio, setAudio] = useState(null);
    

    useEffect(() => {
        setLoading(true);
        const handleFetch = () => {
            axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
            .then((response) => {
                setDefinitions(response.data);
                const phonetics = response.data[0].phonetics;
                const phoneticsWithAudio = phonetics.filter(item => item.audio !== '' && item);
                if(!phoneticsWithAudio.length) return;
                const audioUrl = phoneticsWithAudio[0].audio.replace('//ss1', 'https://');
                setAudio(new Audio(audioUrl))
            })
            .catch((error) => {
                const { data } = error.response
                setError(data)
            })
            setLoading(false);
        }
        handleFetch();
    }, []);
    const handleAddFavorites = () => {
        if(favorites.length === 0) setfavorites([word])
        else setfavorites([...favorites, word]);
    }
    const removeFavorites = () => {
        setfavorites([])
    }
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    if(loading) return <div className={styles.loadingContainer}><CircularProgress className={styles.loading} color="secondary" /></div>
    if(error !== null) return <div className={sharedStyles.mainContainer}>
        <div className={`${sharedStyles.container} ${styles.error}`}>
            <h1>{error.title}</h1>
            <p>{error.message}</p>
            <p>{error.resolution}</p>
            <Back  className={styles.icons} onClick={() => navigate('/')} />
            <img alt="sad cheems" src={Sad} className={styles.sad}/>
        </div>
    </div>
    return (
        <section className={sharedStyles.mainContainer}>
            <div className={`${sharedStyles.container} ${styles.container}`}>
                {
                    !definitions 
                    ? null
                    : <>
                    <div className={styles.iconsContainer}>
                        <Back  className={styles.icons} onClick={() => navigate('/')} />
                        <div className={styles.favsIcons}>
                            {
                            favorites.includes(word)
                            ? <IconButton onClick={removeFavorites}> <DoneOutlineIcon className={styles.stick} /></IconButton>
                            : <Tooltip title="add to favs" arrow  enterTouchDelay={0}>
                                <IconButton onClick={handleAddFavorites}> <AddIcon className={styles.add}  /></IconButton>
                                </Tooltip>
                            }
                            <Tooltip title="Go to your favourites" arrow  enterTouchDelay={0}>
                                <div><BookmarkHeart className={styles.icons} onClick={() => navigate('/favorites')}/></div>
                            </Tooltip>
                        </div>
                    </div>
                    <div className={styles.wordContainer}>
                        <div>
                        <p className={styles.wordTitle}>{word}</p>
                        </div>
                        {audio ? <Speaker onClick={() => audio.play()} className={`${styles.icons} ${styles.soundIcon}`} /> : null}
                    </div>
                    <div className={styles.definitionsContainer}>
                        {
                            definitions.map((definition, idx) => 
                                <Fragment key={idx}>
                                    {
                                        definition.meanings.map((meaning, idx) =>
                                            <DefinitionBox
                                                key={idx}
                                                meanings={meaning.definitions}
                                                partOfSpeech={meaning.partOfSpeech}
                                                phonetic={definition.phonetic}
                                            />
                                        )
                                    }
                                    <hr className={styles.divider} />
                                </Fragment>
                            )
                        }            
                    </div>
                 </>
                }
            </div>
        </section>
    )
};

export default Definition;

