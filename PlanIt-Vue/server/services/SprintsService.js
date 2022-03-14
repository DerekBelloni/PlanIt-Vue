import { dbContext } from "../db/DbContext"


class SprintsService {
  async createProject(body) {
    const newSprint = await dbContext.Sprints.create(body)
    //  await newSprint.populate('sprint')
    return newSprint

  }
}
export const sprintsService = new SprintsService();