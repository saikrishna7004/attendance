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
            var myRoll = req.body.rollno
            if (roll) {
                console.log(roll)
                myRoll = roll.netra
            }
            let start = performance.now()
            console.log("m32 start", start)
            try {
                var result = await axios.post("http://teleuniv.in/netra/api.php", {
                    "method": "32",
                    "rollno": myRoll
                })
                var data = await result.data
                let end = performance.now()
                console.log("m32 end", end)
                console.log("m32", (end-start)/1000)
                return res.status(200).json(data)
            } catch (error) {
                console.log("Internal server error", error)
                return res.status(500).json({ error: 'Internal Server Error', msg: error })
            }            
        } catch (error) {
            console.log(error);
            return res.status(500).json(error)
        }
    }
    return res.status(405).json({ error: 'Invalid Method ' + req.method })
}