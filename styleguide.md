# FinTrade Style Guide

## Brand Guidelines

### Color Palette

#### Primary Colors
- **Primary Blue:** `#2196f3` (primary.500)
  - Used for primary buttons, interactive elements, and brand accents
  - Variants: 50-900 scale defined in theme

#### Secondary/Accent Colors
- **Accent Blue:** `#1976d2` (accent.500) 
  - Used for secondary actions, highlighting, and emphasis
  - Variants: 50-900 scale defined in theme

#### Function Colors
- **Success Green:** `#10b981` (success.500)
  - Used for positive indicators, success states, and "BUY" actions
- **Danger Red:** `#ef4444` (danger.500)
  - Used for negative indicators, errors, and "SELL" actions

#### Neutral Colors
- **Background:** `#121212` (gray.900)
  - Main application background
- **Card/Container Background:** `#1a202c` (gray.800)
  - Used for cards, modals, and containers
- **Deeper Background:** `#0a0a0a` (gray.950)
  - Used for the deepest level backgrounds
- **Border Color Light:** `#2d3748` (gray.700)
  - Used for borders in resting state
- **Border Color Dark:** `#4a5568` (gray.600)
  - Used for borders on hover/active states
- **Text Primary:** `#ffffff` (white)
  - Main text color
- **Text Secondary:** `#a0aec0` (gray.400)
  - Secondary text, labels, and less important information

### Typography

#### Font Family
- **Primary Font:** `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif`
- **Font Features:** `font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11'`

#### Font Weights
- **Regular:** 400
- **Medium:** 500 (used for buttons, subtitles)
- **Semibold:** 600 (used for button text)
- **Bold:** 700 (used for headings)

#### Font Sizes
- **Headings:**
  - H1: `2xl` (24px)
  - H2: `xl` (20px)
  - H3: `lg` (18px)
  - H4: `md` (16px)
- **Body Text:**
  - Regular: `md` (16px)
  - Small: `sm` (14px)
  - Extra Small: `xs` (12px)

#### Text Colors
- **Primary Text:** White (`#ffffff`)
- **Secondary Text:** Gray 400 (`#a0aec0`)
- **Muted Text:** Gray 500 (`#718096`)

## Components

### Buttons

#### Variants
1. **Primary**
   - Background: primary.500 (`#2196f3`)
   - Hover: primary.600
   - Active: primary.700
   - Text Color: white

2. **Secondary**
   - Background: gray.800
   - Hover: gray.700
   - Active: gray.600
   - Text Color: white

3. **Outline**
   - Border Color: gray.600
   - Text Color: white
   - Hover: Background opacity 0.05

4. **Ghost**
   - Text Color: gray.300
   - Hover: Background opacity 0.05

5. **Accent**
   - Background: accent.500 (`#1976d2`)
   - Hover: accent.600
   - Active: accent.700
   - Text Color: white

#### Button Styling
- Border Radius: `md` (6px)
- Font Weight: semibold
- Box Shadow on focus: none
- Transition: `all 0.2s ease`
- Hover effect: often includes subtle translateY(-1px) or translateY(-2px)

### Cards

#### Standard Card
- Background: gray.800 (`#1a202c`)
- Border: 1px solid gray.700
- Border Radius: `lg` (8px)
- Box Shadow: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`
- Hover:
  - Box Shadow: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)`
  - Transform: translateY(-2px)
  - Border Color: gray.600

#### TradeCard/TraderCard
- Additional stylings:
  - Subtle gradient top border
  - State-based border colors (following, positive/negative performance)
  - Animation on mount using Framer Motion
  - Transition effects for all hover states

#### Glassmorphism Effect (Special Elements)
- Background: rgba(26, 32, 44, 0.8)
- Backdrop Filter: blur(12px)
- Border: 1px solid rgba(255, 255, 255, 0.1)

### Forms and Inputs

- Background: gray.700
- Border Color: gray.600
- Text Color: white
- Hover Border Color: gray.500
- Focus Style: Outline 2px solid primary.500, outline-offset 2px

### Badges

- Border Radius: `md` (6px)
- Padding: px={2} py={1}
- Font Size: xs
- Font Weight: medium
- Text Transform: uppercase
- Letter Spacing: 0.5px
- Variants:
  - Success/Buy: green.500
  - Danger/Sell: red.500

### Navigation and Tabs

- Tab Variant: enclosed
- Color Scheme: accent
- Active Tab Indicator: accent.500
- Hover Effect: subtle background change

## Layout Guidelines

### Spacing

- Standard Container Max Width: 1200px or 1400px
- Padding: 
  - Container: p={4}
  - Card: p={5} or p={6}
  - Stack Spacing: 4-8
- Margins:
  - Between sections: 8
  - Between components: 4

### Grid System

- Uses Chakra UI responsive grid system
- Standard breakpoints:
  - base (mobile)
  - md (tablet)
  - lg (desktop)
  - xl (large desktop)

### Layout Components

- **Container**: Centers content with max width
- **Grid/SimpleGrid**: For complex layouts and card grids
- **HStack/VStack**: For horizontal and vertical arrangements
- **Flex**: For flexible layouts with justify/align controls

## Animation and Motion

### Animation Library
- Uses Framer Motion for component animations
- Common animations:
  - Fade in
  - Slide up
  - Scale

### Animation Utilities
- **fadeIn**: `@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`
- **slideInUp**: `@keyframes slideInUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`
- **pulse**: `@keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }`

### Transition Effects
- Standard transition: `transition: all 0.2s ease` or `transition: all 0.3s ease`
- Interactive elements grow slightly on hover
- Cards have subtle elevation changes on hover
- Buttons may include box-shadow changes on hover

## Special Effects

### Background Texture
- Subtle background pattern for texture
- SVG-based pattern with low opacity (0.05)

### Scrollbar Styling
- Width: 10px
- Track: #1a1a1a
- Thumb: #333333
- Thumb Hover: #444444
- Border Radius: 5px

### Focus Styles
- Outline: 2px solid #2196f3
- Outline Offset: 2px

### Text Selection
- Background Color: rgba(33, 150, 243, 0.3)
- Text Color: #ffffff

## Responsive Design

### Mobile Considerations
- Stack layouts vertically on mobile
- Reduce paddings and margins
- Use full-width buttons
- Hide complex UI elements
- Mobile menu for navigation

### Media Queries Strategy
- Mobile-first design approach
- Breakpoints using Chakra UI's responsive system:
  - base (0px+)
  - sm (480px+)
  - md (768px+)
  - lg (992px+)
  - xl (1280px+)

## Dark Theme Optimization

- Railway.app-inspired dark UI aesthetics
- Color scheme set to dark: `color-scheme: dark`
- Dark background with subtle texture
- Bright text for contrast and readability
- Focus on blue accent colors for interactive elements
- Use of subtle gradients for visual interest