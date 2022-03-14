import { profileService } from "../services/ProfileService";
import BaseController from "../utils/BaseController";
import { projectsService } from "../services/ProjectsService";
import { Auth0Provider } from "@bcwdev/auth0provider";


export class ProjectsController extends BaseController {

  constructor() {
    super('api/projects')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createProject)
      .get('', this.getProject)
  }
  async getProject(req, res, next) {
    try {
      const projects = await projectsService.getProject(req.query)
      return res.send(projects)
    } catch (error) {
      next(error)
    }
  }
  async createProject(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const newProject = await projectsService.createProject(req.body)
      return res.send(newProject)
    } catch (error) {
      next(error)
    }
  }

}