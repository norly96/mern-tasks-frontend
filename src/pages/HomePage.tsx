import {
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Stack minH={"100vh"}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={6} w={"full"} maxW={"lg"}>
          <Heading fontSize={{ base: "3xl", md: "5xl", lg: "7xl" }}>
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: useBreakpointValue({ base: "20%", md: "30%" }),
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "green.400",
                zIndex: -1,
              }}
            >
              Welcome to
            </Text>
            <br />{" "}
            <Text color={"green.400"} as={"span"}>
              TODO - TASKS
            </Text>{" "}
          </Heading>
          <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
            This is a simple and effective TODO application to help you organize
            your tasks and boost your productivity. Keep track of what needs to
            be done, manage your tasks efficiently, and never miss a deadline
            again!
          </Text>
          <Stack direction={{ base: "column", md: "row" }} spacing={4}>
            {isAuthenticated ? (
              <Button
                rounded={"full"}
                bg={"green.400"}
                color={"white"}
                _hover={{
                  bg: "green.500",
                }}
              >
                <Link href="/tasks">To Tasks</Link>
              </Button>
            ) : (
              <>
                <Button
                  rounded={"full"}
                  bg={"green.400"}
                  color={"white"}
                  _hover={{
                    bg: "green.500",
                  }}
                >
                  <Link href="/register">Sign Up</Link>
                </Button>
                <Button rounded={"full"}>
                  <Link href="/login">Sign In</Link>
                </Button>
              </>
            )}
          </Stack>
        </Stack>
      </Flex>
      <Footer />
    </Stack>
  );
};

export default HomePage;
