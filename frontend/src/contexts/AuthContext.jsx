import { createContext, useCallback, useReducer } from 'react';

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'set_error':
      return {
        ...state,
        error: action.payload,
      };

    case 'reset_error':
      return {
        ...state,
        error: null,
      };

    case 'login':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };

    case 'logout':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      throw new Error('Unknown action type in AuthContext');
  }
};

const USER1 = {
  name: 'Kelly',
  email: 'user1@test.com',
  password: '1234',
};

const AuthProvider = ({ children }) => {
  const [{ user, isAuthenticated, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const login = (email, password) => {
    if (email === USER1.email && password === USER1.password) {
      dispatch({ type: 'login', payload: USER1 });
    } else {
      dispatch({
        type: 'set_error',
        payload: 'Invalid email or password',
      });
    }
  };

  const logout = () => {
    dispatch({ type: 'logout' });
  };

  // To prevent the multiple calls to resetError
  const resetError = useCallback(() => {
    dispatch({ type: 'reset_error' });
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, error, resetError, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
