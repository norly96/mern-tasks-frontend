import { IconNotes } from "@tabler/icons-react";
import { Task } from "../types/type";
import {
  chakra,
  HStack,
  Text,
  GridItem,
  Divider,
  useColorModeValue,
  Button,
  Heading,
  Stack,
  Link,
} from "@chakra-ui/react";
import { useTasks } from "../context/TaskContext";

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
        <Heading as="h1" m={2}>
          {task.status === true ? (
            <Text fontSize="md" color="green.500">
              Completed
            </Text>
          ) : (
            <Text fontSize="md" color="red.500">
              Pending
            </Text>
          )}
        </Heading>

        <HStack justifyContent="space-beetwen" alignItems="center">
          <Button colorScheme="red" onClick={() => deleteTask(task._id)}>
            Delete
          </Button>
          <Button colorScheme="green">
            <Link href={`/tasks/${task._id}`}>Edit</Link>
          </Button>
        </HStack>
      </Stack>
    </GridItem>
  );
};

export default TaskCard;
