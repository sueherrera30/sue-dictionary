import React, { Fragment } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Tooltip, IconButton, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';

import { BsBookmarkHeart as BookmarkHeart } from "react-icons/bs";
import { MdOutlineArrowBack as Back } from "react-icons/md";
import { GiSpeaker as Speaker } from "react-icons/gi";

import useFetch from '../utils/hooks/useFetch';
import ErrorComponent from '../components/Error';
import DefinitionBox from '../components/DefinitionBox';
import sharedStyles from './styles/home.module.css';
import styles from './styles/definition.module.css';

const Definition = ({ favorites, setFavorites }) => {
    const { word } = useParams();

    let navigate = useNavigate();
    const { definitions, loading, error, audio } = useFetch(word);

    console.log('error in definition component', error);
    const handleAddFavorites = () => {
        setFavorites(prevFavs => [...prevFavs, word])
        if(favorites.includes(word)) return;
    }
    const removeFavorites = () => {
        const filteredFavs = favorites.filter(item => item !== word);
        setFavorites(filteredFavs)
    } 
    if(loading) return <div className={styles.loadingContainer}><CircularProgress className={styles.loading} color="secondary" /></div>
    if(error !== null) return <ErrorComponent error={error}/>

    return (
        <section className={sharedStyles.mainContainer}>
            <div className={`${sharedStyles.container} ${styles.container}`}>
                {
                    !definitions 
                    ? null
                    : <>
                    <div className={styles.iconsContainer}>
                        <Back data-testid="back-button" className={styles.icons} onClick={() => navigate('/')} />
                        <div className={styles.favsIcons}>
                            {
                                favorites && favorites.includes(word)
                                ? <IconButton data-testid="stick-icon" onClick={removeFavorites}> <DoneOutlineIcon className={styles.stick} /></IconButton>
                                : <Tooltip title="add to favs" arrow  enterTouchDelay={0}>
                                    <IconButton  data-testid="add-icon"  onClick={handleAddFavorites}> <AddIcon className={styles.add}  /></IconButton>
                                </Tooltip>
                            }
                            <Tooltip title="Go to your favourites" arrow  enterTouchDelay={0}>
                                <div><BookmarkHeart  data-testid="favorites-button"  className={styles.icons} onClick={() => navigate('/favorites')}/></div>
                            </Tooltip>
                        </div>
                    </div>
                    <div className={styles.wordContainer}>
                        <div>
                        <p className={styles.wordTitle} data-testid="word">{word}</p>
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

