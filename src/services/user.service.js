import broker from "../utils/broker.js";
import ApiGateway from "moleculer-web";
import bcrypt from "bcrypt";
import { DB } from "../config/connect.js";
import {
  SQL_SELECT,
  SQL_SELECT_BY_ID,
  SQL_INSERT,
  SQL_DELETE,
  SQL_SELECT_BY_USERNAME,
} from "../config/queries.js";

broker.createService({
  name: "user",
  mixins: [ApiGateway],
  settings: {
    port: 3000,
    routes: [
      {
        path: "/api",
        whitelist: ["user.*"],
        aliases: {
          "POST /user": "user.registerUser",
          "GET /user": "user.getAllUsers",
          "GET /user/:id": "user.getUser",
          "DELETE /user/:id": "user.removeUser",
        },
        cors: true,
        bodyParsers: {
          json: true,
        },
      },
    ],
  },
  actions: {
    registerUser: {
      params: {
        username: "string",
        email: "email",
        password: "string",
      },
      async handler(ctx) {
        const { username, email, password } = ctx.params;
        const hashedPassword = await bcrypt.hash(password, 10);

        return new Promise((resolve, reject) => {
          DB.run(SQL_INSERT, [username, email, hashedPassword], function (err) {
            if (err) {
              if (err.message.includes("UNIQUE constraint failed")) {
                reject(new Error("Username or email already exists"));
              } else {
                reject(err);
              }
            } else {
              resolve({ id: this.lastID, username, email });
            }
          });
        });
      },
    },
    getAllUsers: {
      handler() {
        return new Promise((resolve, reject) => {
          DB.all(SQL_SELECT, [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
          });
        });
      },
    },
    getUser: {
      params: {
        id: "string",
      },
      handler(ctx) {
        const { id } = ctx.params;
        return new Promise((resolve, reject) => {
          DB.all(SQL_SELECT_BY_ID, [Number(id)], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
          });
        });
      },
    },
    removeUser: {
      params: {
        id: "string",
      },
      handler(ctx) {
        const { id } = ctx.params;
        return new Promise((resolve, reject) => {
          DB.run(SQL_DELETE, [Number(id)], function (err) {
            if (err) reject(err);
            else resolve({ deleted: this.changes > 0 });
          });
        });
      },
    },
    validateUser: {
      params: {
        username: "string",
        password: "string",
      },
      handler(ctx) {
        const { username, password } = ctx.params;
        return new Promise((resolve, reject) => {
          DB.get(SQL_SELECT_BY_USERNAME, [username], async (err, row) => {
            if (err) reject(err);
            else if (!row) resolve(null);
            else {
              const match = await bcrypt.compare(password, row.password);
              resolve(match ? { id: row.id, username: row.username } : null);
            }
          });
        });
      },
    },
  },

  started() {
    console.log(
      "User service started. API available at http://localhost:3000/api/users"
    );
  },
});
