import Task from '../../lib/db/models/task';
import { withIronSession } from 'next-iron-session';

/*
  TODO: look for a better way, this is becoming too repetitive,
  having to add this wrapper everytime I need to check anything auth-related

  Middlewares in Next.js?
*/
export default withIronSession(
  async (req, res) => {
    const user = req.session.get('user');
    const taskData = { title: req.body.title, description: req.body.description, techStack: req.body.techStack };

    if (!user) res.status(403).end();

    try {
      const newTask = await generateTaskInstance(taskData, user.email);

      await newTask.save();
      return res.status(201).send({ message: `${newTask.title} created!` });
    } catch (e) {
      res.status(500).send(e.message);
    }
  },
  {
    cookieName: 'MYSITECOOKIE',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production' ? true : false,
    },
    password: process.env.APPLICATION_SECRET,
  }
);

const generateTaskInstance = async (taskData, user) => {
  let newTask = new Task();

  newTask.title = taskData.title;
  newTask.description = taskData.description;
  newTask.techStack = taskData.techStack;
  newTask.createdBy = user;
  // TODO: check if there is a way to have it set by default without adding it explicitly
  newTask.joinedBy = null;

  return newTask;
};
