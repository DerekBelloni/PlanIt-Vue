import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

class ProjectsService {
  async getProjects() {
    const res = await api.get('api/projects')
    logger.log('getting projects', res.data)
    AppState.projects = res.data
  }

  async setActiveProject(id) {
    const res = await api.get('api/projects/' + id)
    logger.log(res.data)
    AppState.activeProject = res.data
    logger.log('set active project', AppState.activeProject)
  }

  async createProject(body) {
    const res = await api.post('api/projects', body)
    logger.log('new projects', res.data)
    AppState.projects.unshift(res.data)
    return res.data
  }
}

export const projectsService = new ProjectsService();