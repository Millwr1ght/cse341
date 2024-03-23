export const item = (mongoose) => {
    const itemSchema = mongoose.Schema({
        name: {
            type: String, required: true, maxLength: 100
        },
        type: String,
    })
}