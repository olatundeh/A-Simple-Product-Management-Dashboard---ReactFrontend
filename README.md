# Product Management Application (frontend)

This is a React application for managing products with CRUD (Create, Read, Update, Delete) operations. It uses a backend API (assumed to be running on `https://localhost:7227/api`) and visualizes product data with a bar graph.

## Prerequisites

Before you begin, ensure you have the following installed:

-   **Node.js:** (https://nodejs.org/)
-   **npm** (Node Package Manager) or **yarn** (https://yarnpkg.com/)

## Setup Instructions

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/olatundeh/A-Simple-Product-Management-Dashboard---ReactFrontend.git
    cd <repository_directory>
    ```

2.  **Install Dependencies:**

    Using npm:

    ```bash
    npm install
    ```

    Or, using yarn:

    ```bash
    yarn install
    ```

3.  **Configure Environment Variables:**

    -   Create a file named `.env` in the root directory of the project.
    -   Add the API URL to the `.env` file:

        ```
        REACT_APP_API_URL=https://localhost:7227/api
        ```

    -   **Important:** Ensure that the backend API is running at the specified URL.

4.  **Start the Development Server:**

    Using npm:

    ```bash
    npm start
    ```

    Or, using yarn:

    ```bash
    yarn start
    ```

    This will start the React development server. Open your browser and navigate to `http://localhost:3000` to view the application.

## Project Structure

product-management-app (frontend)/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Product.js

│   │   ├── ProductList.js

│   │   ├── ProductGraph.js

│   ├── App.js

│   ├── index.js

│   ├── ...
├── .env

├── package.json
├── README.md

## Dependencies

-   **React:** JavaScript library for building user interfaces.
-   **Axios:** Promise-based HTTP client for making API requests.
-   **Bootstrap:** CSS framework for styling the application.
-   **Chart.js:** Library for creating charts and graphs.
-   **react-chartjs-2:** React wrapper for Chart.js.
-   **react-router-dom:** React router for navigation.
-   **material-ui:** Material UI components.

## Usage

-   **Adding a Product:** Click the "Add New Product" button to view the new product form. Fill in the form fields and click the "Save" button.
-   **Updating a Product:** Click the "Edit" button in the product list, modify the form fields, and click "Update".
-   **Deleting a Product:** Click the "Delete" button in the product list.
-   **Viewing Product Data:** The product graph displays the total stock quantity per category.
-   **Viewing Product List:** The product list displays all the products.
