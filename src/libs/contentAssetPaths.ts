export const BASE_ASSET_PATH = 'https://static-assets.codecademy.com/assets';
const BASE_STATIC_ASSET_PATH =
  'https://static-assets.codecademy.com/components';

export function pathCardAssetPath(pathId: string) {
  return `${BASE_ASSET_PATH}/components/cards/path-card/${pathId}.svg`;
}

export function trackCardAssetPath(trackId: string) {
  return `${BASE_ASSET_PATH}/components/cards/track-card/${trackId}.svg`;
}

export function trackCardAssetFallbackPath() {
  return `${BASE_ASSET_PATH}/components/cards/track-card/img_course_default.svg`;
}

export function pathMarketingPageHeroPath(pathId: string) {
  return `${BASE_ASSET_PATH}/path-marketing-page/hero-assets/${pathId}.svg`;
}

export function categoryCardAssetPath(section: string, category: string) {
  return `${BASE_ASSET_PATH}/components/cards/explore-category-card/${section}/${category}.svg`;
}

export function PathCardAssetPath(
  pathSlug: string,
  pathProgressState?: 'inProgress' | 'completed'
) {
  const progressState = pathProgressState ? `-${pathProgressState}` : '';
  return `${BASE_STATIC_ASSET_PATH}/curriculum/path/${pathSlug}/curriculum-card${progressState}.svg`;
}

export function CardPlaceholderAssetPath(
  pathProgressState?: 'inProgress' | 'completed'
) {
  const progressState = pathProgressState ? `-${pathProgressState}` : '';
  return `${BASE_STATIC_ASSET_PATH}/curriculum/path/placeholder${progressState}.svg`;
}
