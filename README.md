# Project Title
THREADAI Shop

## Description
THREADAI Shop is a modern e-commerce platform offering premium t-shirts with unique AI-inspired designs.

## Features
- Browse a curated collection of AI-inspired t-shirt designs.
- View detailed information and images for each product.
- Add and remove products from your shopping cart.
- Seamless checkout process.
- Responsive design for a great experience on desktops, tablets, and mobile devices.
- User-friendly interface for easy navigation.

## Tech Stack
- **Frontend:** React, TypeScript
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **Build Tool:** Vite
- **Icons:** Lucide React
- **Linting:** ESLint
- **Testing:** Jest

## Getting Started

### Prerequisites

Make sure you have Node.js and npm (or yarn) installed on your system.
- Node.js (LTS version recommended): [https://nodejs.org/](https://nodejs.org/)
- npm is included with Node.js

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/thread-ai-shop.git
    cd thread-ai-shop
    ```
    *(Replace `your-username/thread-ai-shop.git` with the actual repository URL if different)*

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    *(Or `yarn install` if you prefer yarn)*

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    This will start the development server, typically at `http://localhost:5173`. Open this URL in your browser to see the application.

## Available Scripts
-   `npm run dev`
    -   Starts the development server using Vite.
-   `npm run build`
    -   Builds the application for production to the `dist` folder.
-   `npm run lint`
    -   Lints the codebase using ESLint to identify and fix code style issues.
-   `npm run preview`
    -   Serves the production build locally to preview before deployment.
-   `npm run test`
    -   Runs unit tests using Jest.
-   `npm run test:watch`
    -   Runs unit tests in watch mode, automatically re-running tests when files change.
-   `npm run test:coverage`
    -   Generates a test coverage report.

## Folder Structure
```
thread-ai-shop/
├── public/             # Static assets
├── src/                # Source files
│   ├── components/     # Reusable UI components (e.g., Cart, ProductCard, Layout)
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── home/
│   │   ├── layout/
│   │   ├── product/
│   │   └── ui/         # General purpose UI elements (Button, LoadingSkeleton)
│   ├── context/        # React context for state management (e.g., CartContext)
│   ├── data/           # Static data, mock data (e.g., product information)
│   ├── pages/          # Top-level page components (e.g., HomePage, ProductPage, CheckoutPage)
│   ├── types/          # TypeScript type definitions
│   ├── App.tsx         # Main application component
│   ├── main.tsx        # Entry point of the application
│   └── index.css       # Global styles or Tailwind base styles
├── .gitignore          # Files and folders to be ignored by Git
├── index.html          # Main HTML file
├── package.json        # Project metadata and dependencies
├── vite.config.ts      # Vite configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript compiler options
└── README.md           # Project documentation (this file)
```

A brief overview of key directories:
-   `src/components`: Contains reusable UI components, organized by feature (e.g., `cart`, `product`) or general UI elements (`ui`).
-   `src/pages`: Houses the main page components that correspond to different routes in the application.
-   `src/context`: Used for managing global state using React's Context API (e.g., `CartContext`).
-   `src/data`: Stores static data or mock data, such as product information.
-   `public`: Contains static assets that are served directly.

## Contributing
Contributions are welcome! If you'd like to contribute to THREADAI Shop, please follow these general guidelines:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix: `git checkout -b feature/your-feature-name` or `bugfix/issue-tracker-id`.
3.  Make your changes, ensuring code is clean and well-commented where necessary.
4.  Write or update tests for your changes.
5.  Ensure all tests pass: `npm run test`.
6.  Lint your code: `npm run lint`.
7.  Commit your changes with a clear and descriptive commit message.
8.  Push your branch to your fork: `git push origin feature/your-feature-name`.
9.  Open a pull request to the main repository's `main` (or `develop`) branch.

For more detailed contribution guidelines, please refer to the `CONTRIBUTING.md` file (if available).

## License
This project is currently unlicensed.

Consider adding an open-source license to define how others can use, modify, and distribute your code. Common choices include:
-   **MIT License:** Permissive and simple.
-   **Apache License 2.0:** Permissive, provides patent protection.
-   **GNU GPLv3:** Strong copyleft license.

You can add a `LICENSE` file to the root of your project and link to it here. For example:

`This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.`
