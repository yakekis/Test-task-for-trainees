import { Box, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input, FormControl, FormLabel } from "@chakra-ui/react";
import { Task } from './Task';
import { Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../redux/reducer';

export function Column({ column, tasks,columnId }) {
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [currentColumnId, setCurrentColumnId] = useState(null);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const data = useSelector(state => state.toolkit)

  return (
    <Droppable droppableId={columnId}>
        {(provided) =>(
      <Flex
      ref={provided.innerRef}
      {...provided.droppableProps}
        spacing={2}
        width="250px"
        minHeight="300px"
        p={2}
        bg="blackAlpha.600"
        borderRadius="md"
        flexDirection="column" alignItems="start" m={2}>
        <HStack>
          <Text w={"180px"} borderRadius={"md"} display='flex' justifyContent={"center"} alignItems={"center"} minHeight={'50px'} textAlign={"center"} color="white" bg={column.color} mb={2} fontWeight="bold">{column.title}</Text>
          <Text w={"45px"} borderRadius={"md"} display='flex' justifyContent={"center"} alignItems={"center"} minHeight={'50px'} textAlign={"center"} color="white" bg={column.color} mb={2} fontWeight="bold">{data[column.id].length}</Text>
        </HStack>
        
        <VStack
          
          spacing={2}
          width="100%"
          transition="background-color 0.2s ease"
        >
          {data[columnId].map((taskId, index) => {
            const task = tasks.find(t => t.id === taskId);
            return (
              <Box
                width={'100%'}
              >
                <Task task={task} columnId={columnId} />
                {provided.placeholder}
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
                <Input value={value} onChange={e => {setValue(e.target.value);}} placeholder="Введите содержимое задачи..." />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={() => setIsAddTaskModalOpen(false)}>
                Отменить
              </Button>
              <Button colorScheme="blue" onClick={(e) => {dispatch(addTask({column:columnId,value:value}))}}>Добавить</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
      )}
  </Droppable>
  );
}
