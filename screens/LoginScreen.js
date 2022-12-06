import { useNavigation } from '@react-navigation/native';
import { useContext, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';
import { login } from '../util/auth';

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);
  const { isAuthenticated, authenticate, logout } = authCtx;
  const navigation = useNavigation();

  const signInHandler = async ({ email, password }) => {
    setIsAuthenticating(true);
    const token = await login(email, password);
    console.log('tokenlogin', token);
    authenticate(token);
    setIsAuthenticating(false);
  };

  if (isAuthenticating) {
    return <LoadingOverlay message='Logging...' />;
  }

  return <AuthContent isLogin onAuthenticate={signInHandler} />;
}

export default LoginScreen;
