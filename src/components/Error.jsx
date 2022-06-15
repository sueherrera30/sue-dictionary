import { MdOutlineArrowBack as Back } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

import styles from '../pages/styles/definition.module.css';
import sharedStyles from '../pages/styles/home.module.css';
import Sad from '../assets/sad.png'
const ErrorComponent = ({ error }) => { 
    let navigate = useNavigate();
    return (
    <div className={sharedStyles.mainContainer}>
        <div className={`${sharedStyles.container} ${styles.error}`}>
            <h1>{error.title}</h1>
            <p>{error.message}</p>
            <p>{error.resolution}</p>
            <Back  className={styles.icons} onClick={() => navigate('/')} />
            <img alt="sad cheems" src={Sad} className={styles.sad}/>
        </div>
    </div>
)};

export default ErrorComponent;