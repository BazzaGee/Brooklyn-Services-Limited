# Component Library - Block Dynamic Design System

## Layout Components

### BentoGrid
**Purpose:** Primary layout container for panel-based sections
- Uses CSS Grid with asymmetrical columns (60/40, 70/30 ratios)
- No visual dividers - separation via background color shifts
- Supports scroll-linked animations

### BentoCard
**Purpose:** Content containers within BentoGrid
- Background: `surface-container` default
- Hover: scale(1.02), background shifts to `surface-bright`
- No internal dividers - spacing via 24px gaps
- Clip-path options for "tetris" angled corners

### GlassNav
**Purpose:** Floating navigation bar
- Background: `rgba(252, 249, 248, 0.85)`
- Backdrop-filter: blur(12px)
- Position: sticky with glassmorphism effect

## Typography Components

### DisplayHeading
**Purpose:** Hero and section headlines
- Font: Space Grotesk
- Size: 3.5rem (display-lg)
- Letter-spacing: -0.02em (tight)
- Weight: 700
- Style: Block-like, precision-focused

### SectionTitle
**Purpose:** Sub-section headlines
- Font: Space Grotesk
- Size: 2rem (display-sm)
- Weight: 600

### BodyText
**Purpose:** Paragraph content
- Font: Inter
- Size: 1rem (body-lg)
- Line-height: 1.6
- Weight: 400

### LabelTag
**Purpose:** Technical data labels
- Font: Space Grotesk
- Style: Uppercase, letter-spacing: 0.05em
- Size: 0.75rem
- Example: "PRESSURE READING", "LOCATION COORDINATES"

## Interactive Components

### PrimaryButton
**Purpose:** Main CTAs
- Background: Linear gradient 135deg from `#CD5C5C` to `#e28c8c`
- Text: White (#ffffff)
- Border-radius: 0.75rem (xl)
- Hover: Scale 1.02, subtle brightness increase
- Active: Scale 0.98

### SecondaryButton
**Purpose:** Alternative actions
- Background: `surface-container-highest` (#e5e2e1)
- Text: `on-surface` (#1b1b1c)
- Border: None
- Hover: Background shifts to `primary-fixed-dim`

### TextLink
**Purpose:** Inline text links
- Text: `primary` (#CD5C5C)
- Underline: 2px `surface-tint`
- Hover: Underline expands width

### DetectionInput
**Purpose:** Form fields
- Background: `surface-container-low` (#f6f3f2)
- Border: None (no bottom line)
- Border-radius: 0.125rem (sm)
- Focus: `outline` token (#897170) at 40% opacity glow

## Service Components

### ServiceCard
**Purpose:** Display service offerings
- Layout: Icon + Title + Description
- Background: `surface-container`
- Icon: Material Symbols Outlined, 48px
- Hover: Entire card scales with block-pop animation

### ServiceGrid
**Purpose:** Multi-service display section
- Layout: 2x2 or 3-column grid
- Cards use consistent spacing
- Connection line animation between services

### FeatureList
**Purpose:** Bullet points with icons
- Icon: Checkmark or relevant symbol
- Spacing: 16px between items
- Alignment: Left-aligned with icon margin

## Visual Components

### ConnectionLine
**Purpose:** Animated "pipe/circuit" connector
- Element: Vertical bar, 4px width
- Color: `primary` (#CD5C5C)
- Animation: Grows/shrinks on scroll
- Purpose: Visually links service sections

### IsometricPattern
**Purpose:** Subtle background texture
- CSS pattern with 30deg/150deg lines
- Color: Primary at 4% opacity
- Size: 80px x 140px

### SkewBlock
**Purpose:** Angled container elements
- Transform: skewX(-6deg)
- Used for dynamic visual interest
- Counter-skew content inside

### ModularShadow
**Purpose": "Blocky" shadow effect
- Box-shadow: 8px 8px 0px rgba(205, 92, 92, 0.15)
- Creates 3D "pop" effect

## Section Components

### HeroSection
**Purpose:** Homepage hero
- Layout: Two-column (60/40)
- Left: Headline + CTA + stats
- Right: Featured image/illustration
- Background: `surface` with optional isometric pattern

### ServicesSection
**Purpose:** Service overview
- Layout: Bento grid with varying card sizes
- Connection line animation
- Cards highlight on hover

### TrustSection
**Purpose:** Reviews, credentials, partnerships
- Layout: Multi-column grid
- Elements: Rating badges, partner logos, testimonial cards
- Background: `surface-container-low`

### CTASection
**Purpose:** Call-to-action blocks
- Layout: Full-width or split
- Background: Gradient or solid primary
- Text: White on primary background

### ContactSection
**Purpose:** Contact information display
- Layout: Form + Info side-by-side
- Form: DetectionInput components
- Info: Phone, email, address cards

## Animation Patterns

### ScrollReveal
**Purpose:** Elements animate on scroll into view
- Initial: opacity: 0, translateY: 20px
- Visible: opacity: 1, translateY: 0
- Duration: 0.8s
- Easing: ease-out

### BlockPop
**Purpose:** "Click into place" effect
- Transform: scale(0.98) to scale(1)
- Duration: 0.4s
- Easing: cubic-bezier(0.34, 1.56, 0.64, 1)

### SlideInRight
**Purpose:" Content sliding in from right
- Transform: translateX(30px) to translateX(0)
- Duration: 0.8s
- Easing: cubic-bezier(0.2, 0, 0, 1)

## Utility Classes

### Color Tokens (CSS Variables)
```css
--primary: #CD5C5C;
--primary-container: #e28c8c;
--on-primary: #ffffff;
--surface: #fcf9f8;
--on-surface: #1b1b1c;
--surface-container: #f0eded;
--surface-container-low: #f6f3f2;
--surface-container-highest: #e5e2e1;
--outline: #897170;
--inverse-surface: #1b1b1c;
```

### Tailwind Extensions
```javascript
colors: {
  primary: '#CD5C5C',
  'primary-container': '#e28c8c',
  'on-primary': '#ffffff',
  surface: '#fcf9f8',
  'on-surface': '#1b1b1c',
  'surface-container': '#f0eded',
  'surface-container-low': '#f6f3f2',
  'surface-container-highest': '#e5e2e1',
  outline: '#897170',
  secondary: '#5f5e5e'
},
fontFamily: {
  headline: ['Space Grotesk', 'sans-serif'],
  body: ['Inter', 'sans-serif'],
  label: ['Space Grotesk', 'sans-serif']
}
```
