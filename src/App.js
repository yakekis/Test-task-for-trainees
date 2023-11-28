import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Column } from './components/Column';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { handleDragEndRed, syncTask } from './redux/reducer';

export const initialData = {
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Planned',
      color: '#ff4244',
    },
    'column-2': {
      id: 'column-2',
      title: 'In Working',
      color: '#b4a6ff',
    },

    'column-3': {
      id: 'column-3',
      title: 'Testing',
      color: '#41ffbb',
    },
    'column-4': {
      id: 'column-4',
      title: 'Release',
      color: '#f5df8b',
    }
  },
  columnOrder: ['column-1', 'column-2', 'column-3', 'column-4'],
  
};

function App() {
  const dispatch = useDispatch();
  const data = useSelector(state => state.toolkit)
  useEffect(() => {
    dispatch(syncTask())
  },[])
  const [columns, setColumns] = useState(initialData.columns);
  

  function handleDragEnd(result) {
    const { destination, source, draggableId } = result;
    
    if (!destination || destination.droppableId === source.droppableId) {
      return 1;
    }
    
    dispatch(handleDragEndRed({destinationColumn:destination.droppableId, sourceColumn:source.droppableId, taskId:draggableId}))
  }
  
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Box minHeight={'100vh'} overflow={'hidden'} bg={'blackAlpha.600'} p={5}>
          <SimpleGrid columns={[1,null,2,4]} width={'fit-content'} margin={'auto'} justifyContent={"space-between"} direction="row">
            {initialData.columnOrder.map((columnId) => {
              const column = columns[columnId];
              const tasks = data[columnId].map(taskId => data[taskId]);
              return <Column column={column} tasks={tasks} columnId={column.id} />;
            })}
          </SimpleGrid>
      </Box>
    </DragDropContext>
  );
}

export default App;
