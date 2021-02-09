const initialState = {
    error: ''
};
  
function errorReducer(state = initialState, action) {
    const {type,payload} = action;
    switch (type) {
      case 'SUCCESS':
        return { ...state, error: payload };
      case 'ERROR':
        return { ...state, value: payload };
      default:
        return state;
    }
}
  
export default errorReducer;