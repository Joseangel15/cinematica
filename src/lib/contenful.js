// lib/contentful.js
import { createClient } from 'contentful';

export const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export async function getEntries(contentType) {
  const entries = await contentfulClient.getEntries({
    content_type: contentType,
  });
  return entries.items;
}

export async function getEntryById(id) {
  const entry = await contentfulClient.getEntry(id);
  return entry;
}

export async function getEntryBlogPosts() {
  const blogPosts = await getEntries("blogPost");
  return blogPosts;
}