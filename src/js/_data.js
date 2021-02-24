import User from './User';
import Admin from './Admin';

const DATA = {
  events: [
    {
      title: 'Hello world',
      day: 'Mon',
      time: '12:00',
      participants: ['Ann', 'Alex', 'Steve'],
    },
    {
      title: 'Plaining session',
      day: 'Wed',
      time: '13:00',
      participants: ['Bob', 'Maria', 'Elizabeth', 'Ann'],
    },
  ],
  users: [
    new Admin('Alex', 'boy_1.png'),
    new Admin('Elizabeth', 'girl_1.png'),
    new User('Steve', 'boy_2.png'),
    new User('Ann', 'girl_2.png'),
    new User('Maria', 'girl_3.png'),
    new User('Bob', 'boy_3.png'),
  ],
};

export function getUserInfo(name) {
  return DATA.users.find((user) => user.name === name);
}

export default DATA;
