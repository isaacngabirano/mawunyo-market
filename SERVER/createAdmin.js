import bcrypt from "bcrypt";

// Function to hash password
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log("Hashed password:", hashedPassword);
  return hashedPassword;
}

// Admin document to insert
async function generateAdminDocument() {
  const password = "admin123"; // You can change this password
  const hashedPassword = await hashPassword(password);

  const adminDoc = {
    email: "isaacngabirano1.com", // You can change this email
    password: hashedPassword,
    createdAt: new Date(),
  };

  console.log("Admin document to insert:");
  console.log(JSON.stringify(adminDoc, null, 2));
}

generateAdminDocument();
