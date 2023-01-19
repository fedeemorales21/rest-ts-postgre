import { Router } from 'express'
import * as controllerAuthors from '../controllers/authors.controller'

const routeAuthors: Router = Router()

routeAuthors.get("/author", controllerAuthors.getAll)
routeAuthors.post("/author", controllerAuthors.createOne)
routeAuthors.get("/author/:id", controllerAuthors.getOne)
routeAuthors.put("/author/:id", controllerAuthors.updateOneById)
routeAuthors.delete("/author/:id", controllerAuthors.deleteById)

export default routeAuthors