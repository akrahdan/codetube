import { useState } from 'react';

// import { userEmailVerifySso } from 'ibs/api/user';

export const useSSoHook = () => {
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [emailFieldValue, setEmailFieldValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSetShowPasswordField = async () => {
    setIsSubmitting(true);
    const ssoCheck = true
    setShowPasswordField(!ssoCheck);
    !ssoCheck && setIsSubmitting(false);
  };

  return {
    showPasswordField,
    setShowPasswordField,
    emailFieldValue,
    setEmailFieldValue,
    isSubmitting,
    setIsSubmitting,
    handleSetShowPasswordField,
  };
};
