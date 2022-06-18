import { Center, Heading, Text } from '@chakra-ui/react';

function App() {
  return (
    <Center h="full" w="full" flexDir="column">
      <Heading fontSize="120px">🍻</Heading>
      <Heading mt={8}>Cheers!</Heading>
      <Text>You did it. Now get to work!</Text>
    </Center>
  );
}

export default App;
