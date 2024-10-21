import mongoose, { Document, Schema } from 'mongoose';

interface IDashboard extends Document {
  name: string;
  user: Schema.Types.ObjectId;
  dataSources: Schema.Types.ObjectId[];
  layout: object;
}

const dashboardSchema = new Schema({
  name: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  dataSources: [{ type: Schema.Types.ObjectId, ref: 'DataSource' }],
  layout: { type: Schema.Types.Mixed, default: {} },
});

export default mongoose.model<IDashboard>('Dashboard', dashboardSchema);