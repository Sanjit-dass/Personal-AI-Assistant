import React from 'react';
import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Link,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
    Avatar,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useColorMode,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    VStack,
} from '@chakra-ui/react';
import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    MoonIcon,
    SunIcon,
} from '@chakra-ui/icons';
import { FaUserCircle, FaSignOutAlt, FaCog, FaHome, FaComments, FaYoutube, FaWikipediaW, FaClipboardList } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../store/authSlice';

export default function Navbar() {
    const { isOpen, onToggle, onClose } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode();
    const user = useSelector((state) => state.authSlice.userData);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    // Theme Colors
    const bg = useColorModeValue('white', 'gray.900');
    const borderColor = useColorModeValue('gray.200', 'gray.900');
    const textColor = useColorModeValue('gray.600', 'white');

    const handleLogout = async () => {
        try {
            const res = await fetch('http://localhost:8000/api/v1/users/logout', {
                method: 'POST',
                credentials: 'include',
            });
            if (res.ok) {
                dispatch(logout());
                navigate('/authentication/login');
            }
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    const MobileNavItem = ({ label, icon, to }) => {
        const isActive = location.pathname === to;
        const activeColor = useColorModeValue("brand.600", "brand.400");
        const activeBg = useColorModeValue("brand.50", "whiteAlpha.200");

        return (
            <Flex
                align="center"
                p={4}
                mx={-4}
                borderRadius="lg"
                role="group"
                cursor="pointer"
                bg={isActive ? activeBg : 'transparent'}
                color={isActive ? activeColor : 'inherit'}
                _hover={{
                    bg: activeBg,
                    color: activeColor,
                }}
                onClick={() => {
                    navigate(to);
                    onClose();
                }}
            >
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: activeColor,
                        }}
                        as={icon}
                    />
                )}
                <Text fontWeight={600}>
                    {label}
                </Text>
            </Flex>
        );
    };

    return (
        <Box position="sticky" top="0" zIndex="sticky" width="100%">
            <Flex
                bg={bg}
                color={textColor}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={borderColor}
                align={'center'}
                boxShadow="sm"
            >
                <Flex
                    flex={{ base: 1, md: 'auto' }}
                    ml={{ base: -2 }}
                    display={{ base: 'flex', md: 'none' }}
                >
                    <IconButton
                        onClick={onToggle}
                        icon={
                            isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
                        }
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>

                <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }} alignItems="center">
                    <Link onClick={() => navigate('/')} _hover={{ textDecoration: 'none', opacity: 0.8 }} cursor="pointer">
                        <Flex alignItems="center">
                            {/* Logo Image */}
                            <Box
                                as="img"
                                src="/logo.svg"
                                alt="AI Assistant Logo"
                                h="40px"
                                mr={3}
                                objectFit="contain"
                            />
                            <Text
                                textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                                fontFamily={'heading'}
                                fontWeight="bold"
                                fontSize="xl"
                                bgGradient="linear(to-r, brand.400, purple.500)"
                                bgClip="text"
                                display={{ base: 'none', md: 'block' }} // Hide text on mobile if logo is enough, or keep it
                            >
                                Personal AI Assistant
                            </Text>
                        </Flex>
                    </Link>
                </Flex>

                <Stack
                    flex={{ base: 1, md: 0 }}
                    justify={'flex-end'}
                    direction={'row'}
                    spacing={4}
                    alignItems="center"
                >
                    <IconButton
                        size={'md'}
                        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                        aria-label={'Toggle Color Mode'}
                        onClick={toggleColorMode}
                        variant="ghost"
                        rounded="full"
                    />

                    {user ? (
                        <Menu>
                            <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                minW={0}
                            >
                                <Avatar
                                    size={'sm'}
                                    src={user.avatar}
                                    name={user.name}
                                    borderWidth="2px"
                                    borderColor="brand.400"
                                />
                            </MenuButton>
                            <MenuList alignItems={'center'} bg={useColorModeValue('white', 'gray.800')} borderColor={borderColor} zIndex={20}>
                                <Box textAlign="center" py={4} px={6}>
                                    <Avatar
                                        size={'lg'}
                                        src={user.avatar}
                                        name={user.name}
                                        mb={2}
                                    />
                                    <Text fontWeight="bold">{user.name}</Text>
                                    <Text fontSize="sm" color="gray.500">{user.email}</Text>
                                </Box>
                                <MenuDivider />
                                <MenuItem icon={<FaUserCircle />} onClick={() => navigate('/userSettings')}>Profile</MenuItem>
                                <MenuItem icon={<FaCog />} onClick={() => navigate('/userSettings')}>Settings</MenuItem>
                                <MenuDivider />
                                <MenuItem icon={<FaSignOutAlt />} color="red.400" onClick={handleLogout}>Logout</MenuItem>
                            </MenuList>
                        </Menu>
                    ) : (
                        <Button
                            as={'a'}
                            fontSize={'sm'}
                            fontWeight={600}
                            color={'white'}
                            bg={'brand.400'}
                            href={'#'}
                            _hover={{
                                bg: 'brand.300',
                            }}
                            onClick={() => navigate('/authentication/login')}
                        >
                            Sign In
                        </Button>
                    )}
                </Stack>
            </Flex>

            {/* Mobile Drawer */}
            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
                    <DrawerBody>
                        <VStack align="stretch" spacing={2} mt={4}>
                            <MobileNavItem label="Dashboard" icon={FaHome} to="/" />
                            <MobileNavItem label="Chat" icon={FaComments} to="/chat" />
                            <MobileNavItem label="Videos" icon={FaYoutube} to="/youtube-recommendation" />
                            <MobileNavItem label="Wiki" icon={FaWikipediaW} to="/wikipedia-search" />
                            <MobileNavItem label="Quiz" icon={FaClipboardList} to="/quiz" />
                            <MobileNavItem label="Profile" icon={FaUserCircle} to="/userSettings" />
                        </VStack>
                    </DrawerBody>
                    <DrawerFooter borderTopWidth="1px">
                        <Button variant="outline" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </Box>
    );
}
