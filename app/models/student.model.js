module.exports = (mongoose) => {
  const Student = mongoose.model(
    "student",
    mongoose.Schema(
      {
        name: String,
        status: Boolean,
        major: String,
        passion: String,
      },
      {
        timestamps: true,
      }
    )
  );
  return Student;
};
