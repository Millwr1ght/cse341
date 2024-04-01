export const encounter = (mongoose) => {
    const encounterSchema = mongoose.Schema({
        title: {
            type: String, required: true, maxLength: 100
        },
        flavor: { type: String, maxLength: 200 },
        description: { type: String, maxLength: 200 },
        author: String,
        date: { type: Date, default: Date.now },
        userSubmission: Boolean,
    })
    return mongoose.model('encounters', encounterSchema);
}