import { Router } from 'express'
import routeBook from './books.routes'
import routeAuthor from './authors.routes'

const routeIndex = Router();

routeIndex.use(routeBook);
routeIndex.use(routeAuthor);

export default routeIndex