import React from 'react';
import { Flex, Center, Heading } from '@chakra-ui/react';

const NotFound = (): JSX.Element => (
  <Flex align="center" justify="center" h="100vh">
    <Center>
      <Heading>Page Not Found :(</Heading>
    </Center>
  </Flex>
);

export default NotFound;
