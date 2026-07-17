const mysql = require('mysql2');

// Koneksi ke database
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  charset: process.env.MYSQL_CHARSET,
});

// Fungsi untuk mengeksekusi query
const executeQuery = (query, values) => {
  return new Promise((resolve, reject) => {
    connection.query(query, values, (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

// Data dummy untuk users
const usersData = [
  { username: 'user1', email: 'user1@example.com', password: 'password1' },
  { username: 'user2', email: 'user2@example.com', password: 'password2' },
];

// Data dummy untuk articles
const articlesData = [
  { title: 'Article 1', content: 'Content of Article 1', user_id: 1 },
  { title: 'Article 2', content: 'Content of Article 2', user_id: 2 },
];

// Fungsi untuk seeding data
const seedData = async () => {
  try {
    // Hapus data lama (opsional)
    await executeQuery('DELETE FROM users');
    await executeQuery('DELETE FROM articles');

    // Seed data users
    for (const user of usersData) {
      const [result] = await executeQuery(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [user.username, user.email, user.password]
      );
      user.id = result.insertId;
    }

    // Seed data articles
    for (const article of articlesData) {
      await executeQuery(
        'INSERT INTO articles (title, content, user_id) VALUES (?, ?, ?)',
        [article.title, article.content, article.user_id]
      );
    }

    console.log('Data seeded successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    connection.end();
  }
};

seedData();