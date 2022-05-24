const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

 
  await User.deleteMany({});

//   await Thought.deleteMany({});

  // Create empty array to hold the students
  const users = [
      {
          username: 'test1',
          email: 'test1@test.com'
      },
      {
          username: 'test2',
          email: 'test2@test.com'
      },
      {
          username: 'test3',
          email: 'test3@test.com'
      }
  ];

  // Add students to the collection and await the results
  await User.collection.insertMany(users);

  // Add courses to the collection and await the results
//   await Course.collection.insertOne({
//     courseName: 'UCLA',
//     inPerson: false,
//     students: [...students],
//   });

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
//   console.table(assignments);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
