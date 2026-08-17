Set up this mobile app design to be fully responsive using Figma's auto-layout system.
Base frame size: 393 × 852px (iPhone 14 Pro)
Rules to apply to every screen frame:

Frame constraints

Set each screen frame to: Width = Fill container, Height = Fill container
In the Design panel → Constraints: set both to Scale


Auto-layout on all containers

Every section, card, and column should use Auto Layout (not absolute positioning)
Direction: Vertical for pages, Horizontal for rows
Set padding using variables (not hardcoded px)
Gap between items: use Auto Layout spacing tokens


Text sizing

Body text: Min 12px, preferred 14px — set with Min/Max width constraints
Headings: use Responsive Text (enable in Typography settings)
Never use fixed-width text boxes — use Fill or Hug


Components

All components should have: Horizontal resizing = Fill, Vertical resizing = Hug contents
Buttons: Hug width (not fixed), Fill on stretch
Cards: Fill container width, Hug height


Spacing tokens to define:

   space-xs:  4px
   space-sm:  8px
   space-md: 16px
   space-lg: 24px
   space-xl: 32px
   space-2xl: 48px

Breakpoints to set up (using Figma Variables):

Mobile S: 320px
Mobile M: 393px  ← base
Mobile L: 428px
Tablet:   768px (optional)


The bottom navigation bar

Fixed to bottom: use Position = Fixed in prototype mode
Height: 84px fixed, width: Fill
Items: equally spaced with Auto Layout → Space between


Scrollable screens

Set the inner content frame to: Overflow = Scroll (vertical)
The outer phone frame clips content


Brand colour variables to define:

   bg/parchment:      #F5F0EB
   bg/card:           #EDE5D8
   text/primary:      #1E1508
   text/secondary:    #A08050
   accent/terracotta: #C4722A
   accent/gold:       #D4A847
   accent/stone:      #C9B8A0

Final check

Select all frames → Plugins → Responsify (or similar) → test at 320px and 428px
Nothing should overflow or clip unexpectedly
All tap targets minimum 44 × 44px




What this achieves
BeforeAfterFixed 393px frames that break at other sizesFrames that stretch/compress gracefullyHardcoded padding numbersSpacing tokens that scale togetherText boxes with fixed widths that clipText that reflows naturallyComponents that don't resizeComponents that fill their container

Tip for Figma Make specifically
If using the AI prompt field in Figma Make, paste this shorter version:

"Make all frames in this file responsive using auto-layout. Use Fill container for width on all sections and cards. Replace all fixed-width text boxes with Hug or Fill. Add spacing tokens: xs=4, sm=8, md=16, lg=24, xl=32. Set bottom nav to fixed position. Ensure all tap targets are at least 44×44px. Base frame is 393×852 iPhone 14 Pro."