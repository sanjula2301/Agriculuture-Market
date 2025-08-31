
import React, { useState } from 'react';
import LoginDialog from './LoginDialog';
import RegisterDialog from './RegisterDialog';

interface AuthenticationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
  onLoginSuccess?: (token: string) => void; // ✅ Add this
}

const AuthenticationDialog: React.FC<AuthenticationDialogProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onLoginSuccess, // ✅ Accept it
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
        onLoginSuccess={onLoginSuccess} // ✅ Pass it here
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


