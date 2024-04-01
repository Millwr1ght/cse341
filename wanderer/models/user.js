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
            inventory: [{ item: String, quantity: Number }],
            stats: {
                exp: Number,
                hp: Number,
                def: Number,
                atk: Number,
                speed: Number,
                gold: Number,
            }
        }
    })
    return mongoose.model('users', userSchema);
}