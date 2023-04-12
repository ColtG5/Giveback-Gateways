// NewVolunteeringOpportunitySection.tsx
import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";


const NewVolunteeringOpportunitySection = ({ username }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [numOfVolunteers, setNumOfVolunteers] = useState("");

  const handleSubmit = async () => {
    try {
      // Check if the username already exists in the database
      const checkResponse = await fetch(`http://localhost:5000/api/volunteering-opportunities`, {
        method: 'post',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Title : title,
          Date: date,
          Time: time,
          Duration: duration,
          Description: description,
          VolunteersNeeded: numOfVolunteers,
          cUser: username,
        }),
      });
        if (checkResponse.ok) {
          // User successfully registered
          // Do something with the response
          console.log("Response ok")
        } else {
          // Handle error
          console.log("Failed to register user");
        }
      } catch (err) {
      // Handle error
      console.log(err)
    }
  };

  return (
    <Box mb="3">
      <Button colorScheme="blue" onClick={onOpen}>
        Add A Volunteering Opportunity
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add A Volunteering Opportunity</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mt={4}>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Date</FormLabel>
              <Input
                type="date"
                placeholder="Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Time</FormLabel>
              <Input
                type="time"
                placeholder="Time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Duration</FormLabel>
              <Input
                type="text"
                placeholder="Duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Number of Volunteers</FormLabel>
              <Input
                type="number"
                placeholder="Number of Volunteers"
                value={numOfVolunteers}
                onChange={(e) => setNumOfVolunteers(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Submit
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default NewVolunteeringOpportunitySection;
