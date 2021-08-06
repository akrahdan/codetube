import { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

export const usePrompt = (when: boolean, message: string = 'Are you sure you want to quit without saving your changes?') => {
  const history = useHistory();

  const self = useRef(null);

  const onWindowOrTabClose = event => {
    if (!when) {
      return;
    }

    if (typeof event == 'undefined') {
      event = window.event;
    }

    if (event) {
      event.returnValue = message;
    }

    return message;
  };

  useEffect(() => {
    if (when) {
      self.current = history.block(message as any);
    } else {
      self.current = null;
    }

    window.addEventListener('beforeunload', onWindowOrTabClose);

    return () => {
      if (self.current) {
        self.current();
        self.current = null;
      }

      window.removeEventListener('beforeunload', onWindowOrTabClose);
    }
  }, [message, when]);
};