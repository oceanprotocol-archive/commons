import mongoose, { Schema } from "mongoose";
import timestamps from "mongoose-timestamp";

export const ReportSchema = new Schema(
    {
        did: {
            type: String,
            index: true,
            trim: true,
            required: true
        },
        account: {
            type: String,
            index: true,
            trim: true,
            required: true
        }
    }
);

ReportSchema.plugin(timestamps);
ReportSchema.index({
    did: 1,
    account: 1,
    createdAt: 1
});

export default mongoose.model("Report", ReportSchema);