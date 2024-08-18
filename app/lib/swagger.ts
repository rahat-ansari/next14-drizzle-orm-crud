import { createSwaggerSpec } from "next-swagger-doc";

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: "app/api/users", // define api folder under app folder
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Next Swagger API Example",
        version: "1.0",
      },
      components: {
        securitySchemes: {
          BearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
        schemas: {
          Role: {
            type: "string",
            // example: "admin",
          },
          UserRequest: {
            type: "object",
            properties: {
              role: {
                $ref: "#/components/schemas/Role",
              },
            },
            required: ["role"],
          },
          UserResponse: {
            type: "object",
            properties: {
              id: {
                type: "integer",
                description: "User ID",
              },
              name: {
                type: "string",
                description: "User name",
              },
              email: {
                type: "string",
                description: "User email",
              },
              fullName: {
                type: "string",
                description: "User full name",
              },
              phone: {
                type: "string",
                description: "User phone number",
              },
              address: {
                type: "string",
                description: "User address",
              },
              score: {
                type: "integer",
                description: "User score",
              },
              role: {
                type: "string",
                description: "User role",
                enum: ["admin", "customer"],
              },
              createdAt: {
                type: "string",
                format: "date-time",
                description: "User creation date",
              },
              updatedAt: {
                type: "string",
                format: "date-time",
                description: "User last update date",
              },
            },
          },
        },
      },
      security: [],
    },
  });
  return spec;
};
