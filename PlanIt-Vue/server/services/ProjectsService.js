import { dbContext } from "../db/DbContext";
import { Forbidden } from "../utils/Errors";

class ProjectsService {
  async removeProject(body) {
    const removeProject = await dbContext.Projects.findByIdAndDelete(body.id)
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