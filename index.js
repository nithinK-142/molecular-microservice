import broker from "./src/utils/broker.js";
import "./src/services/auth.service.js";
import "./src/services/user.service.js";

async function startApp() {
  try {
    await broker.start();
    console.log("⚙️ All Services Started 🔥");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

startApp();
