import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react';

const AlgoInfoModal = ({ isOpen, onClose, algo }) => {
  if (!algo) {
    return null; // Sau poți afișa un mesaj de încărcare
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Algorithm Information</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>{algo.description}</p>
          {algo.steps && (
            <ul>
              {algo.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AlgoInfoModal;
