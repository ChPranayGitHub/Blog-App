import React, { useEffect, useState } from "react";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [seeContent, setSeeContent] = useState({});
  const [users, setUsers] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = {};
      for (let i = 0; i < posts.length; i++) {
        try {
          const response = await fetch(
            `http://localhost:5000/${posts[i].author}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          usersData[posts[i].author] = data.username;
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      setUsers(usersData);
    };

    if (posts.length > 0) {
      fetchUsers();
    }
  }, [posts]);

  const handleToggleContent = (index) => {
    setSeeContent((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <>
      {posts.map((post, index) => (
        <div className="post" key={index}>
          <img
            src={`http://localhost:5000/${post.image}`}
            alt="BlogImage"
            className="img-fluid"
          />
          <p>
            <p>
              Author: <b>{users[post.author] || "Guest"}</b>
            </p>

            <time>{formatDate(post.createdAt)}</time>
          </p>
          <h2>{post.title}</h2>
          <p>{post.summary}</p>
          <button
            className="btn btn-success btn-sm"
            onClick={() => handleToggleContent(index)}
          >
            {seeContent[index] ? "Read Less" : "Read More"}
          </button>
          {seeContent[index] && <p>{post.content}</p>}
        </div>
      ))}
    </>
  );
};

export default Post;
