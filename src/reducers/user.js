export const initialState = null;

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      const { user } = action.payload;
      return user;
    default:
      return state;
  }
};

export default { initialState, reducer };
