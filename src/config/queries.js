// Create table query
export const SQL_CREATE_TABLE = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`;

// Select all users query
export const SQL_SELECT = `
  SELECT id, username, email, created_at FROM users
`;

// Select user by id
export const SQL_SELECT_BY_ID = `
  SELECT id, username, email, created_at FROM users WHERE id = ?
`;

export const SQL_SELECT_BY_USERNAME = `SELECT * FROM users WHERE username = ?`;

// Insert new user query
export const SQL_INSERT = `
  INSERT INTO users (username, email, password) 
  VALUES (?, ?, ?)
`;

// Delete user query
export const SQL_DELETE = `
  DELETE FROM users WHERE id = ?
`;
