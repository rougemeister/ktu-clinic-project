const express = require ('express')

const cors= require ('cors')
const mongoose = require ('mongoose')


const app = express();
app.use(express.json());

const userRoutes = require('./src/routes/userRoutes');
app.use('/api/users', userRoutes);
const PORT = 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to the KTU Clinic API');
});

app.listen(PORT, (error) => {
  if (error) {
    console.error(`Error starting server: ${error}`);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});



connectToDatabase()

async function connectToDatabase() {
    try {
        const connectionString = 'mongodb+srv://saltzman7070:FdUMa2xkfhYadiAg@cluster0.3yd2lsw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error}`);
    }
}
