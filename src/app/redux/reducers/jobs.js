
const initialState = {
  jobs: [],
  newJobs: {},
  pagination: {

  },
};

const jobsReducer = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case 'jobs/getAll_SUCCESS':
      return { ...state, jobs: [...action.payload.data], pagination: action.payload.pagination };
    case 'jobs/getMyJobs_SUCCESS':
      return { ...state, jobs: [...action.payload.data], pagination: action.payload.pagination };

    default:
      return state;
  }
};

export default jobsReducer;