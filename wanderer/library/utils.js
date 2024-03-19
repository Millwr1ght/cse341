import { BSON } from "mongodb";

//auxilliary
export function buildIdQuery(idNum) {
    //construct the mongodb document id from the id number
    const bId = new BSON.ObjectId(idNum)
    return { _id: bId }
}