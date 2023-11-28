import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../redux/reducer';

export function Task({ task,columnId }) {
  const dispatch = useDispatch();

  return (
    <Draggable draggableId={task.id} index={0}>
      {(provided) => (
      <Box
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        w={'100%'}
        p={2}
        bg="blue.100"
        borderRadius="md"
        mb={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex flexDirection="column">
          <Text>{task.content}</Text>
          <Text fontSize="sm" color="gray.600">{task.date}</Text>
        </Flex>
        <IconButton
          icon={<DeleteIcon />}
          variant="ghost"
          size="sm"
          onClick={(e) => dispatch(deleteTask({column:columnId,task:task.id}))}
          aria-label="Delete Task" />
      </Box>
      )}
    </Draggable>
  );
}
