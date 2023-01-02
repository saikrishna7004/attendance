import { Schema, model, models } from 'mongoose';

const feedbackSchema = new Schema({
    rollno: {
        type: String
    },
    feedback: {
        type: String
    },
    name: {
        type: String
    },
    phone: {
        type: String
    }
}, { timestamps: true });

const Feedback = models.Feedback || model('Feedback', feedbackSchema);

export default Feedback;
