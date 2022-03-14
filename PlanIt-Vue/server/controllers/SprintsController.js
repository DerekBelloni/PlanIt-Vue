import { Auth0Provider } from "@bcwdev/auth0provider";
import { sprintsService } from "../services/SprintsService";
import BaseController from "../utils/BaseController";

export class SprintsController extends BaseController {
  // constructor() {
  //   // super(`api/projects/:projectId/sprints`)
  //   this.router
  //     .use(Auth0Provider.getAuthorizedUserInfo)
  //     .post('', this.createSprint)


  // }

  async createSprint(req, res, next) {
    try {
      req.body.creatorID = req.userInfo.id
      const newSprint = await sprintsService.createProject(req.body)
      await newSprint.populate('creator', 'id')
      return res.send(newSprint)
    } catch (error) {
      next(error)
    }
  }

}
