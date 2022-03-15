import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const NoteSchema = new Schema(
  {
    body: { type: String, required: true },
    taskId: { type: ObjectId, required: true, ref: 'Task' },
    projectId: { type: ObjectId, required: true, ref: 'Project' },
    creatorId: { type: ObjectId, required: true, ref: 'Account' }
  },
  { timestamps: true, toJSON: { virtuals: true } })

NoteSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true

})
