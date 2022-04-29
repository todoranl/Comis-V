import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';

import { TspVisualiser } from 'components/TspVisualizer';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <TspVisualiser />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
