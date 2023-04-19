### 1. Always Visible Navbar
The navigation bar is always at the top of the screen, no matter what scrolling you do on the screen. Make sure you can easily navigate to other pages (such as home page, join game page, etc.) without retyping the url or using the back key
### 2. Autosave in Game Editing
When editing the game, all the modifications you did would be auto saved after you unblurred that textfield/checkbox. You don't need to worry about losing your work by closing the page by mistake.
### 3. Input Check and Prompt Text
For most of the editable field, we provided input check and prompt text to tell you what kind of format/value/text is acceptable, make your editing more easily.
### 4. Game Check
When you want to finish editing or start a game, we will perform a game check to ensure that the game is valid. We will check if all the required field is finished. The game cannot be started if it is incompleted, preventing you from starting a half-finished game.

### 5. Fold and Unfold Menu

Foldable menu are widely used in this project, to make the page more suitable and there would not be too many buttons on an element. (e.g. For the quiz card, there are 6 buttons available to control the quiz, but normally you can only see the start button, since all the other buttons are folded and they would only be visible by clicking the menu button, or when the quiz is started)

### 6. Important Note

- For 2.5.4 points system, since the result API on player side do not return the duration and points of each question, we have to cache the duration and points information of each question locally (When a new question is advanced to, we will record its duration and points in 2 lists), which means that if you refresh the page, all the cached information are gone and you will be not able to see how many points you've got. (But don't worry, your performance is still in the database and is visible to the admin). Note that you are allowed to refresh/reopen the page and if you do that, you can go back to the current question immediately without any error, and all the answer you've made before would be saved.
- The host address of the copied link is hard coded to http://localhost:3000
- Since as we mentioned above that a valid quiz should at least have 1 question, you are not allowed to delete the last question  remaining in a quiz, and for a newly created empty quiz, a new question would be created automatically when you first click the edit button.
- For 2.5.2 lobby, we used an external API provided by API Ninja to fetch some random beautiful scene images, so please make sure you have internet connection available.
- For 2.5.1, the test files are located in /frontend/public/test-files/
