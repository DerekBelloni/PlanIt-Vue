import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const SprintSchema = new Schema({
  name: { type: String, required: true },
  projectId: { type: ObjectId, required: true },
  creatorId: { type: ObjectId, required: true }
},
  { timestamps: true, toJSON: { virtuals: true } })

SprintSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Project',
  justOne: true
})

SprintSchema.virtual('project ', {
  localField: 'projectId',
  foreignField: 'projectId',
  ref: 'Project',
  justOne: true
})
