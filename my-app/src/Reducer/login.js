const initialState = {
  user: null,
  token: "",
};
const Login = (state = initialState , action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN":
      const { user, token } = payload;
      localStorage.setItem("token", token);
      return { user, token };
    case "LOGOUT":
      localStorage.clear();
      return payload;
    default:
      return state;
  }
};
export default Login;
export const sign = (data)=>{
    return { 

        type : "LOGIN",
        payload : data
    }
}

export const logout = (data) =>{
    return { 
        type : "LOGOUT",
        payload : data
    }
}