/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import axios from "axios";

const useFetch = (word) => {
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
    return {
        definitions, loading, error, audio
    }
};

export default useFetch;