import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Image,
  Text,
  AlertIcon,
  Alert,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { User } from "../types/type";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<User>();

  const { signup, isAuthenticated, errors: registerError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values: User) => {
    await signup(values);
  });

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Image src="/logo.png" alt="Logo" />
          <Heading fontSize={"4xl"}>Sign up to your account</Heading>
          {registerError.map((error: any, i) => (
            <Alert status="error" key={i} mb={-7} borderRadius="md">
              <AlertIcon />
              {error}
            </Alert>
          ))}
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={onSubmit}>
            <Stack spacing={4}>
              <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  {...register("username", { required: true })}
                />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  {...register("email", { required: true })}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  {...register("password", { required: true })}
                />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  bg={"green.400"}
                  color={"white"}
                  _hover={{
                    bg: "green.500",
                  }}
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Sign up
                </Button>
              </Stack>
            </Stack>
          </form>
          <Stack pt={6}>
            <Flex gap={5}>
              Already a user?{" "}
              <Link to="/login">
                <Text color={"blue.400"}>Login</Text>
              </Link>
            </Flex>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default RegisterPage;
