export const initialState = {
  token: 'dummy-token',
  isLoggedIn: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isLoggedIn: true };
    case 'LOGOUT':
      return { ...state, isLoggedIn: false, token: null };
    default:
      return state;
  }
};

export default { initialState, reducer };
