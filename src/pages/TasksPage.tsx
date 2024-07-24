import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  Switch,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Task } from "../types/type";
import { useTasks } from "../context/TaskContext";
import ContainerTaskPage from "../components/ContainerTaskPage";
import MobileNav from "../components/ui/MobileNav";
import SidebarContent from "../components/ui/SidebarContent";

const TaskPage = () => {
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<Task>();

  const { createTask } = useTasks();

  const onSubmit = handleSubmit((data: Task) => {
    createTask(data);
    reset();
  });

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={onDrawerClose}
        onModalOpen={onModalOpen}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isDrawerOpen}
        placement="left"
        onClose={onDrawerClose}
        returnFocusOnClose={false}
        onOverlayClick={onDrawerClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onDrawerClose} onModalOpen={onModalOpen} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onDrawerOpen} />

      <Modal isOpen={isModalOpen} onClose={onModalClose}>
        <form onSubmit={onSubmit}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create new Task</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
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

              <FormControl
                display="flex"
                alignItems="center"
                mt={4}
                id="status"
              >
                <FormLabel htmlFor="status" mb="0">
                  Completed:
                </FormLabel>
                <Switch
                  id="status"
                  colorScheme="green"
                  {...register("status")}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="green"
                mr={3}
                isLoading={isSubmitting}
                type="submit"
              >
                Create
              </Button>
              <Button onClick={onModalClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>

      <ContainerTaskPage />
    </Box>
  );
};

export default TaskPage;
