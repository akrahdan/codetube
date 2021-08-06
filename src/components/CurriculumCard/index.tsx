import { Card, HeadingDeprecated, HeadingTags } from 'components/overrides';
import { pxRem } from '@codecademy/gamut-styles';
import { UserClickData } from '@codecademy/tracking';
import cx from 'classnames';
import React, { ComponentProps } from 'react';
import { To } from 'redux-first-router-link';

import { TrackLink } from 'components/TrackLink';

import { TagColor } from './BottomTag/index';
import { Footer } from './Footer/index';
import { Header, HeaderProps } from './Header';
import { Image } from './Image/index';
import styles from './styles.module.scss';
import { Subtitle, SubtitleProps } from './Subtitle';

type ProgressState = 'inProgress' | 'completed';

export const cardHeight = 180;

const cardStyles: Record<
  ProgressState,
  ComponentProps<typeof Card>['variant']
> = {
  inProgress: 'yellow',
  completed: 'navy',
};

type CurriculumCardProps = HeaderProps &
  SubtitleProps & {
    isFullSize?: boolean;
    image?: string;
    progressState?: ProgressState;
    title: string;
    tag?: string;
    tagColor?: TagColor;
    linkProps: {
      href?: string;
      routeTo?: To;
      onClick?: () => void;
      trackingData: UserClickData;
    };
    dataTestId: string;
    headingLevel?: HeadingTags;
  };

export const CurriculumCard: React.FC<CurriculumCardProps> = ({
  title,
  difficulty,
  image,
  showProLogo,
  progressState,
  tag,
  tagColor,
  text,
  linkProps,
  isFullSize = false,
  dataTestId,
  headingLevel = 'h3',
  scope,
  scopeCount,
}) => {
  const boxVariant = progressState? cardStyles[progressState]: false;
  console.log("Image: ", image)
  return (
    <Card
      display="grid"
      gridTemplateRows="repeat(3, max-content) 1fr max-content"
      minHeight={isFullSize ? pxRem(cardHeight * 2 + 32) : pxRem(cardHeight)}
      variant={boxVariant ?? 'navy'}
      shadow="medium"
      position="relative"
    >
      <Header
        invertColors={progressState === 'completed'}
        showProLogo={showProLogo}
        text={text}
      />

      <TrackLink
        target='/'
        asButton
        data={linkProps.trackingData}
        href={linkProps.href ?? '/'}
        to={linkProps.routeTo}
        className={styles.titleLink}
        onClick={linkProps.onClick}
        aria-label={`${title}, ${text}, ${showProLogo ? 'Pro only' : ''}`}
        data-testid={dataTestId}
      >
        <HeadingDeprecated
          className={cx(styles.heading, {
            [styles.completedHeading]: progressState === 'completed',
            [styles.inProgressHeading]: progressState === 'inProgress',
          })}
          as={headingLevel}
          fontSize="xs"
          hideMargin
        >
          {title}
        </HeadingDeprecated>
      </TrackLink>
      <div>
        {!progressState && (
          <Subtitle
            scope={scope}
            scopeCount={scopeCount}
            difficulty={difficulty}
          />
        )}
      </div>
      <div className={styles.imageContainer}>
        {isFullSize && image && (
          <Image image={image} progressState={progressState} />
        )}
      </div>
      <Footer progressState={progressState} tag={tag} tagColor={tagColor} />
    </Card>
  );
};
