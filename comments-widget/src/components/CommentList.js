import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import SortOptions from "./SortOptions";
import axios from 'axios';
import { useSnackbar } from "notistack";
import { Box, Typography } from "@mui/material";

const CommentList = () => {
  const [comments, setComments] = useState([]);
  const {enqueueSnackbar} = useSnackbar();
  const [sortCriteria, setSortCriteria] = useState("date");
  const logginedUser = "User";

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 const fetchData = async()=>{
  try {
    const url = 'http://localhost:5000/comments';
    let result = await axios.get(url);
    if (result.status === 200) {
      setComments([...result.data]);
    }
  } catch (err) {
    enqueueSnackbar(
      "Something went wrong. Check that the backend is running, reachable and returns valid JSON",
      {
        variant: "error",
      }
    );
  }

 }
  const handleCommentSubmit = async(content, parentId = null) => {
    try {
      let url = 'http://localhost:5000/comments';
      const newComment = {
        id: Date.now().toString(),
        content,
        author: logginedUser,
        likes: 0,
        date: new Date().toISOString(),
        parentId,
      };
      let result = await axios.post(url, newComment);
      if (result.status === 201) {
        setComments([...comments,newComment]);
      }
    } catch (err) {
      if (
        err.response &&
        err.response.status >= 400 &&
        err.response.status <= 500
      ) {
        enqueueSnackbar(err.response.data ? err.response.data.message : "", {
          variant: "error",
        });
      } else {
        enqueueSnackbar(
          "Something went wrong. Check that the backend is running, reachable and returns valid JSON",
          {
            variant: "error",
          }
        );
      }
    }
  };
  const handleLikeCount = async(commentId, likes) => {
    try {
      let url = `http://localhost:5000/comments/${commentId}`;
      const newComment = {
        likes
      };
      let result = await axios.patch(url, newComment);
      if (result.status === 200) {
        let newComments = comments.map((comment) => {
          if (comment.id === commentId) {
            comment.likes = likes;
          }
          return comment;
        });
        setComments([...newComments]);
      }
    } catch (err) {
      if (
        err.response &&
        err.response.status >= 400 &&
        err.response.status <= 500
      ) {
        enqueueSnackbar(err.response.data ? err.response.data.message : "", {
          variant: "error",
        });
      } else {
        enqueueSnackbar(
          "Something went wrong. Check that the backend is running, reachable and returns valid JSON",
          {
            variant: "error",
          }
        );
      }
    }
  };

  const handleEditComment = async(commentId, content) => {
    try {
      let url = `http://localhost:5000/comments/${commentId}`;
      const newComment = {
        content
      };
      let result = await axios.patch(url, newComment);
      if (result.status === 200) {
        let newComments = comments.map((comment) => {
          if (comment.id === commentId) {
            comment.content = content;
          }
          return comment;
        });
        setComments([...newComments]);
      }
    } catch (err) {
      if (
        err.response &&
        err.response.status >= 400 &&
        err.response.status <= 500
      ) {
        enqueueSnackbar(err.response.data ? err.response.data.message : "", {
          variant: "error",
        });
      } else {
        enqueueSnackbar(
          "Something went wrong. Check that the backend is running, reachable and returns valid JSON",
          {
            variant: "error",
          }
        );
      }
    }
  };

  const handleDeleteComment = async(commentId) => {
    try {
      let url = `http://localhost:5000/comments/${commentId}`;
      let result = await axios.delete(url);
      if (result.status === 200) {
        let newComments = comments.filter((comment) => {
          return comment.id !== commentId && comment.parentId !== commentId;
        });
        setComments([...newComments]);
      }
    } catch (err) {
      if (
        err.response &&
        err.response.status >= 400 &&
        err.response.status <= 500
      ) {
        enqueueSnackbar(err.response.data ? err.response.data.message : "", {
          variant: "error",
        });
      } else {
        enqueueSnackbar(
          "Something went wrong. Check that the backend is running, reachable and returns valid JSON",
          {
            variant: "error",
          }
        );
      }
    }
  };

  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
  };

  const sortedComments = comments.sort((a, b) => {
    if (sortCriteria === "likes") {
      return b.likes - a.likes;
    } else {
      return new Date(b.date) - new Date(a.date);
    }
  });

  return (
    <Box sx={{ maxWidth: '95%', margin: "auto", padding: 3 }}>
      <CommentForm onSubmit={(content) => handleCommentSubmit(content)} />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', margin: 2 }}>
        <SortOptions criteria={sortCriteria} onChange={handleSortChange} />
      </Box>
      <Typography variant="h4">Comments:</Typography>
      {sortedComments.map((comment) => {
        if (!comment.parentId) {
          return (
            <Comment
              key={comment.id}
              comment={comment}
              handleEditComment={(commentId, content) =>
                handleEditComment(commentId, content)
              }
              handleDeleteComment={(commentId) =>
                handleDeleteComment(commentId)
              }
              logginedUser={logginedUser}
              handleLikeCount={(commentId, likes) =>
                handleLikeCount(commentId, likes)
              }
              comments={comments}
              onSubmitReply={(content, parentId = null) =>
                handleCommentSubmit(content, parentId)
              }
            />
          );
        }
        return null;
      })}
    </Box>
  );
};

export default CommentList;
