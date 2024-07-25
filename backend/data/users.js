import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Rajesh Sharma',
    email: 'raj@email.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Victor',
    email: 'vic@email.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
