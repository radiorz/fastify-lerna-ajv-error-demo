const app = require("fastify")({
  logger: true,
  ajv: {
    customOptions: {
      // 可能会遭受 dos 攻击,不过 ajv-errors 需要
      allErrors: true,
      // 删除多余字段
      removeAdditional: true,
    },
    plugins: [require("ajv-errors")],
  },
});

app.post(
  "/",
  {
    schema: {
      body: {
        type: "object",
        additionalProperties: false,
        properties: {
          parameters: {
            type: "string",
            errorMessage: {
              type: ";123",
            },
          },
          // username: $properties.username.schema,
          // password: $properties.password
        },
        required: ["parameters"],
        errorMessage: {
          required: { parameters: ";123" },
        },
      },
    },
  },
  (request, reply) => {
    return request.body;
  }
);
app.listen({ port: 3000 });
