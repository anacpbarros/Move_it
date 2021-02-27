import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
    type: "body" | "eye";
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    experienceToNextLevel: number;
    activeChallenge: Challenge;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}
//abaixo, apesar do ChallengesContext não seguir a interface ChallengesContextData
//passamos a interface para setar o Context
export const ChallengesContext = createContext ({} as ChallengesContextData);

export function ChallengesProvider({ children , ...rest }: ChallengesProviderProps) {
    const [level, setlevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    const experienceToNextLevel = Math.pow((level +1) * 4, 2);

    //sempre que o segundo parametro de um useEffect for um par de colchetes vazio
    //significa que aquela ação ocorrerá uma única vez durante a exibição da aplicação
    //Permissão de notificação
    useEffect(() => {
        Notification.requestPermission();
    }, [])

    //pode-se usar .toString() ou String()
    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));
    }, [level, currentExperience, challengesCompleted]);

    function levelUp() {
        setlevel(level + 1);
        setIsLevelUpModalOpen(true) 
    }

    function closeLevelUpModal () {
        setIsLevelUpModalOpen(false);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted') {
            new Notification('Você recebeu um novo desafio 🥳', {
                body: `Valendo ${challenge.amount} xp!`
            })
        }
    }
  
    function resetChallenge (){
        setActiveChallenge(null);
    }

//validação para que o usuário não possa ter um completeChallenge 
//se o challenge não estiver ativo
    function completeChallenge () {
        if (!activeChallenge) {
            return;
        }

        const {amount} = activeChallenge;

        let finalExperience = currentExperience + amount;

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    return (
        <ChallengesContext.Provider 
            value= {{ 
                level, 
                currentExperience, 
                challengesCompleted,
                activeChallenge,
                experienceToNextLevel, 
                levelUp,
                startNewChallenge,
                resetChallenge,
                completeChallenge,
                closeLevelUpModal,
            }}
        >
            {children}

            { isLevelUpModalOpen && <LevelUpModal /> }
        </ChallengesContext.Provider>

    );
}

