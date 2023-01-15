export const initialState = {
  basket: [],
  user:null
};
//Selector
export const getTotalPrice = (basket) =>
  basket.reduce((amount, item) => amount + item.price, 0);

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case "REMOVE":
      const index = state.basket.findIndex(
        (basketitem) => basketitem.id === action.item
      );
      let newbasket = [...state.basket];
      newbasket.splice(index, 1);
      return {
        ...state,
        basket: [...newbasket],
      };

      case "SET_USER":
        return{
          ...state,
          user:action.user
        };
      case "EMPTY_BASKET":
        return{
         ...state,
         basket: []
         };
    default:
      return state;
  }
};

export default reducer;
