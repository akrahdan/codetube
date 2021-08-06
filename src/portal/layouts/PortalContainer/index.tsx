import { AppWrapper } from '@codecademy/gamut';
import { GlobalPage } from 'components/gamut-overrides'; 
import React from 'react';
import { useSelector } from 'react-redux';
import { AppHeaderClickHandler } from 'components/gamut-overrides';
import { useAppHeaderProps } from 'components/AppHeader/useAppHeaderProps';


// import { BrandedBanner } from '~/components/BrandedBanner';
// import { useFooterSketches } from '~/components/FooterSketches';
// import { PageMeta, PageMetaProps } from '~/components/PageMeta';
// import { trackUserClick } from '~/libs/eventTracking';
// import ButterbarStatic from '~/portal/components/ButterbarStatic';
// import { selectCurrentUserCountry } from '~/state/currentUser/selectors';

export type PortalContainerProps = {
  as?: 'main' | 'div';
  pageMetaProps?: undefined;
  backgroundColor?: 'white' | 'beige' | 'paleBlue' | 'paleYellow';
  showBanner?: boolean;
  skipToContentId?: string;
};

export const PortalContainer: React.FC<PortalContainerProps> = ({
  as = 'div',
  backgroundColor,
  children,
  showBanner,
  skipToContentId,
  pageMetaProps,
}) => {
  // const userGeoCountry = useSelector(selectCurrentUserCountry);
  // const [p5egg, openP5Egg] = useFooterSketches();
  const [headerProps, search] = useAppHeaderProps();


  

  return (
    <GlobalPage
      backgroundColor={backgroundColor}
      footer={{
        onClick: ({ target }) => {
          console.log("clicked")
        },
        onMadeInClick: undefined,
        userGeo: "US",
      }}
      header={headerProps}
      skipToContentId={skipToContentId}
    >
      {/* {pageMetaProps && <PageMeta {...pageMetaProps} />} */}
      {/* {showBanner && <BrandedBanner />} */}
      {search}
      {/* <ButterbarStatic /> */}
      <AppWrapper as={as}>{children}</AppWrapper>
      {/* {p5egg} */}
    </GlobalPage>
  );
};
