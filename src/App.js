import { Box, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { Column } from './components/Column';

export const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Task 1', date: '12.12.2023' },
    'task-2': { id: 'task-2', content: 'Task 2', date: '13.12.2023' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Planned',
      taskIds: ['task-1', 'task-2'],
      color: '#ff4244',
    },
    'column-2': {
      id: 'column-2',
      title: 'In Working',
      taskIds: [],
      color: '#b4a6ff',
    },

    'column-3': {
      id: 'column-3',
      title: 'Testing',
      taskIds: [],
      color: '#41ffbb',
    },
    'column-4': {
      id: 'column-4',
      title: 'Release',
      taskIds: [],
      color: '#f5df8b',
    }
  },
  columnOrder: ['column-1', 'column-2', 'column-3', 'column-4'],
};

function App() {
  const [columns, setColumns] = useState(initialData.columns);
  return (
    <Box minHeight={'100vh'} overflow={'hidden'} bg={'blackAlpha.600'} p={5}>
        <Flex width={'fit-content'} margin={'auto'} justifyContent={"space-between"} direction="row">
          {initialData.columnOrder.map((columnId) => {
            const column = columns[columnId];
            const tasks = column.taskIds.map(taskId => initialData.tasks[taskId]);
            return <Column column={column} tasks={tasks} columns={columns} setColumns={setColumns} key={column.id} />;
          })}
        </Flex>
    </Box>
  );
}

export default App;
