import axios from "axios";


export const loginCall = async (user, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    // APIのルーティング設定を参照している
    const res = await axios.post("auth/login", user);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_ERROR", payload: err });
  }
};