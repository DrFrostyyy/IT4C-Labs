import pool from '../config/db.js';
import { ApiError } from '../utils/ApiError.js';

// Get all posts
export const getAllPosts = async () => {
    const [posts] = await pool.query('SELECT * FROM posts');
    return posts;
};

// Get a post by ID
export const getPostById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM posts WHERE id = ?', [id]);
    if (!rows[0]) {
        throw new ApiError(404, "Post not found");
    }
    return rows[0];
};

// Create a new post
export const createPost = async (postData) => {
    const { title, content, authorId } = postData;

    try {
        const [result] = await pool.query(
            'INSERT INTO posts (title, content, authorId) VALUES (?, ?, ?)',
            [title, content, authorId]
        );
        return getPostById(result.insertId);

    } catch (err) {
        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
            throw new ApiError(400, 'Invalid author ID. User does not exist.');
        }
        throw new ApiError(500, 'Failed to create post.');
    }
};

// Update a post fully
export const updatePost = async (id, postData) => {
    const { title, content, authorId } = postData;

    try {
        const [result] = await pool.query(
            'UPDATE posts SET title = ?, content = ?, authorId = ? WHERE id = ?',
            [title, content, authorId, id]
        );
        if (result.affectedRows === 0) {
            return null;
        }
        return getPostById(id);

    } catch (err) {
        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
            throw new ApiError(400, 'Invalid author ID. User does not exist.');
        }
        throw new ApiError(500, 'Failed to update post.');
    }
};

// Partially update a post
export const partiallyUpdatePost = async (id, updates) => {
    const fields = Object.keys(updates);
    const values = Object.values(updates);

    if (fields.length === 0) {
        return getPostById(id);
    }

    const setClause = fields.map(field => `${field} = ?`).join(', ');

    try {
        const [result] = await pool.query(
            `UPDATE posts SET ${setClause} WHERE id = ?`,
            [...values, id]
        );

        if (result.affectedRows === 0) {
            return null;
        }
        return getPostById(id);

    } catch (err) {
        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
            throw new ApiError(400, 'Invalid author ID. User does not exist.');
        }
        throw new ApiError(500, 'Failed to update post.');
    }
};

// Delete a post
export const deletePost = async (id) => {
    const [result] = await pool.query('DELETE FROM posts WHERE id = ?', [id]);
    return result.affectedRows > 0;
};
