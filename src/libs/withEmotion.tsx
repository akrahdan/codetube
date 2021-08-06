import { AppWrapper } from '@codecademy/gamut';
import { GamutProvider } from '@codecademy/gamut-styles';
import { AssetProvider } from '@codecademy/gamut-styles/dist/AssetProvider';
import { CSSObject } from '@codecademy/variance';
import { EmotionCache, Theme } from '@emotion/react';
import React from 'react';

interface EmotionOptions {
  variables?: Record<string, CSSObject>;
  theme: Theme;
}

export const withEmotion = (
  Component: React.ComponentType<any>,
  options: EmotionOptions
) => {
  return ({  ...props }: { }) => {
    return (
      <GamutProvider  {...options}>
        <AssetProvider />
        <AppWrapper>
          <Component {...props} />
        </AppWrapper>
      </GamutProvider>
    );
  };
};
