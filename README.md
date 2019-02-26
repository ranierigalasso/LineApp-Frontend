# SWELLOGRAM

## Description

An application specifically designed for surfers to create a social profile & share insights and pictures of the best surf spots around the world.

## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **Signup:** As an anon I can sign up in the platform so that I can start saving favorite restaurants
-  **Login:** As a user I can login to the platform so that I can see my favorite restaurants
-  **Logout:** As a user I can logout from the platform so no one else can use it
-  **Folow Users** As a user I can follow other users and 
-  **Create Post**
-  **Edit Post**
-  **Delete Post**
-  **Comment on Posts**
-  **View Users Profile**


## Backlog

User profile:
- see my profile
- upload my profile picture
- see other users profile
- list of events created by the user
- list events the user is attending

Geo Location:
- add geolocation to events when creating
- show event in a map in event detail page
- show all events in a map in the event list page

Homepage:
- ...
  
# Client

## Routes
| Method | Path | Component | Permissions | Behavior | 
|--------|------|--------|--| -------|
| `get`  | `/` | HomePageComponent| public | just promotional copy|
| `post` | `/auth/signup` | SignupPageComponent| anon only| signup form, link to login, navigate to homepage after signup|
| `post` | `/auth/login` | LoginPageComponent | anon only |login form, link to signup, navigate to homepage after login |
| `post` | `/auth/logout` | n/a| anon only | navigate to homepage after logout, expire session |
| `get`  | `/restaurants` | RestaurantListPageComponent| public | shows all restaurants, links to details, search restaurants by name
| `post` | `/restaurants` | RestaurantCreatePageComponent | user only | creates a new restaurant, navigates to restaurant's detail page after creation
| `put` | `/restaurants/:id` | RestaurantDetailPageComponent  | public/user | details of one restaurant, if logged in - button to add to favorite, show star if in favorites already
| `delete` | `/restaurants/:id` | na | user only | delete resteraunt
| `get` | `/profile/me` | ProfilePageComponent | user only | my details, my favorite restaurants, restaurants created by me
| `get` | `**` | NotFoundPageComponent | public | 




## Components

- Restaurant Card component
  - Input: restaurant: any
  - Output: favorite(restaurantId: string, on: boolean)
- Search component
  - Output: change(terms: string)


## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.getUser() // synchronous
- Restaurant Service
  - restaurant.list()
  - restaurant.search(terms)
  - restaurant.create(data)
  - restaurant.detail(id)
  - restaurant.addFavorite(id)
  - restaurant.removeFavorite(id)   

# Server

## Models

User model

```
username - String // required
email - String // required & unique
password - String // required
favorites - [ObjectID<Restaurant>]
```

Restaurant model

```
owner - ObjectID<User> // required
name - String // required
phone - String
address - String
```

## API Endpoints (backend routes)

- GET /auth/me
  - 404 if no user in session
  - 200 with user object
- POST /auth/signup
  - 401 if user logged in
  - body:
    - username
    - email
    - password
  - validation
    - fields not empty (422)
    - user not exists (409)
  - create user with encrypted password
  - store user in session
  - 200 with user object
- POST /auth/login
  - 401 if user logged in
  - body:
    - username
    - password
  - validation
    - fields not empty (422)
    - user exists (404)
    - passdword matches (404)
  - store user in session
  - 200 with user object
- POST /auth/logout
  - body: (empty)
  - 204
- POST /user/me/favorite
  - body:
    - restaurantId
  - validation
    - id is valid (404)
    - id exists (404)
  - add to favorites if not there yet
  - updates user in session
- DELETE /user/me/favorite/:restaurantId
  - validation
    - id is valid (404)
    - id exists (404)
  - body: (empty - the user is already stored in the session)
  - remove from favorites
  - updates user in session
- GET /restaurant?terms=foo
  - use search criteria if terms provided
  - 200 with array of restaurants
- POST /restaurant
  - body:
    - name
    - phone
    - address
  - validation
    - fields not empty
  - create restaurant
  - 200 with restaurant object
- GET /restaurant/:id

  

## Links

### Git

The url to your repository and to your deployed project

[Client repository Link](http://github.com)
[Server repository Link](http://github.com)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)