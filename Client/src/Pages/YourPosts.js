import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const YourPosts = () => {
  const navigate = useNavigate();
  const formStyle = {
    display: "flex",
    flexDirection: "column",
    maxWidth: "500px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  };

  const labelStyle = {
    margin: "10px 0 5px",
    fontWeight: "bold",
  };

  const inputStyle = {
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  };

  const textareaStyle = {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    minHeight: "100px",
    marginBottom: "10px",
  };

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleSubmit = async (e, postID) => {
    e.preventDefault();
    let userID = window.localStorage.getItem("userID");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("content", content);
    formData.append("image", image);
    formData.append("author", userID);
    try {
      const response = await fetch(`http://localhost:5000/editpost/${postID}`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: window.localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      alert("Post Edited Successfully");
      navigate("/");
    } catch (error) {
      console.error("Error Editing the post:", error);
    }
  };

  const [posts, setPosts] = useState([]);
  const [seeContent, setSeeContent] = useState({});
  const [users, setUsers] = useState({});
  const id = window.localStorage.getItem("userID");

  useEffect(() => {
    const fetchYourPosts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/yourposts/${id}`, {
          method: "GET",
          headers: {
            Authorization: window.localStorage.getItem("token"),
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchYourPosts();
  }, [id]);

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

  const handleDelete = async (postId) => {
    try {
      await fetch(`http://localhost:5000/delete/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: window.localStorage.getItem("token"),
        },
      });
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEditClick = (post) => {
    setTitle(post.title);
    setSummary(post.summary);
    setContent(post.content);
    setImageUrl(`http://localhost:5000/${post.image}`);
    setImage(null);
  };

  return (
    <>
      <h2
        style={{
          fontFamily: "Arial, sans-serif",
          color: "#333",
          backgroundColor: "#f8f9fa",
          padding: "10px 20px",
          borderLeft: "5px solid #007bff",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        Your Posts
      </h2>
      {posts.map((post, index) => (
        <div className="post" key={index}>
          <img
            src={`http://localhost:5000/${post.image}`}
            alt="BlogImage"
            className="img-fluid"
          />
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "2%" }}
          >
            <span style={{ display: "flex", alignItems: "center" }}>
              <p style={{ margin: "0 10px 0 0" }}>
                Author: <b>{users[post.author] || "Guest"}</b>
              </p>

              <button
                type="button"
                className="btn btn-success btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() => handleEditClick(post)}
              >
                Edit
              </button>

              <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Edit Post
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <form
                        style={formStyle}
                        onSubmit={(e) => handleSubmit(e, post._id)}
                      >
                        <label htmlFor="title" style={labelStyle}>
                          Title:
                        </label>
                        <input
                          type="text"
                          id="title"
                          style={inputStyle}
                          onChange={(e) => setTitle(e.target.value)}
                          value={title}
                        />
                        <label htmlFor="summary" style={labelStyle}>
                          Summary:
                        </label>
                        <input
                          type="text"
                          id="summary"
                          style={inputStyle}
                          onChange={(e) => setSummary(e.target.value)}
                          value={summary}
                        />
                        <label htmlFor="file" style={labelStyle}>
                          Upload Image:
                        </label>
                        {imageUrl && (
                          <img
                            src={imageUrl}
                            alt="Current BlogImage"
                            style={{ marginBottom: "10px", width: "100%" }}
                          />
                        )}
                        <input
                          type="file"
                          id="file"
                          style={inputStyle}
                          accept="image/*"
                          onChange={(e) => setImage(e.target.files[0])}
                        />
                        <label htmlFor="content" style={labelStyle}>
                          Content:
                        </label>
                        <textarea
                          id="content"
                          style={textareaStyle}
                          onChange={(e) => setContent(e.target.value)}
                          value={content}
                        ></textarea>
                        <button
                          type="submit"
                          className="btn btn-success"
                          data-bs-dismiss="modal"
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              <button
                className="btn btn-sm btn-success"
                onClick={() => handleDelete(post._id)}
                style={{ marginLeft: "2%" }}
              >
                Delete
              </button>
            </span>
          </div>
          <br />
          <time>{formatDate(post.createdAt)}</time>
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

export default YourPosts;
