import mongoose from 'mongoose';
import Feedback from '../../models/feedback';

const connectMongo = async () => mongoose.connect(process.env.MONGO_URI);
connectMongo()

export default async function handler(req, res) {
    try {
        console.log('CREATING DOCUMENT');
        const feedback = await Feedback.create(req.body);
        console.log('CREATED DOCUMENT');
        res.json({ feedback });
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}
