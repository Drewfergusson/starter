import { useAddTaskMutation } from "@app/graphql";
import { Button,Form, Input, Modal, Select } from 'antd';
import React from 'react';
const { Option } = Select;

function AddTask() {
  const [ isVisible, setIsVisible ] = React.useState(false);
  const [ error, setError ] = React.useState(null);
  const [ addTask ] = useAddTaskMutation();

  const createTask = async (formData) => {
    setIsVisible(false);
    console.log(formData);

    // try {
    //   await addTask({variables: formData});
    // } catch (err) {
    //   console.warn(err);
    //   setError("There was an error creating the task");
    // }
  }

  return (
    <div>
    <Button onClick={() => setIsVisible(true)}>Create Task</Button>
    <Modal visible={isVisible} onOk={createTask} onCancel={() => setIsVisible(false)}>
      <Form onFinish={createTask}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{required: true, message: "Enter a title"}]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{required: true, message: "Enter a description"}]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="status"
          rules={[{required: true, message: "Select a status"}]}
        >
          <Select>
            <Option value="TO_DO">To Do</Option>
            <Option value="IN_PROGRESS">In Progress</Option>
            <Option value="DONE">Done</Option>
          </Select>
        </Form.Item>
        <Button type="primary" htmlType="submit">Create</Button>
      </Form>
    </Modal>
    </div>
  );
}

export default AddTask;
