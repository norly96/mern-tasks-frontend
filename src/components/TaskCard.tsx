import { IconNotes } from "@tabler/icons-react";
import { Task } from "../types/type";
import {
  chakra,
  Box,
  Stack,
  Link,
  HStack,
  Text,
  Container,
  GridItem,
  Avatar,
  Tooltip,
  StackProps,
  Divider,
  useColorModeValue,
  Button,
  Heading,
} from "@chakra-ui/react";
import { useTasks } from "../context/TaskContext";
// Here we have used react-icons package for the icons

interface TaskProps {
  task: Task;
}

const TaskCard = ({ task }: TaskProps) => {
  const { deleteTask } = useTasks();
  return (
    <GridItem maxW="5xl" p={{ base: 5, md: 6 }}>
      <Stack
        w="17rem"
        spacing={2}
        p={4}
        border="1px solid"
        borderColor={useColorModeValue("gray.400", "gray.600")}
        rounded="md"
        margin="0 auto"
        _hover={{
          boxShadow: useColorModeValue(
            "0 4px 6px rgba(160, 174, 192, 0.6)",
            "0 4px 6px rgba(9, 17, 28, 0.4)"
          ),
        }}
      >
        <HStack justifyContent="start" alignItems="center">
          <IconNotes />
          <chakra.h1 fontSize="xl" fontWeight="bold">
            {task.title}
          </chakra.h1>
        </HStack>

        <Text fontSize="md" color="gray.500">
          {task.description}
        </Text>

        <Text fontSize="md" color="gray.500">
          Created: {new Date(task.date).toLocaleDateString()}
        </Text>

        <Divider />
        <Heading as="h1">
          {task.status === true ? (
            <Text fontSize="md" color="green.500">
              Complete
            </Text>
          ) : (
            <Text fontSize="md" color="red.500">
              Incomplete
            </Text>
          )}
        </Heading>

        <HStack justifyContent="space-beetwen" alignItems="center">
          <Button colorScheme="red" onClick={() => deleteTask(task._id)}>
            Delete
          </Button>
          <Button colorScheme="green">Edit</Button>
        </HStack>
      </Stack>
    </GridItem>
  );
};

export default TaskCard;
