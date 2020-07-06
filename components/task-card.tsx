import { Card, Image } from 'semantic-ui-react';
import Head from 'next/head';

const tasks = [
  {
    Author: {
      email: 'josu@test.com',
      mainProgrammingLanguage: 'Angular',
      name: 'josu',
    },
    Users: [
      {
        email: 'josu@test.com',
        mainProgrammingLanguage: 'Angular',
        name: 'josu',
      },
      {
        email: 'test@test.com',
        mainProgrammingLanguage: 'test',
        name: 'test',
      },
    ],
    createdAt: '2020-05-30T19:53:16.501Z',
    createdBy: 'josu',
    description: 'Desc',
    id: 1,
    techStack: 'Angular',
    title: 'Josu Task',
    updatedAt: '2020-05-30T19:53:16.501Z',
  },

  {
    Author: {
      email: 'test@test.com',
      mainProgrammingLanguage: 'test',
      name: 'test',
    },
    Users: [
      {
        email: 'test@test.com',
        mainProgrammingLanguage: 'test',
        name: 'test',
      },
      {
        email: 'josu@test.com',
        mainProgrammingLanguage: 'Angular',
        name: 'josu',
      },
    ],
    createdAt: '2020-06-30T19:53:16.501Z',
    createdBy: 'test',
    description: 'Desc',
    id: 2,
    techStack: 'React',
    title: 'Test Task',
    updatedAt: '2020-06-30T19:53:16.501Z',
  },
];

// TODO: check if avatars from Gravatar or from user profile section, or maybe just Tech Stack Logo?
const TaskCard = () => {
  // TODO: add model for task
  const taskList = tasks.map((task) => (
    <Card centered fluid>
      <Card.Content>
        <Image floated="right" size="mini" src="lore-ipsum-logo.jpg" />
        <Card.Header>{task.title}</Card.Header>
        <Card.Meta>{task.techStack}</Card.Meta>
        <Card.Description>{task.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <i>Created by</i>: {task.createdBy}
        <br />
        <i>Active users</i>: TODO!!!!!
      </Card.Content>
    </Card>
  ));

  return (
    <>
      <Head>
        <title>Dev Team Up</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
        />
      </Head>
      <div className="tasks-container">{taskList}</div>

      <style jsx>{`
        .tasks-container {
          padding-top: 100px;
          margin: auto 25%;
        }
      `}</style>
    </>
  );
};

export default TaskCard;
