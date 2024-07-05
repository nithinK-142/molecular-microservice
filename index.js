import AuthService from "./services/auth.service.js";

async function startApp() {
  try {
    await AuthService.start();
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    // AuthService.stop();
  }
}

startApp();
