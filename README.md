# Conference Dashboard

A fullscreen dashboard for conference displays showing key metrics, chains in the ecosystem, and volume breakdowns with animated transitions.

## Features

- Bold, large, animated metrics display
- Automatic screen rotation with configurable timing
- Progress indicator showing next screen and timing
- Beautiful animations powered by Framer Motion
- Responsive design that works on any display
- Mock data with easy transition to real API data

## Tech Stack

- Next.js 15 with App Router
- TypeScript
- TailwindCSS for styling
- Framer Motion for animations
- React Hooks and Context API for state management

## Getting Started

### Prerequisites

- Node.js 16.8.0 or later
- Yarn package manager

### Installation

```bash
# Clone the repository (if applicable)
git clone https://your-repository-url.git
cd conference-screen

# Install dependencies
yarn install
```

### Development

```bash
# Start the development server
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Production Build

```bash
# Create a production build
yarn build

# Start the production server
yarn start
```

## Customization

### Mock Data

The dashboard currently uses mock data located in `src/data/mockData.ts`. To use real data:

1. Modify the data fetching in the Screen context
2. Implement API clients in a new `services` directory
3. Update the screen components to handle real-time data updates

### Adding New Screens

To add new screens to the rotation:

1. Create a new screen component in `src/components/screens/`
2. Add a new type to the `DashboardScreen` interface in `src/data/mockData.ts`
3. Update the render logic in `DashboardContainer.tsx`

## Deployment

The dashboard can be deployed to any platform that supports Next.js, such as Vercel, Netlify, or any server with Node.js support.

For conference use, consider setting up the browser in kiosk mode or using a dedicated display management solution.
