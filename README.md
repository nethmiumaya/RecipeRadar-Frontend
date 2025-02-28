# RecipeRadar Frontend

RecipeRadar is a recipe finder application that allows users to search for recipes based on ingredients. This repository contains the frontend implementation built using React Native with Expo.

## Features
- User authentication using JWT
- Ingredient-based recipe search
- Display recipe details
- Save favorite recipes
- View search history

## Tech Stack
- **Frontend**: React Native (Expo)
- **State Management**: Context API
- **Navigation**: React Navigation (Stack Navigation)
- **Backend**: [RecipeRadar Backend Repository](https://github.com/nethmiumaya/RecipeRadar-Backend.git)

## Setup & Installation

### Prerequisites
Ensure you have the following installed:
- Node.js (>= 16.x)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Android/iOS Emulator or Physical Device

### Installation Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/nethmiumaya/RecipeRadar-Frontend.git
   ```
2. Navigate to the project directory:
   ```sh
   cd RecipeRadar-Frontend
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
   or
   ```sh
   yarn install
   ```
4. Set up environment variables by creating a `.env` file in the root directory:
   ```
   REACT_APP_API_BASE_URL=http://localhost:5000/api
   ```
5. Start the development server:
   ```sh
   expo start
   ```

## Folder Structure
```
RecipeRadar-Frontend/
│── src/
│   ├── components/     # Reusable components
│   ├── screens/        # Application screens
│   ├── context/        # Context API for state management
│   ├── navigation/     # Navigation setup
│   ├── services/       # API calls
│   ├── utils/          # Helper functions
│   ├── App.js          # Main application entry
│── assets/            # Static assets
│── .env               # Environment variables
│── package.json       # Project dependencies
│── README.md          # Project documentation
│── LICENSE            # License file
```

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
