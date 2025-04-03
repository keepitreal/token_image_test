# Contract Grid

A simple React application that displays token images and information from Base network contracts in a responsive grid layout.

## Features

- Display token images and metadata in a 3-column grid
- Toggle between circular and square image cropping
- Add and remove contract addresses dynamically
- Default loading of popular Base tokens
- Responsive design

## Getting Started

### Local Development

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Example Contract Addresses

Try these Base network contracts:

- Clanker: `0x1bc0c42215582d5a085795f4badbac3ff36d1bcb`
- Based Pepe: `0x52b492a33E447Cdb854c7FC19F1e57E8BfA1777D`
- Doginme: `0x6921b130d297cc43754afba22e5eac0fbf8db75b`
- USDC: `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`

## API

The app uses the Coinbase Wallet Portfolio Service API to fetch token metadata:

- Endpoint: `https://wallet-portfolio-service.cbhq.net/rpc/v2/assets/getAssetsDetails`
- Network: Base Mainnet (Chain ID: 8453)

## Development Notes

- Uses React 18 with modern hooks
- Styled with CSS Grid and Flexbox
- Proxy configuration for local development to handle CORS
- Image cropping toggle with CSS transforms
