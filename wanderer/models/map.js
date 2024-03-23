export const map = (mongoose) => {
    const mapSchema = mongoose.Schema({
        name: {
            type: String, required: true, maxLength: 100
        },
        tilemap: [Number],
        height: Number,
        width: Number,
    })
}

/* for example:
{
    name: crossroads
    tilemap: [
        7, 7, 7, 7, 7, 0, 7, 7,
        7, 4, 4, 7, 7, 1, 7, 7,
        7, 4, 4, 7, 7, 0, 7, 7,
        7, 7, 7, 7, 7, 0, 0, 0,
        7, 7, 7, 0, 0, 0, 7, 7,
        0, 0, 1, 0, 7, 7, 7, 7,
        7, 7, 7, 0, 7, 7, 7, 7,
        7, 7, 7, 0, 7, 7, 7, 7,
    ],
    height: 8,
    width: 8,
}

*/