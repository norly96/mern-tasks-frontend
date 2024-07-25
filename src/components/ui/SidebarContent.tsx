import {
  Box,
  BoxProps,
  CloseButton,
  Flex,
  FlexProps,
  useColorModeValue,
  Image,
  Text,
  Icon,
} from "@chakra-ui/react";
import {
  IconFilePlus,
  IconHome,
  IconUserCircle,
  Icon as IconProp,
} from "@tabler/icons-react";

interface LinkItemProps {
  name: string;
  icon: IconProp;
  href?: string;
  onclick?: () => void;
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

interface NavItemProps extends FlexProps {
  icon: IconProp;
  children: React.ReactNode;
  href?: string;
  onclick?: () => void;
}

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
        <Image boxSize="48px" ml="3" src="/logo.png" alt="Logo" />
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

export default SidebarContent;
