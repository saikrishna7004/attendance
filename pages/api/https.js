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
        try {
            var result = await axios.post("http://teleuniv.in/netra/api.php", req.body)
            var data = await result.data
            return res.status(200).json(data)
        } catch (error) {
            console.log(error);
            return res.status(500).json(error)
        }
    }
    return res.status(405).json({ error: 'Invalid Method ' + req.method })
}