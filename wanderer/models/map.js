export const map = (mongoose) => {
    const mapSchema = mongoose.Schema({
        name: {
            type: String, required: true, maxLength: 100
        },
        tilemap: [Number]
    })
}