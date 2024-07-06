import broker from "../utils/broker.js";
import ApiGateway from "moleculer-web";
import jwt from "jsonwebtoken";

broker.createService({
  name: "auth",
  mixins: [ApiGateway],
  settings: {
    port: 3001,
    routes: [
      {
        path: "/api/auth",
        whitelist: ["auth.*"],
        aliases: {
          "POST /login": "auth.login",
          "POST /verify": "auth.verify",
        },
        bodyParsers: {
          json: true,
        },
      },
    ],
  },
  actions: {
    login: {
      params: {
        username: "string",
        password: "string",
      },
      async handler(ctx) {
        const { username, password } = ctx.params;
        // call user service to validate credentials
        const user = await ctx.call("user.validateUser", {
          username,
          password,
        });
        if (user) {
          const token = jwt.sign(
            { id: user.id, username: user.username },
            "secret-key",
            { expiresIn: "1h" }
          );
          return { token };
        } else {
          throw new Error("Invalid credentials");
        }
      },
    },
    verify: {
      params: {
        token: "string",
      },
      handler(ctx) {
        // Verify the JWT token
        try {
          const decoded = jwt.verify(ctx.params.token, "secret-key");
          return { valid: true, user: decoded };
        } catch (error) {
          return { valid: false };
        }
      },
    },
  },
  started() {
    console.log(
      "Auth service started. API available at http://localhost:3001/api/auth"
    );
  },
});
