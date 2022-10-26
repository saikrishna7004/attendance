import { Schema, model, models } from 'mongoose';

const netraSchema = new Schema({
    netra: {
        type: Number,
        required: true,
        unique: true,
    },
    rollno: {
        type: String,
        required: true,
        unique: true,
    },
    class: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    section: {
        type: String,
        required: true,
    }
});

const Netra = models.Netra || model('Netra', netraSchema);

export default Netra;
