import mongoose, { mongo } from 'mongoose'


const connectionUrl = process.env.MONGO_URI;
mongoose
    .connect(connectionUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
    })
    .then(() => {
        console.log(`Database connection established`, mongoose.connection.host)
    })
    .catch((err) => {
        console.log(`error in connection to database`, err)
    })

export default mongoose.connection;