import { Box, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { Column } from './components/Column';
import { DragDropContext } from 'react-beautiful-dnd';

export const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Task 1', date: '12.12.2023' },
    'task-2': { id: 'task-2', content: 'Task 2', date: '13.12.2023' },
    'task-3': { id: 'task-3', content: 'Task 3', date: '13.12.2023' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Planned',
      taskIds: ['task-1', 'task-2', 'task-3'],
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
  count: [3],
};

function App() {
  const [columns, setColumns] = useState(initialData.columns);
  const [tasks, setTasks] = useState(initialData.tasks);

  function deleteItem(column,task1) {
    //const task1 = 'task-1';
    //console.log(columns)
    //column = 'column-1'
    const updatedTaskIds = columns[column].taskIds = columns[column].taskIds.filter((taskid)=> taskid !== task1);
    
      setColumns({
             ...columns,
             [column]: {
                  ...columns[column],
                 taskIds: updatedTaskIds
             }
     });
  }

  function pushItem(column, value){
    let num = parseInt(initialData.count);
    num++;
    initialData.count = num;
    const task0 = 'task-';
    const myTask = task0.concat(initialData.count);
    //const myTask = 'task-4';
    const updatedTaskIds = columns[column].taskIds
    updatedTaskIds.push(myTask);
    const updatedTasks = tasks;
    updatedTasks[myTask] = {'id': myTask, 'content': value,'date':'12.12.2023'};
    //console.log(updatedTasks);
    //console.log(updatedTaskIds);

    setColumns({
             ...columns,
             [column]: {
                  ...columns[column],
                 taskIds: updatedTaskIds
             }
     });

    setTasks(updatedTasks);
    
  }

  function handleDragEnd(result) {
    const { destination, source, draggableId } = result;
    
    if (!destination || destination.droppableId === source.droppableId) {
      return 1;
    }
    const updatedTaskIds = columns[destination.droppableId].taskIds;
    updatedTaskIds.push(draggableId);
    setColumns({
      ...columns,
      [destination.droppableId]: {
           ...columns[destination.droppableId],
          taskIds: updatedTaskIds
      }
  });

  const updatedTaskIds2 = columns[source.droppableId].taskIds = columns[source.droppableId].taskIds.filter((taskid)=> taskid !== draggableId);
    
      setColumns({
             ...columns,
             [source.droppableId]: {
                  ...columns[source.droppableId],
                 taskIds: updatedTaskIds2
             }
     });

  }
  
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Box minHeight={'100vh'} overflow={'hidden'} bg={'blackAlpha.600'} p={5}>
          <Flex width={'fit-content'} margin={'auto'} justifyContent={"space-between"} direction="row">
            {initialData.columnOrder.map((columnId) => {
              const column = columns[columnId];
              const tasks = column.taskIds.map(taskId => initialData.tasks[taskId]);
              return <Column column={column} tasks={tasks} setTasks={deleteItem} columns={columns} setColumns={setColumns} pushItem={pushItem} columnId={column.id} />;
            })}
          </Flex>
      </Box>
    </DragDropContext>
  );
}

export default App;
