import { Box, Grid, Heading, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import TaskCard from "./TaskCard";
import { useTasks } from "../context/TaskContext";

const ContainerTaskPage = () => {
  const { tasks, getTasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, [tasks]);

  return (
    <Box ml={{ base: 0, md: 60 }} p="4">
      {tasks.length === 0 && (
        <Flex
          justifyContent={"center"}
          mt={"-20"}
          h={"100vh"}
          alignItems={"center"}
        >
          <Heading>NO TASKS</Heading>
        </Flex>
      )}

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
