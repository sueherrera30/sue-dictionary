import styles from './styles/definitionBox.module.css';

const DefinitionBox = ({ meanings, partOfSpeech, phonetic }) => (
    <>
        <section className={styles.mainContainer}>
        <p className={styles.speech}>{partOfSpeech}</p>
        <div className={`${styles.definitionContainer} ${meanings.length > 1 && styles.multipleDefinitionContainer}`}>
            {
                meanings.map((definition,idx) =>
                    <div key={idx}>
                        { phonetic ? <p className={styles.phonetic}>{phonetic}</p> : null }
                        <p className={styles.definition}>{`${idx + 1}.- ${definition.definition}`}</p>
                        { definition.example ?
                            <>
                                <span className={styles.exampleTitle}>example: </span>
                                <span className={styles.example}>{definition.example}</span>
                            </> 
                            : null
                        }
                    </div>
                )
            }
        </div>
        </section>
    </>
);

export default DefinitionBox;