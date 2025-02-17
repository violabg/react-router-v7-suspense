import { type RouteConfig } from "@react-router/dev/routes";

export default [
  {
    path: "/",
    file: "./routes/layout.tsx",
    children: [
      {
        index: true,
        file: "./routes/Home.tsx",
      },
      {
        path: "data",
        file: "./routes/Data.tsx",
      },
    ],
  },
] satisfies RouteConfig;
