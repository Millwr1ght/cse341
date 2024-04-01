export const item = (mongoose) => {
    const itemSchema = mongoose.Schema({
        name: {
            type: String, required: true, maxLength: 100
        },
        description: String,
        author: String,
        //image: ???,
        statsDelta: {
            exp: Number,
            hp: Number,
            def: Number,
            atk: Number,
            speed: Number,
            gold: Number,
        },
    })
    return mongoose.model('items', itemSchema);
}