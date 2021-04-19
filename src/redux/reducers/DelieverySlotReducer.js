import SELECT_SLOT from '../actions/DelieverySlotActions';

const initialState = {
  date: 'Select a Delivery Slot',
  time: '',
  isSelected: false,
};

const deliverySlotReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_SLOT:
      return action.payload;

    case 'SLOT_RESET':
      return initialState;
  }
  return state;
};

export default deliverySlotReducer;
