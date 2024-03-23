export const user = (mongoose) => {
    const userSchema = mongoose.Schema({
        username: {
            type: String, required: true, maxLength: 100
        },
        password: {
            type: String, required: true, maxLength: 100
        },
        profileIsPublic: Boolean,
        playerData: {
            exp: Number,
            inventory: [{ item: String, quantity: Number }]
        }
    })
}