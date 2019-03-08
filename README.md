# SWELLOGRAM

## Description

An application specifically designed for surfers to create a social profile & share insights and pictures of the best surf spots around the world.

## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **Signup:** As an anon I can sign up in the platform so that I can start saving favorite restaurants
-  **Login:** As a user I can login to the platform so that I can see my favorite restaurants
-  **Logout:** As a user I can logout from the platform so no one else can use it
-  **View Feed** As a user i can view my feed populated by posts of users i follow
-  **Search Users** As a user I can search for other users profiles
-  **Folow Users** As a user I can follow other users and view their profile
-  **Create Post** As a user i can create a post
-  **Edit Post** As a user i can edit a post i created
-  **Delete Post** As a user i can delete a post i created
-  **Comment on Posts** As a user I can comment on other posts
-  **Manage Settings** As a user I can manage my settings


## Backlog

Erorrs:
- manage error handling in state (using Redux)

Image:
- upload images

Geo Location & Surf Forecast:
- add geolocation when creating post
- show forecast of the spot
- show a map of surf spots where user has surfed
  
# Client

## Routes
| Method | Path | Component | Permissions | Behavior | 
|--------|------|--------|--| -------|
| `get`  | `/` | HomePageComponent| public | just promotional copy|
| `post` | `/auth/signup` | SignupPageComponent| anon only| signup form, link to login, navigate to homepage after signup|
| `post` | `/auth/login` | LoginPageComponent | anon only |login form, link to signup, navigate to homepage after login |
| `post` | `/auth/logout` | n/a| anon only | navigate to homepage after logout, expire session |
| `get`  | `/feed` | feed showing your and the users you follow posts
| `post` | `/create` | create a new post
| `get` | `/search` | retrieve all users available in database
| `get` | `/profile/me` | my profile page
| `post` | `/profile/me/delete` | delete my own profile
| `get` | `/profile/:id` | other users profile page
| `post` | `/profile/:id/follow` | follow a user
| `get` | `/post/:id` | see a post details
| `post` | `/post/delete` | delete my own post
| `put` | `/post edit` | edit my own post


## Components

- Navbar
- PrivateRoute
- AuthProvider
- AnonRoute


## Services

- Search
- Profile
- Feed
- Settings
- Create 

# Server

## Models

User model

```
username - String // required
password - String // required
profileImage: String || default one otherwise
following: [ ObjectID<User> ]
```

Post model

```
owner - ObjectID<User> // required
location - String
imageURL - String // required
description - String
```

## Links

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/ranierigalasso/LineApp-Frontend)
[Server repository Link](https://github.com/ranierigalasso/LineApp-Backend)

[Deploy Link](https://lineapp-frontend.firebaseapp.com/)

### Slides

The url to your presentation slides

[Slides Link](https://slides.com/ranierigalasso/swellogram)