import * as filestack from 'filestack-js';
import { useEffect } from 'react';

const fileStack = ({
  apikey,
  clientOptions = {},
 
}) => {
  const _onError = (error) => {
    onError(error);
  };

  const _onSuccess = (result) => {
    onSuccess(result);
  };

  const picker = filestack.Filestack(apikey, clientOptions)
  
};

export default fileStack;