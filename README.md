# ShortURL Prototype

## Overview

This prototype allows users to shorten URLs. It is built with React, Next.js, Tailwind CSS, and Material UI for the frontend and MongoDB for the backend.

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

1. Ensure you have the following installed:

- Node.js
- Yarn

2. This project requires a MongoDB connection URI. You can easily obtain one by creating a database through MongoDB Atlas.

### Installation

Install the dependencies:

```bash
yarn install
```

### Configuration

1. Create a `.env` file in the root directory.
2. Copy the environment variables from the `.env.example` file into the newly created `.env` file and fill out the values. Only a MongoDB connection URI is required.

### Development

Start the frontend development server:

```bash
yarn dev
```

The frontend will be available at `http://localhost:3000`.
