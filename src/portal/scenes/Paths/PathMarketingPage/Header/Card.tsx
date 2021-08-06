import { Logo } from '@codecademy/gamut-labs'
import React, { Fragment, useContext } from 'react';
import type { ProjectEntityResponse } from 'services/projects';

import styles from './styles/Card.module.scss'

export type CardProps = {
    project: ProjectEntityResponse
    completionTime: string;
  };
  
  export const Card = ({ completionTime, project }: CardProps) => {
    const { included, experience, difficulty, tags, goal } = project
    // const { card_content: card = [] } = useContext(CMSContext);
    // const [includes, experienceLevel, forThoseWho] = card;
  
    const includesWithClass = tags.map((str, i, self) => {
      

  
      return (
        <Fragment key={str}>
          <em className={styles.highlight}>{str}</em>
          {i !== self.length - 1 && ', '}
        </Fragment>
      );
    });
  
    return (
      <div className={styles.card}>
        <div className={styles.header}>
          <span className={styles.logo}>
            <Logo type="proAlt" height={21} />
          </span>
          <span>{completionTime}</span>
        </div>
        <p className={styles.title}>Includes</p>
        <p className={styles.content}>{includesWithClass}</p>
        <p className={styles.title}>Experience</p>
        <p className={styles.content}>For the {experience} </p>
        <p className={styles.title}>You will</p>
        <ul className={styles.content}>
          {included.map((item) => (
            <li key={item.title}>{item.title}</li>
          ))}
        </ul>
        <p className={styles.title}>Goal</p>
        <p className={styles.content}>{goal}</p>
      </div>
    );
  };