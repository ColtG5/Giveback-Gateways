import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Text, Stack, Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

const schema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().regex(/^\d{10}$/, "Invalid phone number"),
  location: z.string().min(1, "Location is required"),
});

type SignupData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: SignupData) => void;
}

const VolunteerSignupSection = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignupData>({
    resolver: zodResolver(schema),
  });

  return (
    <Box
      p={6}
      boxShadow="md"
      mt={10}
      bg="white"
      borderRadius={6}
      w={{ base: "300px", md: "400px" }}
    >
      <Text fontWeight="bold" fontSize="2xl" marginY={2}>
        Sign up
      </Text>
      <form
        onSubmit={handleSubmit(async (data) => {
          await onSubmit(data);
          reset();
        })}
      >
        <Stack spacing={4}>
          <FormControl id="username">
            <FormLabel></FormLabel>
            <Input
              type="username"
              {...register("username")}
              variant={"flushed"}
              placeholder="Username"
              id="username"
            />
            {errors.username && <p className="text-danger">{errors.username.message}</p>}
          </FormControl>
          <FormControl id="name">
            <FormLabel></FormLabel>
            <Input
              type="name"
              {...register("name")}
              variant={"flushed"}
              placeholder="Name"
              id="name"
            />
            {errors.name && <p className="text-danger">{errors.name.message}</p>}
          </FormControl>
          <FormControl id="email">
            <FormLabel></FormLabel>
            <Input
              type="email"
              {...register("email")}
              variant={"flushed"}
              placeholder="Email"
              id="email"
            />
            {errors.email && <p className="text-danger">{errors.email.message}</p>}
          </FormControl>
          <FormControl id="phoneNumber">
            <FormLabel></FormLabel>
            <Input
              type="tel"
              {...register("phoneNumber")}
              variant={"flushed"}
              placeholder="Phone Number"
              id="phoneNumber"
            />
            {errors.phoneNumber && <p className="text-danger">{errors.phoneNumber.message}</p>}
          </FormControl>
          <FormControl id="location">
            <FormLabel></FormLabel>
            <Input
              type="text"
              {...register("location")}
              variant={"flushed"}
              placeholder="Location"
              id="location"
            />
            {errors.location && <p className="text-danger">{errors.location.message}</p>}
          </FormControl>
          <Button colorScheme="blue" type="submit">
            Sign up
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default VolunteerSignupSection;
