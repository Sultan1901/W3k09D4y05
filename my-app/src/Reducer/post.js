const initialState = {
  post: []
};
const postRD = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "GET":
      return payload;
    case "ADD":
      const post = [...state.post, payload];
      return state;

    case "DELETE":
      return { post };
    default:
      return state;
  }
};
export default postRD;

export const getpost = (data) => {
  return {
    type: "GET",
    payload:{post : data},
  };
};
export const addpost = (data) => {
  return {
    type: "ADD",
    payload: data,
  };
};
export const delpost = (data) => {
  return {
    type: "DELETE",
    payload: data,
  };
};
