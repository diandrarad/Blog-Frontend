# Blog Frontend

This is the front-end application for a blog platform built with React.js. It provides two main interfaces: one for the public to read and comment on blog posts, and another for authors to manage (create, edit, publish/unpublish) their posts.

## Features

- View all published blog posts
- Comment on blog posts
- Author interface to create, edit, publish/unpublish blog posts
- Authentication using JWT tokens

## Technologies Used

- React.js
- Axios
- React Router
- Tailwind
- localStorage (for storing JWT tokens)

## Usage

### Public Interface

The public interface allows users to view all published blog posts and comment on them.

1. **View All Published Posts**

   Navigate to the homepage (`/`) to see a list of all published posts.

2. **Comment on a Post**

   Click on a post to view its details and add a comment.

### Author Interface

The author interface allows authenticated users to create, edit, publish, and unpublish posts.

1. **Login**

   Navigate to the login page (`/login`) and enter your credentials to log in.

2. **Create a New Post**

   Navigate to the "Create New Post" page (`/new-post`) and fill out the form to create a new post.

3. **Manage Posts**

   See a list of all your posts. You can edit, publish, or unpublish posts from this page.

## Authentication

Authentication is handled using JWT tokens. The token is stored in `localStorage` upon login and is included in the headers of authenticated API requests.
