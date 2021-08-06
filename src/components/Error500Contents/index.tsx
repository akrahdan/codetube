import { Anchor, Box, Text } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React from 'react';



const StyledCode = styled.code`
  display: block;
  font-size: 0.85rem;
`;

export const Error500Contents: React.FC = () => (
  <Box maxWidth="40rem" mx="auto" as="main">
    <Text as="h1" >
      {'very bad'}
    </Text>
    
  
    <Box as="details"  textColor="gray-900">
      <Box as="summary" >
        Support information
      </Box>
      {typeof navigator !== 'undefined' && (
        <StyledCode>Browser: {navigator.userAgent}</StyledCode>
      )}
      <StyledCode>Timestamp: {new Date().getTime()}</StyledCode>
     
    </Box>
  </Box>
);
