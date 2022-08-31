import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { GroupSchema } from "../models/group";
import { ValueSchema } from '../models/Value'
class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Groups = mongoose.model('Group', GroupSchema);
}

export const dbContext = new DbContext()
