To run all the test, you can do `npm run test` under /frontend. After the component test are finished, press `q` and cypress interactive interface would be automatically started.

### 1. Component Test

All 6 component test files are located in /src folder. 
### 2. UI Test
Besides using `npm run test`, you can do `npx cypress run` to run the UI test directly, and 2 video files would be generated.

Please make sure the viewport of cypress is 1000px * 660px, since responsive design is widely applied in this project, on larger or smaller viewport, the layout of page (especially the navbar) would be different, and some elements are possibly be hidden.

For the happy path test, the steps are:

- Register successfully
- Creates a new game successfully
- Updates the name successfully
- Edit a question successfully, change its title, choice and correct answer. This step is not on the spec but we added it here. Since in our project, an incompleted game (a game with no question or one or more questions are not completed) is not allowed to be started. So we have to finish at least 1 question to make this game runnable.
- Start a game successfully
- Ends a game successfully
- Loads the results page successfully
- Logs out of the application successfully
- Logs back into the application successfully

And we have also created a sad path test, the steps are:

- Register successfully
- Create a new game successfully
- Add a question successfully
- Delete a question successfully
- Edit a question successfully, including edit the title, choice, correct answer, add a video resource, edit question type, duration and points
- Start a game successfully
- Go to admin page successfully
- Advance the game to the first question successfully
- End the game successfully and load the result page
- Go back to the dashboard successfully
- Logout successfully

These steps are the normal steps that an admin want to create, start and admin a game, so we think it is resonable to test these steps.