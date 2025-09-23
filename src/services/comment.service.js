// src/services/comment.service.js
import pool from '../config/db.js';
import { ApiError } from '../utils/ApiError.js';

export const getAllComments = async () => {
    const [rows] = await pool.query('SELECT * FROM comments');
    return rows;
};

export const getCommentsByPostId = async (postId) => {
    const [rows] = await pool.query('SELECT * FROM comments WHERE postId = ?', [postId]);
    return rows;
};

/** export const createComment = async (postId, text) => {
    const [result] = await pool.query(
        'INSERT INTO comments (postId, text) VALUES (?, ?)',
        [postId, text]
    );
    const [newComment] = await pool.query('SELECT * FROM comments WHERE id = ?', [result.insertId]);
    return newComment[0];
}; */ 

export const createComment = (postId, text, authorId) => {
    const newComment = { id: nextId++, postId, text, authorId };
    comments.push(newComment); 
    return newComment;
};
