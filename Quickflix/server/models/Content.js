import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId

export const ContentSchema = new Schema({
    haveWatched: {type: Boolean, default: false},
    accountId: {type: ObjectId, required: true, ref: 'Account'},
                            // Not sure if imdbId needs a ref
    imdbId: {type: ObjectId, required: true},
                                // Not sure if groupId needs a ref
    groupId: {type: ObjectId, required: false},
    imgUrl: {type: String, required: true},
    title: {type: String, required: true},

},
// {timestamps: true, toJSON: {virtuals: true}}
)

// ContentSchema.virtual()