import mongoose, { Schema, Types } from "mongoose";

export interface EnhancementDocument extends mongoose.Document {
  userId: Types.ObjectId;
  endpointUrl: string;
  httpMethod: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  requestHeaders?: Record<string, string>;
  originalBody?: unknown;
  contextText?: string;
  enhancementStrategy?: "system-message" | "prompt-prefix" | "passthrough";
  enhancedBody?: unknown;
  enhancedHeaders?: Record<string, string>;
  provider?: string;
  llmModel?: string;
  responseStatus?: number;
  responseBody?: unknown;
  createdAt: Date;
  updatedAt: Date;
}

const enhancementSchema = new Schema<EnhancementDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    endpointUrl: { type: String, required: true },
    httpMethod: {
      type: String,
      enum: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      default: "POST",
    },
    requestHeaders: { type: Schema.Types.Mixed },
    originalBody: { type: Schema.Types.Mixed },
    contextText: { type: String },
    enhancementStrategy: {
      type: String,
      enum: ["system-message", "prompt-prefix", "passthrough"],
      default: "system-message",
    },
    enhancedBody: { type: Schema.Types.Mixed },
    enhancedHeaders: { type: Schema.Types.Mixed },
    provider: { type: String },
    llmModel: { type: String },
    responseStatus: { type: Number },
    responseBody: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

const Enhancement =
  (mongoose.models.Enhancement as mongoose.Model<EnhancementDocument>) ||
  mongoose.model<EnhancementDocument>("Enhancement", enhancementSchema);

export default Enhancement;


