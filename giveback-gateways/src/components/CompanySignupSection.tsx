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
  password: z.string().min(6, "Password must be at least 6 characters"), // Add password field
});

// export type SignupData = z.infer<typeof schema>;
export type SignupData = z.infer<typeof schema> & {
  password: string;
  creationDate: string; // Add creationDate field
};

interface Props {
  onSubmit: (data: SignupData) => void;
}

const CompanySignupSection = ({ onSubmit }: Props) => {
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
        // Generate creation date here
        const currentDate = new Date();
        const creationDate = currentDate.toISOString().split('T')[0]; // Format date as "YYYY-MM-DD"
        const newData = {...data, creationDate}; // Include creationDate in the data object
        await onSubmit(newData); // Pass newData to onSubmit callback
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
              placeholder="Company Username"
              id="username"
            />
            {errors.username && <p className="text-danger">{errors.username.message}</p>}
          </FormControl>
          <Input
    type="password"
    {...register("password")}
    variant={"flushed"}
    placeholder="Password"
    id="password"
  />
          <FormControl id="name">
            <FormLabel></FormLabel>
            <Input
              type="name"
              {...register("name")}
              variant={"flushed"}
              placeholder="Company Name"
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
              placeholder="Company Email"
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
              placeholder="Company Phone Number"
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
              placeholder="Company Location"
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

export default CompanySignupSection;
