import { Auth0Provider } from "@bcwdev/auth0provider";
import { sprintsService } from "../services/SprintsService";
import BaseController from "../utils/BaseController";

export class SprintsController extends BaseController {
  constructor() {
    super(`api/projects/:projectId/sprints`)
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createSprint)
      .get('', this.getSprintsByProject)
      .delete('/:sprintId', this.removeSprint)


  }
  async getSprintsByProject(req, res, next) {
    try {
      // req.body.creatorId = req.userInfo.id
      // req.body.projectId = req.params.projectId
      const sprints = await sprintsService.getSprintsByProject(req.params.projectId)
      res.send(sprints)
    } catch (error) {
      next(error)
    }
  }


  async createSprint(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.projectId = req.params.projectId
      const newSprint = await sprintsService.createProject(req.body)

      return res.send(newSprint)
    } catch (error) {
      next(error)
    }
  }

  async removeSprint(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.sprintId = req.params.sprintId
      const remove = await sprintsService.removeSprint(req.params.sprintId, req.userInfo.id)
      res.send(remove)
    } catch (error) {
      next(error)
    }
  }
}



