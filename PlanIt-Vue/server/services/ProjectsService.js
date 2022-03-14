import { dbContext } from "../db/DbContext";

class ProjectsService {
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