import mongoose, { Document, Schema } from 'mongoose';

interface IDataSource extends Document {
  name: string;
  type: string;
  connectionDetails: object;
  user: Schema.Types.ObjectId;
}

const dataSourceSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  connectionDetails: { type: Schema.Types.Mixed, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.model<IDataSource>('DataSource', dataSourceSchema);