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
      .get('/:id', this.getProjectById)
      .delete('/:id', this.removeProject)
  }
  async removeProject(req, res, next) {
    try {
      req.body.projectId = req.params.projectId
      req.body.creatorId = req.userInfo.id
      const remove = await projectsService.removeProject(req.params.id, req.userInfo.id)
      return res.send(remove)
    } catch (error) {
      next(error)
    }
  }
  async getProjectById(req, res, next) {
    try {
      req.body.id = req.params.id
      const project = await projectsService.getProjectById(req.params.id)
      return res.send(project)
    } catch (error) {
      next(error)
    }
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