import { Router } from 'express'
import * as controllerBooks from './../controllers/books.controller'

const routerBooks: Router = Router()

routerBooks.get("/book", controllerBooks.getAll)
routerBooks.post("/book", controllerBooks.createOne)
routerBooks.get("/book/:id", controllerBooks.getOne)
routerBooks.put("/book/:id", controllerBooks.updateOneById)
routerBooks.delete("/book/:id", controllerBooks.deleteById)

export default routerBooks