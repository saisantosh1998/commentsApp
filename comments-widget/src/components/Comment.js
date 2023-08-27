import React, { useState } from "react";
import {
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faReply,
  faTrash,
  faPencilSquare,
} from "@fortawesome/free-solid-svg-icons";
import { IconBtn } from "./IconBtn";
import Reply from "./Reply";
import Edit from "./Edit";

const Comment = ({
  comment,
  onSubmitReply,
  comments,
  logginedUser,
  handleLikeCount,
  handleEditComment,
  handleDeleteComment,
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [replyColor, setReplyColor] = useState(false);
  const [editColor, setEditColor] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    handleDeleteComment(comment.id);
    setDeleteDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  const toggleReplyForm = () => {
    setShowReplyForm(!showReplyForm);
    setReplyColor(!replyColor);
  };

  const toggleEditForm = () => {
    setShowEditForm(!showEditForm);
    setEditColor(!editColor);
  };

  const handleLikeClick = () => {
    if (isLiked) {
      handleLikeCount(comment.id, comment.likes - 1);
    } else {
      handleLikeCount(comment.id, comment.likes + 1);
    }
    setIsLiked(!isLiked);
  };
  const commentStyle = {
    marginLeft: comment.parentId ? "20px" : "0",
    marginTop: "5px",
    borderLeft: comment.parentId ? "2px solid #ccc" : "1px solid #ccc",
  };

  return (
    <>
      <Card variant="outlined" sx={{ ...commentStyle }}>
        <CardContent>
          <Typography variant="body1">{comment.content}</Typography>
          <Typography variant="caption" color="textSecondary">
            By: {comment.author}
          </Typography>
          &nbsp;
          <Typography variant="caption" color="textSecondary">
            Date: {new Date(comment.date).toLocaleString()}
          </Typography>
          <div>
            <IconBtn
              Icon={FontAwesomeIcon}
              icon={faThumbsUp}
              size="small"
              isActive={isLiked}
              aria-label="Like"
              onClick={handleLikeClick}
            >
              <span>{comment.likes}</span>
            </IconBtn>
            <IconBtn
              Icon={FontAwesomeIcon}
              icon={faReply}
              isActive={replyColor}
              size="small"
              aria-label="Reply to comment"
              onClick={toggleReplyForm}
            />
            {logginedUser === comment.author && (
              <>
                <IconBtn
                  Icon={FontAwesomeIcon}
                  icon={faPencilSquare}
                  size="small"
                  isActive={editColor}
                  aria-label="edit comment"
                  onClick={toggleEditForm}
                />
                <IconBtn
                  Icon={FontAwesomeIcon}
                  icon={faTrash}
                  iconColor="red"
                  size="small"
                  aria-label="delete comment"
                  onClick={handleDeleteClick}
                />
              </>
            )}
          </div>
        </CardContent>
      </Card>
      {showEditForm && (
        <div style={commentStyle}>
          <Edit
            key={`edit-${comment.id}`}
            commentId={comment.id}
            prevContent={comment.content}
            onClickEdit={(commentId, content) => {
              handleEditComment(commentId, content);
              toggleEditForm();
            }}
          />
        </div>
      )}
      {showReplyForm && (
        <div style={commentStyle}>
          <Reply
            key={`reply-${comment.id}`}
            parentId={comment.id}
            onSubmit={(content, parentId = null) => {
              onSubmitReply(content, parentId);
              toggleReplyForm();
            }}
          />
        </div>
      )}
      {
        <div style={commentStyle}>
          {comments
            .filter((reply) => reply.parentId === comment.id)
            .map((reply) => (
              <Comment
                key={`reply-${reply.id}`}
                logginedUser={logginedUser}
                comment={reply}
                comments={comments}
                handleEditComment={handleEditComment}
                handleLikeCount={handleLikeCount}
                onSubmitReply={onSubmitReply}
                handleDeleteComment={handleDeleteComment}
              />
            ))}
        </div>
      }
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this comment?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Comment;
