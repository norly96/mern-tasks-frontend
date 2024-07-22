import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import {
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandGithub,
} from "@tabler/icons-react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue("green.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      target="_blank"
      _hover={{
        bg: useColorModeValue("green.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      w={"full"}
      pos={"fixed"}
      bottom={"0"}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Text>
          © 2024 Developed by{" "}
          <Link to="https://www.norly96.com" target="_blank">
            norly96
          </Link>
          . All rights reserved
        </Text>
        <Stack direction={"row"} spacing={6}>
          <SocialButton
            label={"Linkedin"}
            href={"https://www.linkedin.com/in/norly96"}
          >
            <IconBrandLinkedin />
          </SocialButton>
          <SocialButton label={"Github"} href={"https://github.com/norly96"}>
            <IconBrandGithub />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}
