import { useAddTaskMutation } from "@app/graphql";
import { useApolloClient } from "@apollo/client";
import { Button,Form, Input, Modal, Select } from 'antd';
import React from 'react';
const { Option } = Select;

/**
 * AddTask contains the button and modal for creating tasks.
 * Add Task handles the request to create tasks
 */

function AddTask(props) {
  const [ isVisible, setIsVisible ] = React.useState(false);
  const client = useApolloClient();
  const [ error, setError ] = React.useState(null);
  const [ addTask ] = useAddTaskMutation();

  const createTask = async (formData) => {
    setIsVisible(false);
    try {
      await addTask({variables: formData});
      client.resetStore();
      props.onSuccess();

    } catch (err) {
      console.warn(err);
      setError("There was an error creating the task");
    }
  }

  return (
    <div>
    <Button onClick={() => setIsVisible(true)}>Create Task</Button>
    <Modal
      visible={isVisible} onOk={createTask}
      onCancel={() => setIsVisible(false)}
      footer={[<Button onClick={() => setIsVisible(false)}>Cancel</Button>]}
    >
      <Form onFinish={createTask}>
        <Form.Item
          label="Title"
          name="title"
          key="title"
          rules={[{required: true, message: "Enter a title"}]}
        >
          <Input placeholder="add a title" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          key="description"
          rules={[{required: true, message: "Enter a description"}]}
        >
          <Input placeholder="add a description" />
        </Form.Item>
        <Form.Item
          name="status"
          key="status"
          rules={[{required: true, message: "select a status"}]}
        >
          <Select placeholder="Select current status">
            <Option value="TO_DO">To Do</Option>
            <Option value="IN_PROGRESS">In Progress</Option>
            <Option value="DONE">Done</Option>
          </Select>
        </Form.Item>
        <Button type="primary" htmlType="submit">Create Task</Button>
      </Form>
    </Modal>
    </div>
  );
}

export default AddTask;
