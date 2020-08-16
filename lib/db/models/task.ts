import mongoose from '../db';

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  techStack: String,
  createdBy: String,
  joinedBy: null || String,
});

interface ITask extends mongoose.Document {
  title: string;
  description: string;
  techStack: string;
  createdBy: string;
  joinedBy: null | string;
}

const Task: mongoose.Model<ITask> = mongoose.models.Task || mongoose.model<ITask>('Task', taskSchema);

export default Task;
