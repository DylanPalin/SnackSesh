# FoodFinder

![FoodFinder Logo](https://github.com/DylanPalin/FoodFinder/blob/main/Logo/FoodFinder%20Logo.png?raw=true)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [Deploy on Vercel](#deploy-on-vercel)
- [License](#license)
- [Contact](#contact)

## Overview

**FoodFinder** is a web application designed to help users find nearby restaurants based on their dietary preferences, weekly food deals, budget, and location. Whether you're looking for wing wednesday with vegan options, gluten-free pizza night, or simply a cheap place to eat, FoodFinder aims to simplify your search for the perfect meal.

## Features

- **Weekly Food Deals:** Get the best deals on your favorite foods every night of the week.
- **Location-based Search:** Find restaurants near you or in a specific area.
- **Dietary Filters:** Customize your search with filters like vegan, vegetarian, gluten-free, etc.
- **Budget-friendly Options:** Set your price range to find options that fit your budget.
- **User Reviews & Ratings:** Read reviews and ratings from other users to make informed decisions.
- **Save Favorites:** Keep a list of your favorite spots for quick access later.
- **Interactive Map:** Visualize restaurant locations on an interactive map.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**

```bash
git clone https://github.com/yourusername/FoodFinder.git
cd FoodFinder
```

2. **Install dependencies:**

```bash
  npm install
```

3. **Set up environment variables:**

Create a .env file in the root directory and add your API keys, database credentials, etc.

```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
NEXT_PUBLIC_YELP_API_KEY=your_yelp_api_key
```
4.  **Run the development server:**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

The app will be available at http://localhost:3000.

## Usage
- Search for Restaurants: Enter your location or use the geolocation feature to find restaurants nearby.
- Apply Filters: Use the filter options to narrow down your search based on dietary needs, price range, etc.
- Explore Results: View restaurant details, read reviews, and see ratings.
- Save Favorites: Click the heart icon to save restaurants to your favorites list.

## Technologies Used

### Frontend:
- Next.js
- Google Maps API
- Yelp API

### Backend:
- Node.js
- Express.js
- PostgreSQL

### Testing:
- Jest
- React Testing Library

### Tools:
- Git & GitHub
- Jira (for project management)
- Webpack (for bundling)

## Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature/YourFeature).
Commit your changes (git commit -m 'Add new feature').
Push to the branch (git push origin feature/YourFeature).
Open a Pull Request.

## Deploy on Vercel
The easiest way to deploy your Next.js app is to use the Vercel Platform from the creators of Next.js.

Check out the Next.js deployment documentation for more details.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contact
For any questions or suggestions, feel free to contact me:

- Email: dylanpalin@gmail.com
- GitHub: DylanPalin
