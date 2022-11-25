const bookModel = require("../model/bookModel")
const userModel = require("../model/userModel")
const likes =require('../model/BooklikesModel')

const mongoose = require('mongoose')

const like = async (req, res) => {
  try {
      let userId = req.params.id
      let data = req.body

     if (!data.bookId) return res.status(400).json({ message: "provide bookId  to add in your list" })
      const book = await bookModel.findById(data.bookId)
      if (!book) return res.status(404).send({ message: "Not found" })
      const bookId = book._id

      const likes = await userModel.findOneAndUpdate(
          { _id: userId },
          { $push: { likes: bookId } }, { new: true })

      return res.status(201).json({ data: list, message: "Book added personal list" })
  } catch (err) {
      res.status(500).send({ message: err.message })
  }
}
module.exports=like