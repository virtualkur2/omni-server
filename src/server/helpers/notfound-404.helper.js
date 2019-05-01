const notFound = (req, res, next) => {
  return res.status(404).json({
    error: 'Resource not found'
  })
}
export default notFound;
