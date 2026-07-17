import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@admin.com";
  const password = "admin123";
  const name = "Admin";

  // Check if User already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    console.log("User already exists:");
    console.log(`  Email: ${email}`);
    console.log(`  Password: ${password}`);
    console.log("\nChecking Author record...");

    const existingAuthor = await prisma.author.findUnique({ where: { email } });
    if (!existingAuthor) {
      await prisma.author.create({
        data: {
          name,
          email,
          title: "Admin",
        },
      });
      console.log("Author record created for existing user.");
    } else {
      console.log("Author record already exists.");
    }
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  // Create User + Profile + Author in one transaction
  await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        profile: {
          create: {
            username: "admin",
            fullName: name,
          },
        },
      },
    });

    await tx.author.create({
      data: {
        name,
        email,
        title: "Admin",
      },
    });

    console.log("Admin account created successfully!");
    console.log(`  Email: ${email}`);
    console.log(`  Password: ${password}`);
    console.log(`  User ID: ${user.id}`);
  });
}

main()
  .catch((e) => {
    console.error("Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
