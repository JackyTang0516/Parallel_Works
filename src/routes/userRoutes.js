const express = require('express');
const User = require('../models/user');
const { exec } = require('child_process');
//child_process is used to execute shell commands from Node.js
const router = express.Router();
//router is used to define routes in Express.js
const startMongoDB = () => {
  return new Promise((resolve, reject) => {
    exec('terraform apply -auto-approve', { cwd: '/Users/jackytang/Desktop/parallel_works/Parallel_Works/terraform' }, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        reject(error);
      } else {
        resolve(stdout);
      }
    });
  });
};

const stopMongoDB = () => {
  return new Promise((resolve, reject) => {
    exec('terraform destroy -auto-approve', { cwd: '/Users/jackytang/Desktop/parallel_works/Parallel_Works/terraform' }, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        reject(error);
      } else {
        resolve(stdout);
      }
    });
  });
};

router.get('/users', async (req, res) => {
  try {
    await startMongoDB();
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).send('Failed to start MongoDB container');
  }
});

router.post('/users', async (req, res) => {
  try {
    await startMongoDB();
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).send('Failed to start MongoDB container');
  }
});

router.get('/status', (req, res) => {
  exec('docker ps', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      res.status(500).send('Failed to get Docker container status');
    } else {
      res.send(stdout);
    }
  });
});

module.exports = router;


// Start mongodb directly by docker
// const startMongoDB = () => {
//   return new Promise((resolve, reject) => {
//     exec('docker inspect -f "{{.State.Running}}" my-mongo', (error, stdout, stderr) => {
//       if (error) {
//         console.error(`exec error: ${error}`);
//         reject(error);
//       } else if (stdout.includes('false')) {
//         exec('docker start my-mongo', (error, stdout, stderr) => {
//           if (error) {
//             console.error(`exec error: ${error}`);
//             reject(error);
//           } else {
//             resolve(stdout);
//           }
//         });
//       } else {
//         resolve('MongoDB is already running');
//       }
//     });
//   });
// };
