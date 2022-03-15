import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"
import { projectsService } from "./ProjectsService"


class SprintsService {
  async removeSprint(sprintId, userId) {
    const sprint = await dbContext.Sprints.findById(sprintId)
    if (sprint.creatorId.toString() != userId) {
      throw new Forbidden("not your sprint to delete")
    }
    const removeSprint = await dbContext.Sprints.findByIdAndDelete(sprintId)
    return `deleted ${removeSprint}`
  }
  async getSprintsByProject(projectId) {
    const sprints = await dbContext.Sprints.find({ projectId }).populate('creator', 'name picture')

    return sprints
  }
  async createProject(body) {
    const newSprint = await dbContext.Sprints.create(body)
    await newSprint.populate('creator', 'id name picture')
    return newSprint

  }
}
export const sprintsService = new SprintsService();