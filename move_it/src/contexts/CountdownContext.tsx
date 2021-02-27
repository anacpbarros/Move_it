 import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

 interface CountdownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
 }

 interface CountdownProviderProps{
     children: ReactNode;
 }

 export const CountdownContext = createContext({} as CountdownContextData);

 let countdownTimeout: NodeJS.Timeout;

 export function CountdownProvider({ children }: CountdownProviderProps){
    const { startNewChallenge } = useContext(ChallengesContext);

    const [time, setTime] = useState(25 * 60);
    const [isActive, setIsActive] = useState (false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountdown () {
        setIsActive(true);   
    }
//a criação da var global countdownTimeout, permite que ao cancela a execução do setTimeout
//assim não consome um segundo do tempo após clicar no botão "abandonar ciclo"

    function resetCountdown () {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setHasFinished(false);
        setTime(0.1*60);
    }
//useEffect é como se fosse um efeito colateral, disparado mediante uma determinada ação
//recebe dois parâmetros: o que eu quero executar (função), a segunda é quando eu quero executar
    useEffect(() => {
        if (isActive && time > 0){
            countdownTimeout = setTimeout(() => {
                setTime(time -1);
            }, 1000)
        } else if (isActive && time === 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time])

//retonar todos os dados dentro da value
     return (
         <CountdownContext.Provider 
            value={{
                minutes,
                seconds,
                hasFinished,
                isActive,
                startCountdown,
                resetCountdown,
         }}>
             {children}
         </CountdownContext.Provider>
     )
 }