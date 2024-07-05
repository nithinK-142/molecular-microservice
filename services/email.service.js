import { ServiceBroker } from "moleculer";

const broker = new ServiceBroker();

broker.createService({
  name: "email",
  actions: {
    async sendMail(ctx) {
      const { recipient, subject, content } = ctx.params;
      console.log(`Sending mail to ${recipient} with subject ${subject}`);
      console.log(`Conetnt: ${content}`);
      return `Email sento ${recipient}`;
    },
  },
});

export default broker;
