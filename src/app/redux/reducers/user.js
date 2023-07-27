
const initialState = {
  user: null,
  token: null,
  users: [],
  newUser: {},
  pagination: {

  },
};

const userReducer = (state = initialState, action) => {
  console.log(action.type);
  console.log(action.payload);
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'users/signup_SUCCESS':
      localStorage.clear();
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userData", JSON.stringify(action.payload.data));
      return { ...state, user: action.payload.data, token: action.payload.token };

    case 'users/addUser_SUCCESS':
      return { ...state, newUser: action.payload.data };
    case 'users/update_SUCCESS':
      return { ...state, newUser: action.payload.data };
    case 'users/login_SUCCESS':
      localStorage.clear();
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userData", JSON.stringify(action.payload.data));
      return { ...state, user: action.payload.data, token: action.payload.token };

    case 'users/getAll/worker_SUCCESS':
      return { ...state, users: [...action.payload.data], pagination: action.payload.pagination };
    case 'users/getAll/vendor_SUCCESS':
      return { ...state, users: [...action.payload.data], pagination: action.payload.pagination };
    case 'users/getAll/customer_SUCCESS':
      return { ...state, users: [...action.payload.data], pagination: action.payload.pagination };
    case 'signout_user':
      {
        localStorage.clear();
        return {
          ...state,
          user: null,
          users: [],
          newUser: {},
          pagination: {

          },
        };
      }
    case 'CLEAR_USER':
      return { ...state, user: null };
    default:
      return state;
  }
};

export default userReducer;