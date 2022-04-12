const Book = require("./models/book");
const DataLoader = require("dataloader");

const bookCountLoader = new DataLoader(async (authorIds) => {
  const books = await Book.find({
    where: {
      author: {
        $in: authorIds,
      },
    },
  });

  return authorIds.map(
    (authorId) =>
      books.filter((book) => book.author._id.toString() === authorId).length
  );
});

module.exports = { bookCountLoader };
