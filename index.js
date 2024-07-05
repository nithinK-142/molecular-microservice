import UserService from "./services/user.service.js";
import EmailService from "./services/email.service.js";
import AuthService from "./services/auth.service.js";

// User operations
async function createUser() {
  const newUser = await UserService.call("user.createUser", {
    username: "John Smith",
    email: "john@smith.com",
  });
  console.log("New User", newUser);
}

async function getUsers() {
  const users = await UserService.call("user.getUsers");
  console.log("Users", users);
}

// Email operations
async function sendEmail() {
  const mail = await EmailService.call("email.sendMail", {
    recipient: "John Smith",
    subject: "Test Mail Service",
    content: "writing this mail to test email service.",
  });
  console.log(mail);
}

// Auth operations
async function loginUser() {
  const user = await AuthService.call("auth.login", {
    username: "John Smith",
    password: "Smith",
  });
  console.log(user);
}

// Main application logic
async function startApp() {
  await Promise.all([
    UserService.start(),
    EmailService.start(),
    AuthService.start(),
  ]);

  try {
    await createUser();
    await getUsers();
    await sendEmail();
    await loginUser();
  } catch (error) {
    console.log("Error ", error);
  } finally {
    UserService.stop();
    EmailService.stop();
    AuthService.stop();
  }
}

startApp();
