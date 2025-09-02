
import React, { useState } from 'react';
import LoginDialog from './LoginDialog';
import RegisterDialog from './RegisterDialog';

interface AuthenticationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
  onLoginSuccess?: (token: string) => void; 
}

const AuthenticationDialog: React.FC<AuthenticationDialogProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onLoginSuccess, 
}) => {
  const [mode, setMode] = useState(initialMode);

  const handleClose = () => {
    onClose();
    setMode('login');
  };

  const switchToRegister = () => setMode('register');
  const switchToLogin = () => setMode('login');

  if (mode === 'login') {
    return (
      <LoginDialog
        isOpen={isOpen}
        onClose={handleClose}
        onSwitchToRegister={switchToRegister}
        onLoginSuccess={onLoginSuccess} 
      />
    );
  }

  return (
    <RegisterDialog
      isOpen={isOpen}
      onClose={handleClose}
      onSwitchToLogin={switchToLogin}
    />
  );
};

export default AuthenticationDialog;


