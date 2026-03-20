# Coownable — React Native Prototype

Asset browsing prototype for [Coownable](https://coownable.com), a fractional ownership platform for art, wine & collectibles.

Built with Expo + TypeScript. Designed using the [A List Apart Priority Guide](https://alistapart.com/article/priority-guides-a-content-first-alternative-to-wireframes/) methodology.

## Screenshots

Two screens: Browse (asset grid) → Detail (hero image + investment info).

## Prerequisites

- [Node.js](https://nodejs.org/) (v20+)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npx expo`)
- iOS: Xcode + Simulator, or [Expo Go](https://expo.dev/go) on a physical iPhone/iPad
- Android: Android Studio + emulator, or [Expo Go](https://expo.dev/go) on a physical device

## Getting Started

```bash
# Clone
git clone git@github.com:fr4nzb0t/coo-app-react-native.git
cd coo-app-react-native

# Install dependencies
npm install

# Start the dev server
npx expo start
```

This opens the Expo dev tools. From there:

- Press **i** to open in iOS Simulator
- Press **a** to open in Android emulator
- Scan the QR code with Expo Go on your phone

## Running on Specific Platforms

### iOS Simulator

```bash
# Start and open in iOS Simulator directly
npx expo run:ios

# Or use the dev server
npx expo start --ios
```

### iPad Simulator

```bash
# Boot an iPad simulator first
xcrun simctl boot "iPad Pro 13-inch (M4)"

# Then run
npx expo start --ios
```

The app uses `useWindowDimensions()` — 2-column grid on iPad (≥600dp), 1-column on iPhone.

### Android Emulator

```bash
# Start and open in Android emulator
npx expo run:android

# Or use the dev server
npx expo start --android
```

### Physical Device (Expo Go)

1. Install [Expo Go](https://expo.dev/go) on your iPhone or Android
2. Run `npx expo start`
3. Scan the QR code with your camera (iOS) or Expo Go (Android)
4. The app loads over your local network

### Web (experimental)

```bash
npx expo install react-native-web react-dom @expo/metro-runtime
npx expo start --web
```

## Project Structure

```
app/
  _layout.tsx                # Root layout (expo-router)
  (tabs)/
    _layout.tsx              # Tab navigation (Browse, Portfolio, Profile)
    index.tsx                # Browse screen — asset grid
    portfolio.tsx            # Portfolio tab (coming soon placeholder)
    profile.tsx              # Profile tab (coming soon placeholder)
  asset/
    [id].tsx                 # Asset detail screen (dynamic route)
components/
  AssetCard.tsx              # Card component for browse grid
  ProgressBar.tsx            # Animated availability bar
  ShimmerCard.tsx            # Loading placeholder
  BackButton.tsx             # Platform-aware back navigation
constants/
  mockData.ts                # 8 mock art assets with picsum images
  colors.ts                  # Color palette (gallery-inspired)
  typography.ts              # Type scale
  spacing.ts                 # Spacing + breakpoint constants
```

## Key Features

- **expo-router** — file-based navigation with tab layout
- **Animated progress bar** — color-coded availability (green → amber → red)
- **Adaptive layout** — 2 columns on tablet, 1 on phone
- **Shimmer loading** — animated placeholder cards during load
- **Pull-to-refresh** — native refresh control
- **Platform-aware** — iOS haptics, safe area handling, status bar management
- **Tab navigation** — Browse active, Portfolio/Profile greyed out as future

## Code Quality

```bash
# TypeScript check
npx tsc --noEmit

# Lint
npx expo lint

# Format (if prettier configured)
npx prettier --write .
```

## Design References

- [Priority Guide](../../.openclaw/workspace/projects/coownable/MOBILE-PRIORITY-GUIDE.md)
- [UI Specification](../../.openclaw/workspace/projects/coownable/MOBILE-UI-SPEC.md)

## Mock Data

Uses placeholder images from `picsum.photos`. The 8 assets represent a curated art gallery with varying availability (4%–91% of shares available) to showcase the progress bar in different states.

## Troubleshooting

**"Metro bundler failed to start"** — Kill any running Metro processes: `npx kill-port 8081`

**iOS build fails** — Run `cd ios && pod install && cd ..` (if using bare workflow)

**Expo Go can't connect** — Make sure your phone and computer are on the same WiFi network. Try `npx expo start --tunnel` if local network doesn't work.
