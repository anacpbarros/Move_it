import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';

export function Countdown () {
    const {
        minutes,
        seconds,
        hasFinished,
        isActive,
        startCountdown,
        resetCountdown,
    } = useContext(CountdownContext)

//o padstart permite que se não houver dois numeros (10, 20),
//coloque outro na frente, no caso será o 0, e depois da o split para que 
//os numeros
//Por se tratar de algo visual, e não funcional, permanece nesta pasta
//Não havendo necessidade de passar para a pasta de Contexto  
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0').split('');

    return (
        <div>
            <div className= {styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondsLeft}</span>
                    <span>{secondsRight}</span>
                </div>
            </div>

            { hasFinished ? (
                <button
                    disabled
                    className={styles.countdownButton}
                >
                    Ciclo encerrado
                    <img src="icons/correct-icon.png" alt="Ícone Símbolo Correto" />
                </button>
            ) : (
                <>
                { isActive ? (

                    <button 
                    type="button" 
                    className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                    onClick={resetCountdown}
                    > 
                    Abandonar ciclo   
                    </button>
                    
                ) : (
    
                    <button 
                    type="button" 
                    className={styles.countdownButton}
                    onClick={startCountdown}
                    >
                    Iniciar um ciclo
                    </button>
                )}
                </>
            )}

            
        </div>
    );
}