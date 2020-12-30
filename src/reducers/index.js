import auth from './auth';

export const initialState = {
  auth: auth.initialState,
};

export const reducer = (state, action) => ({
  auth: auth.reducer(state.auth, action),
});

export default { initialState, reducer };
