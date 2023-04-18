import * as prismic from "@prismicio/client";

// Fill in your repository name
export const repositoryName = "onboarding-content-management";

export const client = prismic.createClient(repositoryName, {
  routes: [
    { type: "posts", path: "/posts/:uid" },
    { type: "home", path: "/" },
    { type: "pages", path: "/:uid" },
  ],
});
