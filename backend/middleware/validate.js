// Usage: validate(['field1', 'field2'])
module.exports = function validate(fields) {
  return (req, res, next) => {
    for (const field of fields) {
      if (req.body[field] == null) {
        return res.status(400).json({ message: `${field} is required` });
      }
    }
    next();
  };
};