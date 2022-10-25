import connectMongo from '../../utils/connectMongo';
import Netra from '../../models/netra';

export default async function handler(req, res) {
    try {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        console.log('CREATING DOCUMENT');
        const netra = await Netra.create(req.body);
        console.log('CREATED DOCUMENT');

        res.json({ netra });
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}
