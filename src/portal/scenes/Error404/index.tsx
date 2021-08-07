import React from 'react';

import { Error404Contents } from 'components/Error404Contents';
import { PortalContainer } from 'portal/layouts/PortalContainer';

export const Error404: React.FC = () => (
  <PortalContainer>
    <Error404Contents />
  </PortalContainer>
);

export default Error404;