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

    // Check if the user actually exists
    const user = await prisma.user.findUnique({
      where: { userName: userName },
    });

    if (!user) {
      throw createError({
        status: 404,
        message: "User not found",
      });
    }

    // Check if the password is correct
    const isPasswordValid = await verifyPassword(user.password, password);
    if (!isPasswordValid) {
      throw createError({
        status: 401,
        message: "Incorrect username or password",
      });
    }

    // Set the user session to the data fetched from the db.
    await setUserSession(event, {
      user: {
        id: user?.id,
        userName: user?.userName,
        role: user?.role as Role,
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
