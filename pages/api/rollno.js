import connectMongo from '../../utils/connectMongo';
import Netra from '../../models/netra';
import axios from 'axios';

async function connect() {
    await connectMongo();
    console.log('CONNECTED TO MONGO');
}
connect();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        console.log(req.body)
        if (!req.body.rollno) return res.status(400).json({ error: 'Empty Field Roll No.' })
        try {
            var roll = await Netra.findOne({ rollno: req.body.rollno.toLocaleString().toUpperCase() });
            var myRoll = null
            if (roll) {
                console.log(roll)
                myRoll = roll.netra
            }
            return res.status(200).json({rollno: myRoll})
        } catch (error) {
            console.log(error);
            return res.status(500).json(error)
        }
    }
    return res.status(405).json({ error: 'Invalid Method ' + req.method })
}