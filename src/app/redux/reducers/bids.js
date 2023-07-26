
const initialState = {
  bids: [],
  jobData: {},
  pagination: {

  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'bids/getBidsByJobId_SUCCESS':
      return {
        ...state,
        bids: action.payload.data && action.payload.data.docs,
        jobData: action.payload.data.jobData,
        pagination: action.payload.pagination
      };

    default:
      return state;
  }
};

export default userReducer;