import { ServiceBroker } from "moleculer";
import ApiService from "moleculer-web";

const broker = new ServiceBroker();

// Auth Service
broker.createService({
  name: "auth",
  actions: {
    login: {
      rest: "POST /login",
      params: {
        username: "string",
        password: "string",
      },
      async handler(ctx) {
        const { username, password } = ctx.params;
        console.log(username, password);
        return { token: "OneRingToRuleThemAll!" };
      },
    },
    register: {
      rest: "POST /register",
      params: {
        username: "string",
        email: "email",
        password: "string",
      },
      async handler(ctx) {
        const { username, password, email } = ctx.params;
        console.log(username, password, email);
        return { message: "User registered successfully" };
      },
    },
  },
});

// API Gateway
broker.createService({
  name: "api",
  mixins: [ApiService],
  settings: {
    port: 3000,
    routes: [
      {
        path: "/api",
        whitelist: ["**"],
        autoAliases: true,
      },
    ],
  },
  started() {
    console.log("API Gateway started on http://localhost:3000");
  },
});

export default broker;
