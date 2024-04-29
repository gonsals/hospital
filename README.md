<!-- # React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
``` -->



Project Title: Patient Management System

Description:
The Patient Management System is a web application designed to streamline the process of managing patient records. It provides functionalities for creating, reading, updating, and deleting patient data. Built using React.js for the frontend and Firebase for backend services, the application offers a user-friendly interface and ensures efficient data management.

Key Features:

Create Patient Records: Add new patient details including name, surname, and attendance date.
Read Patient Records: View a list of existing patient records with pagination support.
Update Patient Records: Edit existing patient information with real-time updates.
Delete Patient Records: Remove patient records securely with confirmation prompts.
Technologies Used:

React.js
Firebase (Firestore, Authentication, Storage)
React Router
React Data Table Component
Toast Notifications
Installation:

Clone the repository: git clone <repository_url>
Navigate to the project directory: cd patient-management-system
Install dependencies: npm install
Create a Firebase project and set up Firestore, Authentication, and Storage services.
Configure Firebase credentials in the project (refer to firebase.ts).
Run the application: npm start
Usage:

Access the application through the provided URL or by running it locally.
Navigate through different pages using the navigation menu.
Use the Create page to add new patient records.
View existing patient records on the Read page.
Update or delete patient records on the Update/Delete page.
Contributing:

Contributions are welcome! If you find any issues or have suggestions for improvements, please create a pull request or raise an issue on GitHub.
License:
This project is licensed under the MIT License.

Authors:

Your Name
Acknowledgements:

React.js Documentation
Firebase Documentation
React Router Documentation
React Data Table Component Documentation

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
