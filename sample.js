
const { MongoClient } = require("mongodb");

const URI = "mongodb://localhost:27017";
const client = new MongoClient(URI);

async function main() {
  await client.connect();

  const books = client.db("book_db").collection("books");

  // Start fresh on every run
  await books.deleteMany({});

  // TODO 1 - Insert one book with an embedded publisher object
  await books.insertOne({
    title: "The Little Prince",
    author: "Antoine de Saint-Exupéry",
    publisher: {
      name: "Gallimard",
      country: "France"
    }
  });

  // TODO 2 - Insert one book with an array of tags
  await books.insertOne({
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    tags: ["Fantasy", "Magic", "Adventure"]
  });

  // TODO 3 - Insert at least 5 books in one call
  await books.insertMany([
    {
      title: "Dune",
      author: "Frank Herbert",
      publisher: {
        name: "Chilton Books",
        country: "USA"
      },
      tags: ["Science Fiction", "Adventure", "Classic"]
    },
    {
      title: "Les Misérables",
      author: "Victor Hugo",
      publisher: {
        name: "A. Lacroix",
        country: "France"
      },
      tags: ["Classic", "Historical", "Drama"]
    },
    {
      title: "1984",
      author: "George Orwell",
      tags: ["Dystopian", "Political", "Fiction"]
    },
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      publisher: {
        name: "Scribner",
        country: "USA"
      }
    },
    {
      title: "Madame Bovary",
      author: "Gustave Flaubert",
      publisher: {
        name: "Michel Lévy Frères",
        country: "France"
      }
    }
  ]);

  // TODO 4 - Retrieve every book and log its title
  const allBooks = await books.find().toArray();

  console.log("All books:");
  allBooks.forEach((book) => {
    console.log(book.title);
  });

  // TODO 5 - Find the first book published in France
  const frenchBook = await books.findOne({
    "publisher.country": "France"
  });

  console.log("\nFirst book published in France:");
  if (frenchBook) {
    console.log(frenchBook.title);
  }

  // TODO 6 - Find all books published in France
  const frenchBooks = await books.find({
    "publisher.country": "France"
  }).toArray();

  console.log("\nNumber of books published in France:");
  console.log(frenchBooks.length);

  frenchBooks.forEach((book) => {
    console.log(book.title);
  });

  // TODO 7 - Find all books that have a tags field
  const taggedBooks = await books.find({
    tags: { $exists: true }
  }).toArray();

  console.log("\nBooks with tags:");
  taggedBooks.forEach((book) => {
    console.log(book.title, book.tags);
  });

  // Close the MongoDB connection
  await client.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
