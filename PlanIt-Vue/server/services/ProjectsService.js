import { dbContext } from "../db/DbContext";
import { Forbidden } from "../utils/Errors";
import { sprintsService } from "./SprintsService";

class ProjectsService {
  async removeProject(projectId, userId) {
    const project = await dbContext.Projects.findById(projectId)
    if (project.creatorId.toString() != userId) {
      throw new Forbidden("not your project to delete")
    }
    const removeProject = await dbContext.Projects.findByIdAndDelete(projectId)
    return `deleted ${removeProject}`
  }
  async getProjectById(id) {
    const projects = await dbContext.Projects.findById(id)
    await projects.populate('creator', 'name  picture')
    return projects
  }
  async getProject(query = {}) {
    const projects = await dbContext.Projects.find(query).populate('creator', 'name  picture')
    return projects
  }

  async createProject(body) {
    const newProject = await dbContext.Projects.create(body)
    await newProject.populate('creator', 'id')
    return newProject
  }

}

export const projectsService = new ProjectsService();