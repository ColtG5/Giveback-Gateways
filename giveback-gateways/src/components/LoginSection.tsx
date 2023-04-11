import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Text, Stack, Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

const schema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: LoginData) => void;
}

const LoginSection = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(schema),
  });

  const handleFormSubmit = (data: LoginData) => {
    onSubmit(data);
    reset(); // Reset the form after submission
  };

return (
  <Box p={6} boxShadow="md" mt={10} borderRadius={6} bg="white">
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Stack spacing={4}>
        <FormControl isInvalid={!!errors.username}>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            id="username"
            placeholder="Username"
            {...register("username", { required: true })}
          />
          {errors.username && (
            <Text color="red.500" fontSize="sm">
              {errors.username.message}
            </Text>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.password}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <Text color="red.500" fontSize="sm">
              {errors.password.message}
            </Text>
          )}
        </FormControl>
        <Button type="submit" colorScheme="blue">
          Login
        </Button>
      </Stack>
    </form>
  </Box>
);
};

export default LoginSection;
