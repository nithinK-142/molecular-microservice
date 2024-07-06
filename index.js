import broker from "./src/utils/broker.js";
import "./src/services/user.service.js";

async function startApp() {
  try {
    await broker.start();
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

startApp();
