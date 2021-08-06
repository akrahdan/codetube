import { Konamimojisplosion } from '@codecademy/konamimojisplosion';
import React from 'react';

import { withEmotion } from 'libs/withEmotion';

import { Error500Contents } from './Error500Contents';
import { withErrorBoundary } from './errors/withErrorBoundary';

export function createRootComponent<Props>(
  Component: React.ComponentType<Props>,
  emotionOptions: Parameters<typeof withEmotion>[1]
) {
  
 
  function RootComponent(props: Props) {
    
    return (
      <>
        <Component {...props} />
        <Konamimojisplosion
          onActivate={() =>
            console.log("working")
          }
        />
      </>
    );
  }

  return withEmotion(
    RootComponent,
    emotionOptions
  );
}
