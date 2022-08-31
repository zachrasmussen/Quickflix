import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId

export const ContentSchema = new Schema({
    haveWatched: {type: Boolean, default: false},
    creatorId: {type: ObjectId, required: true, ref: 'Account'},
                            
    imdbId: {type: String, required: true},//Does not need reference because getting ID from API
                                
    groupId: {type: ObjectId, required: false, ref: 'Group'},
    imgUrl: {type: String, required: true},
    title: {type: String, required: true},

},
{timestamps: true, toJSON: {virtuals: true}}
)

ContentSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'
  })