import { applyStyles } from "@popperjs/core"
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class SprintsService {
  async createSprint(body, projectId) {
    const res = await api.post('api/projects/' + projectId + '/sprints', body)
    AppState.sprints.unshift(res.data)
    logger.log('creating sprint', res.data)
  }

  async getSprints(projectId) {
    const res = await api.get('api/projects/' + projectId + '/sprints')
    AppState.sprints = res.data
  }

  async deleteSprint(sprintId, projectId) {
    const res = await api.delete('api/projects/' + projectId + '/sprints/' + sprintId)
    AppState.sprints = AppState.sprints.filter(s => s.id != sprintId)

  }
}

export const sprintsService = new SprintsService()