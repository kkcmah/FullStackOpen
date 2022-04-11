const { ApolloServer, gql } = require("apollo-server");
require("dotenv").config();
const mongoose = require("mongoose");
const Book = require("./models/book");
const Author = require("./models/author");
const author = require("./models/author");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      // if (args.author)
      //   booksToReturn = books.filter((book) => book.author === args.author);
      if (args.genre) {
        return Book.find({ genres: { $in: args.genre } }).populate("author");
      }
      return Book.find({}).populate("author");
    },
    allAuthors: async () => Author.find({}),
  },
  Author: {
    bookCount: async (root) => {
      return Book.find({ author: root.id }).countDocuments();
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      let existingAuthor = await Author.findOne({ name: args.author });
      if (!existingAuthor) {
        const newAuthor = new Author({ name: args.author });
        existingAuthor = await newAuthor.save();
      }
      const book = new Book({ ...args, author: existingAuthor });
      return book.save();
    },
    editAuthor: async (root, args) => {
      const existingAuthor = await Author.findOne({ name: args.name });
      if (!existingAuthor) return null;
      existingAuthor.born = args.setBornTo;
      return existingAuthor.save();
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
