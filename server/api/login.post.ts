import { z } from "zod";
import { Role } from "#shared/enums/Role";

// Validate body schema
const bodySchema = z.object({
  userName: z.string().min(4),
  password: z.string().min(8),
});

export default defineEventHandler(async (event) => {
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

    // Query the database to get the user info

    // Set the user session to the data fetched from the db.
    await setUserSession(event, {
      user: {
        id: (Math.random() * 100).toString(),
        userName: userName,
        role: Role.USER,
      },
    });
    return {
      status: 200,
      message: "Login successful",
    };
  } catch (error) {
    if (error) {
      throw error;
    }

    throw createError({
      status: 500,
      message: "Internal Server Error",
    });
  }
});
