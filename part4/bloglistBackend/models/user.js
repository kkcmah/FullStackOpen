const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, minlength: 3 },
  // do not test password restritions with mongoose validators because request pass !== db pass
  passwordHash: String,
  name: String,
});

const User = mongoose.model("User", userSchema);

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  },
});

module.exports = User;
