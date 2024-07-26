import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const CreatePost = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let userID = window.localStorage.getItem("userID");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("content", content);
    formData.append("image", image);
    formData.append("author", userID);
    try {
      await fetch("http://localhost:5000/post", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: window.localStorage.getItem("token"),
        },
      });
      alert("Post Created Successfully");
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form style={formStyle} onSubmit={handleSubmit}>
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
      <button type="submit" className="btn btn-success">
        Submit
      </button>
    </form>
  );
};

export default CreatePost;
