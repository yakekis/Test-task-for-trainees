import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

export function Task({ task, handleDelete }) {
  return (
    <Box
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
        onClick={() => { }}
        aria-label="Delete Task" />
    </Box>
  );
}
