import AuthContent from '../components/Auth/AuthContent';
import { createUser } from '../util/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../store/auth-context';

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);
  const { isAuthenticated, authenticate, logout } = authCtx;

  const signUpHandler = async ({ email, password }) => {
    setIsAuthenticating(true);
    const token = await createUser(email, password);
    authenticate(token);
    navigation.navigate('Welcome');
    setIsAuthenticating(false);
  };

  if (isAuthenticating) {
    return <LoadingOverlay message='Creating user...' />;
  }

  return <AuthContent onAuthenticate={signUpHandler} />;
}

export default SignupScreen;
