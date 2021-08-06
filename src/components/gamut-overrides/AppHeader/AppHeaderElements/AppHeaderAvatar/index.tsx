import { Box } from '@codecademy/gamut';
import React from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss'

export type AppHeaderAvatarProps = {
  imageUrl: string;
  avatarSize?: number;
  avatarSubTitle?:string;
};
export const AppHeaderAvatar: React.FC<AppHeaderAvatarProps> = ({
  imageUrl,
  avatarSubTitle,
  avatarSize = 40,
}) => {
  const outerBoxCS = classNames(styles.avatar, styles.avatarLg, styles.avatarPrimary);
  const innerBoxCS = classNames(styles.avatarInitials, styles.roundedCircle);
  return (
    <Box borderRadius="100%" overflow="hidden">
      {imageUrl ? <img
        alt="My Account menu toggle"
        data-testid="avatar"
        width={avatarSize}
        height={avatarSize}
        src={imageUrl}
      /> : 
        <span className={outerBoxCS}>
          <span className={innerBoxCS}>{avatarSubTitle}</span>
        </span>
      }
      
    </Box>
  );
};
