export const usersList = (state = [], action) => {
  switch (action.type) {
    case "UPDATE_USER_LIST": {
      return action.val;
    }
    default:
      return state;
  }
};
