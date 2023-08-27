# Comment Widget

Web application built using React and Material-UI that allows users to view, post, edit, like, and reply to comments. It provides a user-friendly interface for managing comment threads and interactions.
## Features

- Display and sort comments by date or likes.
- Post new comments.
- Edit existing comments.
- Like and unlike comments.
- Reply to comments.
- Delete comments and their replies.

## Installation

1. Clone this repository to your local machine.

```bash
  git clone https://github.com/saisantosh1998/commentsApp
```

2. Go to  directory.

```bash
  cd comment-widget
```

3. Install the required dependencies.

```bash
  npm install
```
4. Start mock server

```bash
  npm run mock-server
```

5. Start the application.
```bash
  npm start
```
6. Open your browser and navigate to http://localhost:3000 to see the app.
## Mock server

The Comment Widget uses a mock server to handle API requests. The mock server is set up using json-server and serves as a backend to manage comments.

The mock server is running on http://localhost:5000.
Endpoints:

    1. GET /comments: Get all comments.
    2. POST /comments: Add a new comment.
    3. PATCH /comments/:id: Update a comment's likes or content.
    4. DELETE /comments/:id: Delete a comment.

The mock server's data is stored in the db.json file.
## Technologies Used


- React
- Material-UI
- axios
- json-server (for mock server)

## Usage

    1. Enter your comment in the input field and click "Submit" to post a new comment.
    2. Click the "Like" button to like a comment. Click again to unlike.
    3. Click the "Reply" button to reply to a comment.
    4. Click the "Edit" button to edit a comment.
    5. Click the "Delete" button to delete a comment and its replies.
    6. Use the "Sort by" dropdown to change the sorting order of comments.
## Design Decisions

- React and Material-UI: The Comment Widget is built using React for its component-based architecture and reusability. Material-UI was chosen for its pre-designed UI components that provide a polished and consistent user interface.

- JSON Server: To simulate a backend, json-server was used to manage comments, likes, and replies. This decision allowed for easy testing and development without the need for a real backend.

- User Experience: The widget aims for a clean and intuitive user experience. Comments are nested to enhance readability, and buttons for actions like liking, replying, editing, and deleting are provided for each comment.
## Challenges Faced

- Nested Comments: Implementing the nested comment structure was challenging. It required recursive rendering of Comment components and careful handling of parent-child relationships.

- Real-time Updates: Ensuring that the UI updated in real-time when a user liked or replied to a comment required careful state management and rendering strategies.
## User Experience and Accessibility

- User-Centric Design: The widget follows Material Design principles to ensure a user-friendly experience. Clear buttons, intuitive icons, and hierarchical comment structure enhance usability.

- Accessibility: Material-UI components are designed with accessibility in mind, making the widget more inclusive. The widget also uses semantic HTML and provides alt text for icons.


## External Utility Libraries

- axios: Used for making HTTP requests to the mock server, enabling seamless communication between the frontend and backend.

- notistack: Integrated for displaying user-friendly notifications, such as error messages to enhance the user experience.
## License

[ISC](https://choosealicense.com/licenses/isc/)

