import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';

import TspVisualizer from './components/TspVisualizer';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <TspVisualizer />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
