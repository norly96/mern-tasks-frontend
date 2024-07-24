import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuItem,
  Image,
  MenuList,
  Icon,
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
  Grid,
  Switch,
} from "@chakra-ui/react";

import {
  IconChevronDown,
  IconMenu2,
  IconHome,
  IconUserCircle,
  IconFilePlus,
  Icon as IconProp,
} from "@tabler/icons-react";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { Task } from "../types/type";
import { useTasks } from "../context/TaskContext";
import { useEffect } from "react";
import TaskCard from "../components/TaskCard";
import ContainerTaskPage from "../components/ContainerTaskPage";

interface LinkItemProps {
  name: string;
  icon: IconProp;
  href?: string;
  onclick?: () => void;
}

interface NavItemProps extends FlexProps {
  icon: IconProp;
  children: React.ReactNode;
  href?: string;
  onclick?: () => void;
}
interface MobileProps extends FlexProps {
  onOpen: () => void;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
  onModalOpen: () => void;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "HOME", icon: IconHome, href: "/" },
  { name: "PROFILE", icon: IconUserCircle, href: "/profile" },
  { name: "ADD TASK", icon: IconFilePlus },
];

const SidebarContent = ({ onClose, onModalOpen, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="3" justifyContent="space-between">
        <Image boxSize="48px" ml="3" src="/public/logo.png" alt="Logo" />
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          TODO-TASKS
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          href={link.href}
          onClick={link.name === "ADD TASK" ? onModalOpen : undefined}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, href, onClick }: NavItemProps) => {
  return (
    <Box
      as="a"
      href={href}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        onClick={onClick}
        role="group"
        cursor="pointer"
        _hover={{
          bg: "green.400",
          color: "white",
        }}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { user, logout } = useAuth();
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<IconMenu2 />}
      />

      <Image
        display={{ base: "flex", md: "none" }}
        boxSize="48px"
        ml="3"
        src="/public/logo.png"
        alt="Logo"
      />

      <HStack spacing={{ base: "0", md: "6" }}>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size="sm"
                  bg="green.400"
                  src="https://bit.ly/broken-link"
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{user?.username}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {user?.email}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <IconChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem onClick={() => logout()}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

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
    formState: { isSubmitting },
  } = useForm<Task>();

  const { tasks, getTasks, createTask } = useTasks();

  const onSubmit = handleSubmit((data: Task, e: any) => {
    createTask(data);
    e.target.reset();
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
