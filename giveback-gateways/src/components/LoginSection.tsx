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

  return (
    <Box p={6} boxShadow="md" mt={10} bg={"gray.50"} borderRadius={6} w={300}>
      <Text fontWeight="bold" fontSize="2xl" marginY={2}>
        Log in
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
          <FormControl id="password">
            <FormLabel></FormLabel>
            <Input
              type="password"
              {...register("password")}
              variant={"flushed"}
              placeholder="Password"
              id="password"
            />
            {errors.password && <p className="text-danger">{errors.password.message}</p>}
          </FormControl>
          <Button colorScheme="blue" type="submit">
            Log in
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default LoginSection;
