//Essa é a homepage 
import Head from 'next/head'; 
import { GetServerSideProps } from 'next';
 
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from '../components/Profile';
import { ChallengeBox } from "../components/ChallengeBox";

import styles from '../styles/pages/Home.module.css';
import { CountdownProvider } from '../contexts/CountdownContext';
import React from 'react';
import { ChallengesProvider } from '../contexts/ChallengesContext';

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
  return (
    
    <ChallengesProvider
    level= {props.level}
    currentExperience= {props.currentExperience}
    challengesCompleted = {props.challengesCompleted}
    >
    
      <div className = { styles.container }>
        <Head> 
          <title>Início | move.it</title>
        </Head>  
        
        <ExperienceBar />

        <CountdownProvider>
        <section>
          <div>
            <Profile />
            <CompletedChallenges />
            <Countdown />
          </div>

          <div>
            <ChallengeBox />
          </div>
        </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}
//ao colocar dois pontos após a const name é passado o tipo da função
export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;
 
  //como aqui só pode ter string, ou seja, está tudo como string, para ser utilizado pelo 
  //componente da forma correta, é necessário voltar as props ao seu tipo original.
  return {
    props: {
      level: Number(level ?? 1),
      currentExperience: Number(currentExperience ?? 0),
      challengesCompleted: Number(challengesCompleted ?? 0),
    }
  }
}
