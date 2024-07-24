import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  Switch,
  Textarea,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Task } from "../types/type";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useTasks } from "../context/TaskContext";

const UpdateTaskPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<Task>();

  const navigate = useNavigate();
  const { updateTask, getTask } = useTasks();
  const params = useParams();

  const onSubmit = handleSubmit((data: Task) => {
    try {
      if (params.id) updateTask(params.id, data);
      navigate("/tasks");
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id);

        setValue("title", task.title);
        setValue("description", task.description);
        setValue("status", task.status);
      }
    };
    loadTask();
  }, []);
  return (
    <Box
      onSubmit={onSubmit}
      borderWidth="1px"
      rounded="lg"
      shadow="1px 1px 3px rgba(0,0,0,0.3)"
      maxWidth={800}
      p={6}
      m="10px auto"
      as="form"
    >
      <Heading mb={7}>Update Task</Heading>

      <Box pb={6}>
        <FormControl id="title">
          <FormLabel>Title</FormLabel>
          <Input
            placeholder="Title"
            {...register("title", { required: true })}
          />
        </FormControl>

        <FormControl mt={4} id="description">
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="Description"
            {...register("description", { required: true })}
          />
        </FormControl>

        <FormControl display="flex" alignItems="center" mt={4} id="status">
          <FormLabel htmlFor="status" mb="0">
            Completed:
          </FormLabel>
          <Switch id="status" colorScheme="green" {...register("status")} />
        </FormControl>
      </Box>

      <HStack>
        <Button
          colorScheme="green"
          mr={3}
          isLoading={isSubmitting}
          type="submit"
        >
          Update
        </Button>
        <Button>
          <Link href="/tasks">Cancel</Link>
        </Button>
      </HStack>
    </Box>
  );
};

export default UpdateTaskPage;
