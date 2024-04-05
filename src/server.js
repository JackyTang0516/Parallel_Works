const app = require('./app');
const { exec } = require('child_process');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  // Server Startup Time should be considered before starting MongoDB.
  connectToMongoDB();
});

const connectToMongoDB = (retryCount = 0) => {
  mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => {
      console.error(`Failed to connect to MongoDB, trying to connect... ${error}. Retry count: ${retryCount}`);
      startMongoDB()
        .then(stdout => {
          console.log(stdout);
          connectToMongoDB(retryCount + 1);
        })
        .catch(error => console.error(error));
    });
};

const startMongoDB = () => {
  return new Promise((resolve, reject) => {
    exec('terraform apply -auto-approve', { cwd: '/Users/jackytang/Desktop/parallel_works/Parallel_Works/terraform' }, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        reject(error);
      } else {
        console.log('MongoDB container started successfully');
        resolve(stdout);
      }
    });
  });
};