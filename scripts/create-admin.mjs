import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import "dotenv/config";

const config = {
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "artikel",
  charset: process.env.MYSQL_CHARSET || "utf8mb4",
};

const email = "admin@admin.com";
const password = "admin123";
const name = "Admin";

async function main() {
  const conn = await mysql.createConnection(config);

  try {
    // Check if User already exists
    const [existing] = await conn.execute("SELECT id FROM User WHERE email = ?", [email]);
    if (existing.length > 0) {
      console.log("Akun admin sudah ada:");
      console.log(`  Email: ${email}`);
      console.log(`  Password: ${password}`);

      const [authorCheck] = await conn.execute("SELECT id FROM Author WHERE email = ?", [email]);
      if (authorCheck.length === 0) {
        const authorId = crypto.randomUUID();
        await conn.execute(
          "INSERT INTO Author (id, name, email, title, createdAt, updatedAt) VALUES (?, ?, ?, ?, NOW(), NOW())",
          [authorId, name, email, "Admin"]
        );
        console.log("Author record created for existing user.");
      } else {
        console.log("Author record already exists.");
      }
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const userId = crypto.randomUUID();
    const profileId = userId; // Profile uses same ID as User
    const authorId = crypto.randomUUID();

    // Create User
    await conn.execute(
      "INSERT INTO User (id, name, email, password, createdAt, updatedAt) VALUES (?, ?, ?, ?, NOW(), NOW())",
      [userId, name, email, hashedPassword]
    );

    // Create Profile
    await conn.execute(
      "INSERT INTO Profile (id, username, fullName, updatedAt) VALUES (?, ?, ?, NOW())",
      [profileId, "admin", name]
    );

    // Create Author
    await conn.execute(
      "INSERT INTO Author (id, name, email, title, createdAt, updatedAt) VALUES (?, ?, ?, ?, NOW(), NOW())",
      [authorId, name, email, "Admin"]
    );

    console.log("Akun admin berhasil dibuat!");
    console.log(`  Email: ${email}`);
    console.log(`  Password: ${password}`);
    console.log(`  User ID: ${userId}`);
    console.log(`  Author ID: ${authorId}`);
  } finally {
    await conn.end();
  }
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
