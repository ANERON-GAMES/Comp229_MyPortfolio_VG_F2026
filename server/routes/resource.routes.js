import { Router } from 'express'
import { requireAdmin } from '../middleware/auth.js'

export function resourceRouter(controller, publicCreate) {
  const router = Router()
  router.get('/', controller.list)
  router.get('/:id', controller.getOne)
  if (publicCreate) {
    router.post('/', controller.create)
  } else {
    router.post('/', requireAdmin, controller.create)
  }
  router.put('/:id', requireAdmin, controller.update)
  router.delete('/', requireAdmin, controller.removeAll)
  router.delete('/:id', requireAdmin, controller.remove)
  return router
}
