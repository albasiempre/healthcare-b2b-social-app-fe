import React, { useContext, useRef } from "react";
import "./Login.css";
import { loginCall } from "../../apiCalls";
//AuthContextはユーザー状態が入ってる(user, isFetching, error, dispatch)
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  // イベントの取得によって、リロードをしない（入力項目を残す）
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(email.current.value);
    // ApiCallsの関数を参照
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  console.log(user); //ユーザーがログインしてる状態
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Healsyn</h3>
          <span className="loginDesc">ヘルスケアの世界をオープンに。</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={(e) => handleSubmit(e)}>
            <p className="loginMsg">ログインはこちら</p>
            <input
              type="email"
              className="loginInput"
              placeholder="Eメール"
              required
              ref={email}
            />
            <input
              type="password"
              className="loginInput"
              required
              minLength="8"
              placeholder="パスワード"
              ref={password}
            />
            <button className="loginButton">ログイン</button>
            <span className="loginForgot">パスワードを忘れた方へ</span>
            <button className="loginRegisterButton">アカウント作成</button>
          </form>
        </div>
      </div>
    </div>
  );
}