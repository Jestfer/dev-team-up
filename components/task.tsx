import { Button, Image, Modal, Form } from 'semantic-ui-react';

const Task = () => (
  <div className="modal-button">
    <Modal trigger={<Button>New Task</Button>}>
      <Modal.Header>Add a new Task</Modal.Header>
      <Modal.Content image>
        <Image wrapped size="small" src="task.png" />
        <div className="desc-fix">
          <Modal.Description>
            <Form>
              <Form.Input placeholder="Task Title" />
              <Form.Input placeholder="Tech Stack" />
              <Form.TextArea placeholder="Task Description" />
            </Form>
          </Modal.Description>
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button primary>Create</Button>
        <Button secondary>Close</Button>
      </Modal.Actions>
    </Modal>

    <style jsx>
      {`
        .modal-button {
          margin-right: 0.5em;
        }

        .desc-fix {
          padding-left: 2em;
          flex: 1 0 auto !important;
        }
      `}
    </style>
  </div>
);

export default Task;
