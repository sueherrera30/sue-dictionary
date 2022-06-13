import React, { Fragment, useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Tooltip, IconButton, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';

import { BsBookmarkHeart as BookmarkHeart } from "react-icons/bs";
import { MdOutlineArrowBack as Back } from "react-icons/md";
import { GiSpeaker as Speaker } from "react-icons/gi";

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

    console.log('data outside:', definitions);
    useEffect(() => {
        setLoading(true);
        const handleFetch = async () => {
            try {
               const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
               const result =  await response.json();
               setDefinitions(result);
               setLoading(false);
            } catch(error) {
                setError(error);
                console.log('error:', error);
            }
        }
        handleFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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


    return (
        <section className={sharedStyles.mainContainer}>
            <div className={`${sharedStyles.container} ${styles.container}`}>
                {
                        loading
                            ? <div className={styles.loadingContainer}><CircularProgress className={styles.loading} color="secondary" /></div>
                            :  definitions ? 
                             <>
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
                                    <p className={styles.phonetic}>AQUI FHONETIC</p>
                                    </div>
                                    <Speaker className={`${styles.icons} ${styles.soundIcon}`} />
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
                                                        />
                                                    )
                                                }
                                                <hr className={styles.divider} />
                                            </Fragment>
                                        )
                                    }            
                                </div>
                             </>
                            : <p>{error}</p>
                }
            </div>
        </section>
    )
};

export default Definition;

