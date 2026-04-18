// src/api/endpoints.ts
export const endpoints = {
  // Blog
  BLOGS: "/V1/blogs",
  BLOG_VIEW: "/V1/blogView",
  BLOG_CATEGORIES: "/V1/blogCategory",

  // Products
  PRODUCTS: "/V1/products",
  PRODUCT_CATEGORIES: "/V1/productCategory",

  // Content & System
  HOME_COUNTER: "/V1/homeCounter",
  FAQS: "/V1/faqs",
  SETTINGS: "/V1/settings",
  CONTACT_FORM: "/V1/contactFormSubmit",

  // Legal
  POLICIES: "/V1/policies",
} as const;
