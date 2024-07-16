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
import { Link } from "react-router-dom";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<User>();

  const { signin, errors: loginError } = useAuth();

  const onSubmit = handleSubmit(async (values: User) => {
    await signin(values);
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
          <Image src="/public/logo.png" alt="Logo" />
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          {loginError.map((error: any, i) => (
            <Alert status="error" key={i} mb={1} borderRadius="md">
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
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </form>
          <Stack pt={6}>
            <Text align={"center"}>
              Are you a new member?{" "}
              <Link to="/register">
                <Text color={"blue.400"}>Register</Text>
              </Link>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default LoginPage;
