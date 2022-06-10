import styles from './styles/definitionBox.module.css';

const DefinitionBox = ({ definition, examples, partOfSpeech }) => (
    <>
        <section className={styles.mainContainer}>
        <p className={styles.content}>{partOfSpeech}</p>
            <p className={styles.content}>{definition}</p>
            {
              examples && <>
                <p>Examples:</p>
                <p className={styles.content}>{examples}</p>
              </>
            }
        </section>
    </>
);

export default DefinitionBox;