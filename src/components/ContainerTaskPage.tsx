import { Box, Grid, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Task } from "../types/type";
import TaskCard from "./TaskCard";
import { useTasks } from "../context/TaskContext";

/* interface Props {
  tasks: Task[];
  getTasks: () => Promise<void>;
}
 */
const ContainerTaskPage = () => {
  const { tasks, getTasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, []);

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
