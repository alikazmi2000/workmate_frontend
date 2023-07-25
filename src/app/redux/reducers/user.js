
const initialState = {
  user: null,
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
      console.log(action.payload);
      localStorage.clear();
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userData", JSON.stringify(action.payload.data));
      return { ...state, user: action.payload.data };
    case 'users/signup_SUCCESS':
      console.log(action.payload);
      localStorage.clear();
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userData", JSON.stringify(action.payload.data));
      return { ...state, user: action.payload.data };
    case 'users/addUser_SUCCESS' || 'users/update_SUCCESS':
      return { ...state, newUser: action.payload.data };

    case 'users/login_SUCCESS':
      console.log(action.payload);
      localStorage.clear();
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userData", JSON.stringify(action.payload.data));
      return { ...state, user: action.payload.data };
    case 'users/getAll/worker_SUCCESS' || 'users/getAll/customer_SUCCESS' || 'users/getAll/vendor_SUCCESS':
      return { ...state, users: action.payload.data, pagination: action.payload.pagination };

    case 'CLEAR_USER':
      return { ...state, user: null };
    default:
      return state;
  }
};

export default userReducer;