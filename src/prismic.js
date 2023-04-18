import * as prismic from "@prismicio/client";

export const repositoryName = "onboarding-content-management";

export const client = prismic.createClient(repositoryName, {
  routes: [
    { type: "posts", path: "/posts/:uid" },
    { type: "home", path: "/" },
    { type: "pages", path: "/:uid" },
  ],
});
