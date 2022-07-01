/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

const useFetch = (word) => {
    const [definitions, setDefinitions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [audio, setAudio] = useState(null);
      useEffect(() => {
        setLoading(true);
        const handleFetch = () => {
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
            .then((response) => {
                if(!response.ok) {
                    return response.json().then(response => {
                        setError(response);
                        throw new Error(response)
                    })
                   }
                  else {
                    // setLoading(true);
                    response.json().then((result) => {
                        setDefinitions(result);
                        const phonetics = result[0].phonetics;
                        const phoneticsWithAudio = phonetics.filter(item => item.audio !== '' && item);
                        if(!phoneticsWithAudio.length) return;
                        const audioUrl = phoneticsWithAudio[0].audio.replace('//ss1', 'https://');
                        setAudio(new Audio(audioUrl));
                        return result;
                    });
                    // setLoading(false);
                 }    
            })
            .catch((error) => {
               console.log(error);
               return error;
            })
        }
        handleFetch();
        setLoading(false);
    }, []);
    return {
        definitions, loading, error, audio
    }
};

export default useFetch;