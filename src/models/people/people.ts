import mongoose, { model, Model, Schema } from "mongoose";

import type { IPeople } from "@/models/interfaces";

const PeopleSchema = new Schema(
  {
    ref_people: { type: String, required: [true, "Reference is required"], trim: true },
    appearance: { type: String, required: [true, "Name is required"], trim: true },
    history   : { type: String, required: [true, "Name is required"], trim: true },
    img       : { type: String },
  },
  { timestamps: true },
);

PeopleSchema.methods.toJSON = function () {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { __v, _id, ...people } = this.toObject();

  return { id: _id, ...people };
};

const People: Model<IPeople> = mongoose.models.People || model("People", PeopleSchema);

export default People;
