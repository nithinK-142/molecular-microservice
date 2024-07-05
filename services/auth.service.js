import { ServiceBroker } from "moleculer";

const broker = new ServiceBroker();

broker.createService({
  name: "auth",
  actions: {
    async login(ctx) {
      const { username, password } = ctx.params;
      return `Welcome ${username}`;
    },
  },
});

export default broker;
