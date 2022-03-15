import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"




class TasksService {
  async deleteTask(taskId, userId) {
    const task = await dbContext.Tasks.findById(taskId)
    if (task.creatorId.toString() != userId) {
      throw new Forbidden("not your task to delete")
    }
    const removeTask = await dbContext.Tasks.findByIdAndDelete(taskId)
    return `deleted ${removeTask}`
  }
  async updateTask(update) {
    const task = await dbContext.Tasks.findById(update.id)
    if (task.creatorId.toString() != update.creatorId) {
      throw new Forbidden('Not your task to edit')
    }
    task.name = update.name ? update.name : task.name
    task.weight = update.weight ? update.weight : task.weight
    task.isComplete = update.isComplete ? update.isComplete : task.isComplete
    task.sprintId = update.sprintId ? update.sprintId : task.sprintId
    await task.save()
    return task


  }
  async getAllTasks(projectId) {
    const tasks = await dbContext.Tasks.find({ projectId }).populate('creator', 'name picture')
    return tasks
  }
  async createTask(body) {
    const newTask = await dbContext.Tasks.create(body)
    await newTask.populate('creator', 'id name picture')
    return newTask
  }





}






export const tasksService = new TasksService()