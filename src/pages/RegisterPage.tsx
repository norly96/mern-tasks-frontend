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
  Link,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { registerRequest } from "../api/auth";
import { User } from "../api/auth";

const API = import.meta.env.VITE_API;

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<User>();
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
          <Heading fontSize={"4xl"}>Sign up to your account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form
            onSubmit={handleSubmit(async (values) => {
              //console.log(JSON.stringify(values));
              console.log({ API });

              const res = await registerRequest(values);
              console.log(res);
            })}
          >
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
            <Text align={"center"}>
              Already a user? <Link color={"blue.400"}>Login</Link>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default RegisterPage;
