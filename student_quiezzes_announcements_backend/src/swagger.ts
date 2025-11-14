import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "My API Docs",
    description: "API documentation for announcements and quizzes",
  },
  host: "localhost:5000",
  schemes: ["http"],
  openapi: "3.0.0",
};

const outputFile = "./swagger-output.json";

const endpointsFiles = [
  "./src/routes/annoucmentsRoute.ts",
  "./src/routes/quizeRoute.ts",
  "./src/routes/auth.ts",
];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
