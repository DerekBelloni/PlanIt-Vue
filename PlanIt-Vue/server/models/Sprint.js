import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const SprintSchema = new Schema({
  name: { type: String, required: true },
  projectId: { type: ObjectId, ref: 'Project', required: true },
  creatorId: { type: ObjectId, ref: 'Account', required: true }
},
  { timestamps: true, toJSON: { virtuals: true } })

SprintSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})


