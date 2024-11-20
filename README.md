# CookBook - Recipe Finder Web Application

CookBook is a modern recipe finder web app that connects food enthusiasts, enabling them to share and explore recipes effortlessly. Built with the MERN stack, the app offers a user-friendly interface with a seamless browsing experience.

## Features

- **User Accounts**: Create an account, log in, and manage your profile.
- **Recipe Sharing**: Share your own recipes with the community.
- **Explore Recipes**: Discover recipes shared by other users.
- **Filter by Categories**: Find recipes based on categories (e.g., desserts, main courses).
- **Recent Recipes**: Stay updated with the most recently added recipes.
- **Detailed View**: View recipe ingredients and other details.

## Technologies Used

- **Frontend**: React.js, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Cloud Storage**: Cloudinary (for image storage)
- **Additional Libraries**: Axios, Mongoose

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/cookbook.git
   cd cookbook
   ```

2. Install dependencies for both the client and server:
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```
   
3. Add your environment variables:

   Create a .env file in the server folder with the following keys:
   
   ```bash
   MONGO_URI=your_mongo_database_uri
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   JWT_SECRET=your_jwt_secret
   ```
   
4. Add your environment variables:

   - **Backend** :
     
   ```bash
   cd server
   npm start
   ```
   
   - **Frontend** :
     
   ```bash
   cd client
   npm start
   ```

## Screenshots:
   -  **Home Page** :
   ![home_page](https://github.com/user-attachments/assets/b4d8395c-c05b-4462-9b74-d514a2d2e6b3)

   -  **Recipes Page** :
   ![allrecipes_page](https://github.com/user-attachments/assets/bef1a0fb-e092-49a5-9508-412cda094b54)

   -  **Log In Page** :
   ![login_page](https://github.com/user-attachments/assets/72f415c8-e530-42a7-89d7-c81591ac8389)

   -  **Sign Up Page** :
   ![signup_page](https://github.com/user-attachments/assets/fce48ffa-cd56-4db0-84bb-949b08131af1)

   -  **Profile Page** :
   ![localhost_3000_Ajout (1)](https://github.com/user-attachments/assets/58c07c9f-2b70-4b0e-ac57-1e9c105d25c0)

   -  **Adding a recipe Page** :
   ![localhost_3000_Ajout (3)](https://github.com/user-attachments/assets/1b0fed6b-5713-4365-97f8-f09fcd22c948)

   -  **Recipe details Page** :
   ![localhost_3000_details_6735474ff15963947b4d66cd](https://github.com/user-attachments/assets/f934b0ee-a482-4d7a-8ba4-b8a09732af3f)

## Licence

This project is licensed under the MIT License.
