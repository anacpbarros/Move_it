//todo arquivo que está na pasta public
//pode ser chamado diretamente, como por exemplo ao fazer o src dos icons

import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css'; 

export function Profile () {
    const { level } = useContext(ChallengesContext);

    return (
        <div className = {styles.profileContainer}>
            <img src= "icons/user-photo.png" alt= "Usuário" />
            <div>
                <strong>Usuário</strong>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                    Level { level }
                </p>
            </div>
        </div>
    )
}