import { applyStyles } from "@popperjs/core"
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TasksService {
    async getTasks(projectId) {
        const res = await api.get('api/projects/' + projectId + '/tasks')
        logger.log('tasks for project', res.data)
        AppState.tasks = res.data
    }
    async createTask(body, projectId) {
        const res = await api.post('api/projects/' + projectId + '/tasks/', body)
        AppState.tasks.unshift(res.data)
    }
    async deleteTask(taskId, projectId) {
        const res = await api.delete('api/projects/' + projectId + '/tasks/' + taskId)
        AppState.tasks = AppState.tasks.filter(t => t.id != taskId)
    }
}






export const tasksService = new TasksService()