import BaseController from "../utils/BaseController";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { tasksService } from "../services/TasksServices";




export class TasksController extends BaseController {
  constructor() {
    super(`api/projects/:projectId/tasks`)
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTask)
      .get('', this.getAllTasks)
      .put('/:taskId', this.updateTask)
      .delete('/:taskId', this.deleteTask)
  }
  async deleteTask(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.taskId = req.params.taskId
      const task = await tasksService.deleteTask(req.params.taskId, req.userInfo.id)
      res.send(task)
    } catch (error) {
      next(error)
    }
  }
  async getAllTasks(req, res, next) {
    try {
      const tasks = await tasksService.getAllTasks(req.params.projectId)
      res.send(tasks)
    } catch (error) {
      next(error)
    }
  }
  async createTask(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.projectId = req.params.projectId
      const task = await tasksService.createTask(req.body)
      res.send(task)
    } catch (error) {
      next(error)
    }

  }
  async updateTask(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.taskId
      const task = await tasksService.updateTask(req.body)
      res.send(task)
    } catch (error) {
      next(error)
    }
  }




}



