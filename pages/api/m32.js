import connectMongo from '../../utils/connectMongo';
import Netra from '../../models/netra';

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
            var result = await fetch("http://teleuniv.in/netra/api.php", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify({
                    "method": "32",
                    "rollno": myRoll
                })
            }).catch(error => res.status(500).json({ error: 'Internal Server Error', msg: error }))
            var data = await result.json()
            let end = performance.now()
            console.log("m32", (end-start)/1000)
            return res.status(200).json(data)
        } catch (error) {
            console.log(error);
            return res.status(500).json(error)
        }
    }
    return res.status(405).json({ error: 'Invalid Method ' + req.method })
}