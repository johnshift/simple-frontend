import React from 'react';
import { Heading, Flex, Center } from '@chakra-ui/react';

const App = (): JSX.Element => (
  <div className="App">
    <Flex align="center" justify="center" h="100vh">
      <Center>
        <Heading>todo</Heading>
      </Center>
    </Flex>
  </div>
);

export default App;
