import connectMongo from '../../utils/connectMongo';
import Netra from '../../models/netra';

export default async function handler(req, res) {
    console.log(req.body, req.method)
    try {
        await connectMongo();
        console.log('CONNECTED TO MONGO');
        var data = await Netra.updateMany({"netra": {"$gte": 1}}, { "$set": { "class": "CSE", "year": 2, "section": "A" } }).then((data)=>{
            console.log(data)
        })
        return res.status(200).json({data})
    } catch (error) {
        console.log(error);
    }
}