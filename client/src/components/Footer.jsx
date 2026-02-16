import {
    Box,
    Container,
    Stack,
    SimpleGrid,
    Text,
    Link,
    VisuallyHidden,
    chakra,
    useColorModeValue,
    IconButton,
    Input,
    Button,
    Heading,
} from '@chakra-ui/react';
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram, FaYoutube, FaFacebook } from 'react-icons/fa';

const SocialButton = ({ children, label, href }) => {
    return (
        <chakra.button
            bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
            rounded={'full'}
            w={8}
            h={8}
            cursor={'pointer'}
            as={'a'}
            href={href}
            display={'inline-flex'}
            alignItems={'center'}
            justifyContent={'center'}
            transition={'background 0.3s ease'}
            _hover={{
                bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
            }}>
            <VisuallyHidden>{label}</VisuallyHidden>
            {children}
        </chakra.button>
    );
};

const ListHeader = ({ children }) => {
    return (
        <Text fontWeight={'500'} fontSize={'lg'} mb={2} color={useColorModeValue("brand.600", "brand.300")}>
            {children}
        </Text>
    );
};

export default function Footer() {
    const bg = useColorModeValue('gray.50', 'gray.900');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const inputBg = useColorModeValue('white', 'whiteAlpha.100');

    return (
        <Box
            bg={bg}
            color={useColorModeValue('gray.700', 'gray.200')}
            borderTopWidth={1}
            borderStyle={'solid'}
            borderColor={borderColor}
            mt="auto"
            flexShrink={0}
        >
            <Container as={Stack} maxW={'6xl'} py={10}>
                <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
                    <Stack spacing={6}>
                        <Box>
                            <Heading size="md" bgGradient="linear(to-r, brand.400, purple.500)" bgClip="text" display="inline-block">
                                PAT
                            </Heading>
                            <Text fontSize={'sm'} mt={2}>
                                Your Personal AI Tutor and Assistant.
                                Making knowledge accessible and tasks simpler.
                            </Text>
                        </Box>
                        <Stack direction={'row'} spacing={4}>
                            <SocialButton label={'YouTube'} href={'https://www.youtube.com/@engineeringbasic94'}>
                                <FaYoutube />
                            </SocialButton>
                            <SocialButton label={'Instagram'} href={'https://www.instagram.com/sanjitdas_8153/?hl=en'}>
                                <FaInstagram />
                            </SocialButton>
                            <SocialButton label={'Facebook'} href={'https://www.facebook.com/dassanjitkumar.das/'}>
                                <FaFacebook />
                            </SocialButton>
                            <SocialButton label={'Github'} href={'https://github.com/Sanjit-dass'}>
                                <FaGithub />
                            </SocialButton>
                            <SocialButton label={'LinkedIn'} href={'https://www.linkedin.com/in/sanjit-'}>
                                <FaLinkedin />
                            </SocialButton>
                        </Stack>
                    </Stack>

                    <Stack align={'flex-start'}>
                        <ListHeader>Product</ListHeader>
                        <Link href={'/chat'} _hover={{ color: 'brand.500' }}>AI Chat</Link>
                        <Link href={'/wikipedia-search'} _hover={{ color: 'brand.500' }}>Knowledge Base</Link>
                        <Link href={'/youtube-recommendation'} _hover={{ color: 'brand.500' }}>Video Recommendations</Link>
                        <Link href={'/quiz'} _hover={{ color: 'brand.500' }}>Quiz</Link>
                    </Stack>

                    <Stack align={'flex-start'}>
                        <ListHeader>Support</ListHeader>
                        <Link href={'#'} _hover={{ color: 'brand.500' }}>Help Center</Link>
                        <Link href={'#'} _hover={{ color: 'brand.500' }}>Terms of Service</Link>
                        <Link href={'#'} _hover={{ color: 'brand.500' }}>Legal</Link>
                        <Link href={'#'} _hover={{ color: 'brand.500' }}>Privacy Policy</Link>
                    </Stack>

                    <Stack align={'flex-start'}>
                        <ListHeader>Stay up to date</ListHeader>
                        <Stack direction={'row'}>
                            <Input
                                placeholder={'Your email address'}
                                bg={inputBg}
                                border={0}
                                _focus={{
                                    bg: 'whiteAlpha.300',
                                }}
                            />
                            <IconButton
                                bg={'brand.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'brand.500',
                                }}
                                aria-label="Subscribe"
                                icon={<FaGithub />} // Placeholder icon for send
                            />
                        </Stack>
                    </Stack>
                </SimpleGrid>
            </Container>

            <Box
                borderTopWidth={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.700')}>
                <Container
                    as={Stack}
                    maxW={'6xl'}
                    py={4}
                    direction={{ base: 'column', md: 'row' }}
                    spacing={4}
                    justify={{ base: 'center', md: 'center' }} // Centered for cleaner look or space-between
                    align={{ base: 'center', md: 'center' }}>
                    <Text fontSize="sm">© {new Date().getFullYear()} PAT. All rights reserved.</Text>
                </Container>
            </Box>
        </Box>
    );
}
