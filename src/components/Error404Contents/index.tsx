import { HiddenText } from '@codecademy/gamut';
import React, { useEffect } from 'react';


import styles from './styles.module.scss';

const containerId = 'phaser-container';



const createFullStoryLog = (scene: string) => {
  return (eventName: string) => {
    window.FS?.event('40Phaser Interaction', { eventName, scene });
  };
};

export const Error404Contents: React.FC = () => {
    useEffect(() => {
        import('phaser').then(async (phaser) => {
          window.Phaser = phaser;
    
          const { launch40Phaser } = await import('40phaser');
    
          launch40Phaser({
            on: {
              end: createFullStoryLog('end'),
              game: createFullStoryLog('game'),
              start: createFullStoryLog('start'),
            },
            phaserOptions: {
              parent: containerId,
            },
          });
        });
      }, []);
    

  return (
    <main className={styles.errorMain} data-testid="error404">
      <HiddenText as="h1">404: Page Not Found</HiddenText>
      <div  id={containerId} />
    </main>
  );
};
