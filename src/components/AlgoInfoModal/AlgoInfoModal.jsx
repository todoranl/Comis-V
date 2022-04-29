import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React from 'react';
import { Container, Text } from '@chakra-ui/layout';
import algorithmDescription from './constants';

const normalizeAlgorithmName = (name) => name.toLowerCase().split('_').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ');

function AlgoInfoModal({ isOpen, onClose, algo }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{normalizeAlgorithmName(algo)}</ModalHeader>
        <ModalCloseButton colorScheme="teal" />
        <ModalBody>
          {algorithmDescription[algo].map((paragraph) => (
            <Container key={paragraph.id} size="6xl" marginBottom="15px">
              <Text>{paragraph.text}</Text>
            </Container>
          ))}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AlgoInfoModal;
