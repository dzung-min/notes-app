const Note = require('../models/Note')

exports.list = async (req, res, next) => {
  try {
    const notes = await Note.find()
    res.render('notes/list', { notes })
  } catch (error) {
    next(error)
  }
}

exports.create = async (req, res, next) => {
  try {
    const note = await Note.create(req.body)
    res.redirect(`/notes/${note._id}`)
  } catch (error) {
    next(error)
  }
}

exports.getById = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id)
    if (!note) {
      const err = new Error('Note not found')
      err.status = 404
      return next(err)
    }
    req.note = note
    next()
  } catch (error) {
    next(error)
  }
}

exports.read = async (req, res, next) => {
  try {
    const { note } = req
    res.render('notes/detail', { note })
  } catch (error) {
    next(error)
  }
}

exports.update = async (req, res, next) => {
  try {
    const { note } = req
    for (let update in req.body) {
      note[update] = req.body[update]
    }
    await note.save()
    res.redirect(`/notes/${note._id}`)
  } catch (error) {
    next(error)
  }
}

exports.destroy = async (req, res, next) => {
  try {
    const { note } = req
    await note.remove()
    res.redirect('/notes')
  } catch (error) {
    next(error)
  }
}

exports.render_create_form = (req, res) => {
  res.render('notes/create')
}

exports.render_update_form = (req, res) => {
  const { note } = req
  res.render('notes/update', { note })
}
