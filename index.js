import { ServiceBroker } from "moleculer";

const broker = new ServiceBroker();

broker.createService({
  name: "greeter",
  actions: {
    sayHello(ctx) {
      return `Hello ${ctx.params.name}`;
    },
  },
});

async function startApp() {
  await broker.start();
  const message = await broker.call("greeter.sayHello", { name: "John Smith" });
  console.log(message);
  broker.stop();
}

startApp();
