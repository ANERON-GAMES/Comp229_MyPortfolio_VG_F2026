export function makeCrud(Model) {
  return {
    async list(req, res) {
      const rows = await Model.find()
      res.json(rows)
    },
    async getOne(req, res) {
      const row = await Model.findById(req.params.id)
      if (!row) {
        res.status(404).json({ message: 'Not found.' })
        return
      }
      res.json(row)
    },
    async create(req, res) {
      const row = await Model.create(req.body)
      res.status(201).json(row)
    },
    async update(req, res) {
      const row = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      if (!row) {
        res.status(404).json({ message: 'Not found.' })
        return
      }
      res.json(row)
    },
    async remove(req, res) {
      const row = await Model.findByIdAndDelete(req.params.id)
      if (!row) {
        res.status(404).json({ message: 'Not found.' })
        return
      }
      res.json({ message: 'Removed.' })
    },
    async removeAll(req, res) {
      await Model.deleteMany({})
      res.json({ message: 'Removed all.' })
    }
  }
}
