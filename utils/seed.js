const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

 
  await User.deleteMany({});

  await Thought.deleteMany({});

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

//   const thoughts = [
//       {
//           username: 'test1',
//           thoughtText: 'this is a thought from test 1'
//       },
//       {
//           username: 'test2',
//           thoughtText: 'this is a thought from test 2'
//       },
//       {
//           username: 'test3',
//           thoughtText: 'this is a thought from test 3'
//       },
//   ]

  // Add students to the collection and await the results
  await User.collection.insertMany(users);
//   await Thought.collection.insertMany(thoughts);

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
//   console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
