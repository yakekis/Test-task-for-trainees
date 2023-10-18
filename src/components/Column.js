import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input, FormControl, FormLabel } from "@chakra-ui/react";
import { Task } from './Task';

export function Column({ column, tasks, columns, setColumns }) {
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [currentColumnId, setCurrentColumnId] = useState(null);


  return (
    <Flex
      spacing={2}
      width="250px"
      minHeight="600px"
      p={2}
      bg="blackAlpha.600"
      borderRadius="md"
      flexDirection="column" alignItems="start" m={2}>
      <Text w={"100%"} borderRadius={"md"} display='flex' justifyContent={"center"} alignItems={"center"} minHeight={'50px'} textAlign={"center"} color="white" bg={column.color} mb={2} fontWeight="bold">{column.title}</Text>
      <VStack
        spacing={2}
        width="100%"
        transition="background-color 0.2s ease"
      >
        {column.taskIds.map((taskId, index) => {
          const task = tasks.find(t => t.id === taskId);
          return (
            <Box
              width={'100%'}
            >
              <Task handleDelete={() => { }} task={task} />
            </Box>
          );
        })}
      </VStack>
      <Button onClick={() => {
        setCurrentColumnId(column.id);
        setIsAddTaskModalOpen(true);
      }}>
        Добавить задачу
      </Button>
      <Modal isOpen={isAddTaskModalOpen} onClose={() => setIsAddTaskModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Добавить задачу</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Содержимое задачи</FormLabel>
              <Input value={''} onChange={e => {}} placeholder="Введите содержимое задачи..." />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={() => setIsAddTaskModalOpen(false)}>
              Отменить
            </Button>
            <Button colorScheme="blue" onClick={() => {}}>Добавить</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
