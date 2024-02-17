# Student-Mentor App - Client side

This app is an online coding application with the following pages and features"

### Lobby page (no need for authentication):
The page contains the title “Choose code block” and a list of at least 4 items that represent code blocks, each item represented by a name (for example - “Async case”).
Clicking on an item takes the user to the code block page with the details of the code block he chooses.

### Code block page:
Both users can enter this page (2 different clients).
Assuming that the first user who opens the code block page is the mentor, after that, any other user will be counted as a student.

* The mentor will see the code block he chose with a read-only mode.
* The student will see the code block with the ability to change the code.
* Code changes are displayed in real-time (Socket).
* Using Highlight.js to highlight the syntax.

### General guidelines:

* Code blocks are created manually, with no API or UI.
* A code block has the fields ‘title’ and ‘code’ (code is a string that represents JS code).
* There are clear comments to the code where needed.
* There's a “solution” on a code block object (which was inserted manually), once the student changes the code to be equal to the solution, a big smiley face shows on the screen :)

link to the deployment project:


