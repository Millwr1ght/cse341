// Recipe document schema
export const /*type*/ Recipe = {
    title: {
        type: String
    },
    pageNumber: {
        type: Number
    },
    book: {
        type: String
    },
    type: {
        type: String
    },
    allergens: {
        dairy: { type: Boolean },
        peanuts: { type: Boolean },
        treenuts: { type: Boolean },
        eggs: { type: Boolean },
        meatNotFish: { type: Boolean },
        fish: { type: Boolean },
        shellfish: { type: Boolean },
        gluten: { type: Boolean },
        soy: { type: Boolean },
        sesame: { type: Boolean },
        alcohol: { type: Boolean }
    }
}