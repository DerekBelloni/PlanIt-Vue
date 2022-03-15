import { Auth0Provider } from "@bcwdev/auth0provider";
import { notesService } from "../services/NotesService";
import BaseController from "../utils/BaseController";

export class NotesController extends BaseController {
  constructor() {
    super('api/projects/:projectId')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('/notes', this.createNote)
      .get('/notes', this.getNotes)
      .delete('/notes/:noteId', this.deleteNote)
  }
  async deleteNote(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.noteId = req.params.noteId
      const note = await notesService.deleteNote(req.params.noteId, req.userInfo.id)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }
  async getNotes(req, res, next) {
    try {

      const notes = await notesService.getNotes(req.params.projectId)
      res.send(notes)
    } catch (error) {
      next(error)
    }
  }
  async createNote(req, res, next) {
    try {

      req.body.creatorId = req.userInfo.id
      req.body.projectId = req.params.projectId
      const note = await notesService.createNote(req.body)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }

}