import mongoose from 'mongoose';

const MONGO_URI = 'mongodb://127.0.0.1:27017/devflow';

async function run() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');
        
        const db = mongoose.connection.db;
        const boards = await db.collection('boards').find({}).toArray();
        
        console.log('Boards found:', boards.length);
        boards.forEach(b => {
            console.log(`ID: ${b._id}, Name: ${b.name}, Workspace: ${b.workspace}`);
        });
        
        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
}

run();
