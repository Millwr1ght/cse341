import { BSON } from "mongodb";

//auxilliary
export function buildIdQuery(idNum) {
    const bId = new BSON.ObjectId(idNum)
    return { _id: bId }
}