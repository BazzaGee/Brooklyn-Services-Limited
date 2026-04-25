# Design System Document: Block Dynamic

## 1. Overview & Creative North Star

### Creative North Star: "The Precision Architect"
This design system moves away from the utilitarian, traditional "tradesman" aesthetic to position the brand as a high-tech engineering firm. It is inspired by the **Block Oblique** logo—a symbol of momentum, structural integrity, and precision. 

The experience is built on a **Panel-Based Bento Grid** layout. Instead of a standard scrolling page, the UI is treated as a series of interlocking tactical modules. As the user scrolls, blocks don’t just move; they "click" into place with mathematical precision, simulating the assembly of a complex technical system. By utilizing asymmetric panels and high-contrast tonal depth, we eliminate the "template" look in favor of an editorial, premium digital environment.

---

## 2. Colors

The color palette is anchored in industrial power. We use bold reds as a surgical strike of color against a sophisticated, multi-layered grayscale foundation.

### The "No-Line" Rule
**Explicit Instruction:** Traditional 1px solid borders are strictly prohibited for sectioning. Structural boundaries must be defined solely through background color shifts. For example, a `surface-container-low` panel should sit directly against a `surface` background. The contrast between these tokens provides the necessary edge definition without the visual clutter of "lines."

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. We use Material Design container tiers to create depth:
*   **Base Layer:** `surface` (#fcf9f8)
*   **Secondary Panels:** `surface-container-low` (#f6f3f2)
*   **Actionable Modules:** `surface-container` (#f0eded)
*   **High-Priority Focus:** `surface-container-highest` (#e5e2e1)

### The Glass & Gradient Rule
To achieve a "High-Tech Detection" feel, floating navigation or overlay elements should use **Glassmorphism**. Apply a semi-transparent `surface` color with a `backdrop-blur` of 12px-20px. 
*   **Signature Texture:** Primary CTAs should use a subtle linear gradient from `primary` (#9f393b) to `primary_container` (#bf5152) at a 135-degree angle. This adds a "machined metal" sheen that flat color cannot replicate.

---

## 3. Typography

The typography strategy is "Technical Editorial." It balances the aggressive, modern weight of **Space Grotesk** with the utilitarian readability of **Inter**.

*   **Display & Headlines (Space Grotesk):** These are our "Block" elements. Use `display-lg` (3.5rem) with tight letter-spacing (-0.02em) to mimic the density of the brand logo. The mono-linear construction of Space Grotesk communicates precision and high-tech detection.
*   **Body & Titles (Inter):** Inter provides a neutral, professional contrast. Use `body-lg` (1rem) for descriptions to ensure the technical details feel approachable yet authoritative.
*   **Labels (Space Grotesk):** Small caps or high-tracking labels in Space Grotesk should be used for technical data points (e.g., "PRESSURE READING" or "LOCATION COORDINATES") to reinforce the "Detection" aspect of the brand.

---

## 4. Elevation & Depth

### Tonal Layering
Hierarchy is achieved through color-weight, not shadows. To make a "Bento" block stand out, place a `surface-container-lowest` card on top of a `surface-container-low` section. The subtle shift in hex code creates a "soft lift."

### Ambient Shadows
If a block must "float" (e.g., an active detection notification), use an **Ambient Shadow**:
*   **Y-Offset:** 20px
*   **Blur:** 40px
*   **Color:** `on-surface` (#1b1b1c) at 6% opacity.
*   **Result:** A shadow that looks like natural light dispersion rather than a digital drop shadow.

### The Ghost Border Fallback
In high-density data areas where separation is critical, use a **Ghost Border**:
*   **Token:** `outline-variant` (#ddc0be)
*   **Opacity:** 15%
*   **Weight:** 1px
*   *Note: Never use a 100% opaque border.*

---

## 5. Components

### Buttons (The "Actuator")
*   **Primary:** Gradient fill (`primary` to `primary_container`), `on-primary` text, `xl` (0.75rem) rounded corners.
*   **Secondary:** `surface-container-highest` fill with no border. On hover, shift to `primary-fixed-dim`.
*   **Tertiary:** Text-only in `primary` with a 2px `surface-tint` underline that expands on hover.

### Bento Cards
*   Forbid divider lines. Separate "Heading," "Icon," and "Body" using the **Spacing Scale** (e.g., 24px gap). 
*   Use `surface-container` as the default card background.
*   **Dynamic State:** When hovered, the card should scale slightly (1.02x) and the background should shift to `surface-bright`.

### Detection Inputs
*   **Text Fields:** Use `surface-container-low` as the field background. No bottom line. Use a `sm` (0.125rem) radius.
*   **Focus State:** The `outline` token (#897170) should appear at 40% opacity as a soft outer glow.

### Scrolling Panels
*   Utilize **Panel-Linking**: As the user scrolls, a `primary` red vertical bar (the "Connection Line") should animate between Bento blocks, visually representing a "pipe" or "circuit" connecting the services.

---

## 6. Do's and Don'ts

### Do
*   **Do** use intentional asymmetry. A Bento grid is more dynamic when one column is 60% width and the next is 40%.
*   **Do** use "Optical Alignment." Because the logo is oblique (slanted), ensure that text blocks have generous leading to feel balanced.
*   **Do** use high-contrast imagery—macro shots of technical equipment or clean, architectural views of Christchurch infrastructure.

### Don'ts
*   **Don't** use standard 1px borders or dividers. It breaks the "Block Dynamic" immersion.
*   **Don't** use generic blue "trust" colors. We rely on the depth of `inverse_surface` (#303030) and the urgency of `primary` red.
*   **Don't** use rounded corners larger than `xl` (0.75rem). The brand is "precise" and "technical," not "soft" or "playful." Keep corners crisp.
*   **Don't** overlay red text on dark backgrounds unless it is a high-priority `error` state. Use `on-primary-fixed` for subtle red-tinted information.