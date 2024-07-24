import { Box, Grid, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import TaskCard from "./TaskCard";
import { useTasks } from "../context/TaskContext";
import { useAuth } from "../context/AuthContext";

const ContainerTaskPage = () => {
  const { tasks, getTasks } = useTasks();
  const { user } = useAuth();

  useEffect(() => {
    getTasks();
  }, [tasks]);

  return (
    <Box ml={{ base: 0, md: 60 }} p="4">
      {tasks.length === 0 && <Text>NO TASKS</Text>}

      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
      >
        {tasks.map((task) => (
          <TaskCard task={task} key={task._id} />
        ))}
      </Grid>
    </Box>
  );
};

export default ContainerTaskPage;
