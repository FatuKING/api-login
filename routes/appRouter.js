import { Router } from 'express'
import { AppController } from '../controllers/appController.js'
import { DBlogin } from '../mysql/connectionDB.js'

export function createRouter () {
  const appRouter = Router()

  const appModel = DBlogin

  const appController = new AppController({ appModel })

  appRouter.post('/login', appController.login)
  appRouter.post('/register', appController.register)

  return appRouter
}
