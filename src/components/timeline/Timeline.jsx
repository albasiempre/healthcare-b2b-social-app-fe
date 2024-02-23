import React, { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../Share/Share";
import "./Timeline.css";
import { Posts } from "../../dummyData";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

//タイムライン用とプロフィール用がある。
export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);

  // authenticationの役割
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // APIのデータ取得が非同期なので、ここも合わせる
    const fetchPosts = async () => {
      const res = username
        ? await axios.get(`/posts/profile/${username}`) //プロフィールの場合
        : await axios.get(`/posts/timeline/${user._id}`); //ホームの場合

      setPosts(
        // 時系列で掲載
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id]);
  // ユーザーのidが変更した際に、タイムラインの内容を変更する。
  // プロフィールのデータとポスト内容を連携させるのに、第二引数に入れるのを忘れない

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {Posts.map((post) => (
          // mongoの使用に合わせて変更
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}