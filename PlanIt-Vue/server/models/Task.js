import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const TaskSchema = new Schema({
  name: { type: String, required: true },
  weight: { type: Number, required: true },
  isComplete: { type: Boolean, default: false, required: true },
  projectId: { type: ObjectId, ref: 'Project', required: true },
  creatorId: { type: ObjectId, ref: 'Account', required: true },
  sprintId: { type: ObjectId, ref: 'Sprint', required: true }

},
  { timestamps: true, toJSON: { virtuals: true } })


TaskSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})