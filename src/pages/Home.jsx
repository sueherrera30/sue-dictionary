import Input from '../components/Input';
import SavedWords from '../components/SavedWords';
import styles from './styles/home.module.css';
import main from '../assets/main.png'
import school from '../assets/school.png';
import microscopy from '../assets/microscopy.png';
import world from '../assets/world.png';

const Home = () => {
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
                <Input />
                <SavedWords />
            </div>
        </section>
    )
};

export default Home;
