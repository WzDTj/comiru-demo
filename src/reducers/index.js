import auth from './auth';
import user from './user';

export const initialState = {
  auth: auth.initialState,
  user: user.initialState,
};

export const reducer = (state, action) => ({
  auth: auth.reducer(state.auth, action),
  user: user.reducer(state.user, action),
});

export default { initialState, reducer };
