// src/services/user.service.js
import pool from '../config/db.js';
import ApiError from "../utils/ApiError.js";


export const createUser = async (userData) => {
    const { username, email } = userData;

    try {
        // Insert new user
        const [result] = await pool.query(
            'INSERT INTO users (username, email) VALUES (?, ?)',
            [username, email]
        );

        // Fetch and return the newly created user
        return await getUserById(result.insertId);

    } catch (err) {
        // Handle duplicate entry (username or email)
        if (err.code === 'ER_DUP_ENTRY') {
            throw new ApiError(409, 'Username or email already exists.');
        }
        // Other errors
        throw new ApiError(500, 'Failed to create user.');
    }
};

export const getUserById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);

    if (rows.length === 0) {
        throw new ApiError(404, 'User not found.');
    }

    return rows[0];
};

export const getAllUsers = async () => {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows;
};
