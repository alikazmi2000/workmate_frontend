
const initialState = {
  bids: [],
  jobData: {},
  pagination: {

  },
  vendorBids:[],
  workerBids:[],
  vendorPagination:{},
  workerPagination:{}
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'bids/getBidsByJobId_SUCCESS':
      return {
        ...state,
        bids: action.payload.data && action.payload.data.bids,
        jobData: action.payload.data.jobData,
        pagination: action.payload.pagination
      };
    case 'bids/getWorkerBidsByJobId_SUCCESS':
      return {
        ...state,
        workerBids: action.payload.data && action.payload.data.bids,
        jobData: action.payload.data.jobData,
        workerPagination: action.payload.pagination
      };
    case 'bids/getVendorBidsByJobId_SUCCESS':
      return {
        ...state,
        vendorBids: action.payload.data && action.payload.data.bids,
        jobData: action.payload.data.jobData,
        vendorPagination: action.payload.pagination
      };

    default:
      return state;
  }
};

export default userReducer;