import { useCurrentTasksQuery } from '@app/graphql';
import { Table } from 'antd';
import React from 'react';

function TaskList() {
  const { data, loading, error } = useCurrentTasksQuery();
  if(error) {
    return <div>Error</div>;
  }
  if(loading || !data) {
    return <div>Loading...</div>;
  }

  const columns = [ 'title', 'description', 'status'].map(item => {
    return { title: item.toUpperCase(), dataIndex: item, key: item }
  });

  const rows = data.tasks.edges.map(({node}, index) => {
    return {
      key: index + 1,
      title: node.title,
      description: node.description,
      status: node.status.split("_").join(" ")
    }
  })
  return (
    <Table dataSource={rows} columns={columns}></Table>
  )
}

export default TaskList
