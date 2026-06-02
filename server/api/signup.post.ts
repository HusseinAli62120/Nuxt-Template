import z from "zod";
import { Role } from "#shared/enums/Role";

export default defineEventHandler(async (event) => {
  // Validate body schema
  const bodySchema = z.object({
    userName: z.string().min(4),
    password: z.string().min(8),
  });
  try {
    const { userName, password } = await readValidatedBody(event, (body) => {
      const result = bodySchema.safeParse(body);

      // Bad request if format is invalid
      if (!result.success) {
        throw createError({
          status: 400,
          message: "Invalid credentials format",
        });
      }

      return result.data;
    });

    // Check if the user already exists

    // Create the user

    // Set the user info into the session
    await setUserSession(event, {
      user: {
        id: (Math.random() * 100).toString(),
        userName: userName,
        role: Role.USER,
      },
    });

    return {
      status: 200,
      message: "Sign up successful",
    };
  } catch (error) {
    console.log(error);

    // Throw the errors from the try
    if (error) {
      throw error;
    }

    // Fallback if no error was thrown, but we reached this
    throw createError({
      status: 500,
      message: "Internal server error",
    });
  }
});
