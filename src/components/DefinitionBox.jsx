import styles from './styles/definitionBox.module.css';

const DefinitionBox = ({ content }) => (
    <>
        <section className={styles.mainContainer}>
            <p className={styles.content}>{content}</p>
        </section>
    </>
);

export default DefinitionBox;