// src/services/comment.service.js

let comments = [];
let nextId = 1;

export const getAllComments = () => {
    return comments;
};

export const getCommentsByPostId = (postId) => {
    return comments.filter(c => c.postI++d === postId);
};

export const createComment = (postId, text) => {
    const newComment = { id: nextId++, text, postId };
    comments.push(newComment);
    return newComment;
};
