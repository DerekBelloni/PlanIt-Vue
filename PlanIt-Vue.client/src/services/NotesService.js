import { applyStyles } from "@popperjs/core"
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class NotesService {
  async getNotes(projectId) {
    const res = await api.get('api/projects/' + projectId + '/notes')
    logger.log("hnere are notes", res.data)
    AppState.notes = res.data
  }
  async createNote(body, projectId) {
    const res = await api.post('api/projects/' + projectId + '/notes', body)
    logger.log(res.data)
    AppState.notes.unshift(res.data)
  }

  async deleteNote(noteId, projectId) {
    const res = await api.delete('api/projects/' + projectId + '/notes/' + noteId)
    AppState.notes = AppState.notes.filter(n => n.id != noteId)
  }

}




export const notesService = new NotesService()