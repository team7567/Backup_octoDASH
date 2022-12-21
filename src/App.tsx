import { ChakraProvider, Container, SimpleGrid, StylesProvider } from '@chakra-ui/react';  //importar componentes do Chackra
import { Heading } from '@chakra-ui/react';
import Column from './components/Column';
import { ColumnType } from './utils/enums';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';




function App() { // adicionar isso na raiz do app
  return (
    <>
      <Heading
        fontSize={{ base: '1xl', sm: '4xl', md: '10xl'}}
        fontWeight= "bold"
        textAlign= "center"
        bgGradient= "linear(to-l, #E4E4E4 , #E4E4E4)"
        bgClip="text"
        mt={4}
      >
        Welcome to OctoDASH
      </Heading>
      <Container maxWidth="container.lg" px={4} py={10}>
        <DndProvider backend={HTML5Backend}>
        <SimpleGrid
          columns={{base: 1, md: 4}}
          spacing={{base: 16, md: 4}}
        >
          <Column column={ColumnType.TO_DO} />
          <Column column={ColumnType.IN_PROGRESS} />
          <Column column={ColumnType.COMPLETED} />
          <Column column={ColumnType.BLOCKED} />
          </SimpleGrid>
        </DndProvider>
      </Container>
    </>
    
  );
}


export default App;
