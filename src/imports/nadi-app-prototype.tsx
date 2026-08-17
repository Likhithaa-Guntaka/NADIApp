Build a fully interactive multi-screen mobile app prototype for NADI, a cognitive wellness wristband + app system. Use React with hooks. Render everything inside a single component with no required props and a default export.

SETUP

Inject Google Fonts at runtime via useEffect:
https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap

Inject a style tag with these keyframe animations:
- blobPulse: morphs border-radius between three organic shapes over 6s ease-in-out infinite
- rippleOut: scale 1 to 2.8, opacity 0.5 to 0, over 2.2s ease-out infinite
- glowPulse: box-shadow pulses between dim and bright amber-red glow over 4s ease-in-out infinite
- fadeUp: opacity 0 to 1, translateY 10px to 0

Also inject: * { box-sizing: border-box; margin: 0; padding: 0 } and ::-webkit-scrollbar { width: 0; height: 0 }

COLOR TOKENS

Define as a const object called C:

bg: "#F5EFE8"
card: "#FAF3EC"
text: "#3D1A0E"
sec: "#8A7560"
indian: "#C4722A"
idaAccent: "#A8BED4"
idaLabel: "#6A8AA0"
idaPrimary: "#E8EEF4"
pingalaRed: "#C0392B"
pingalaOrange: "#C4722A"
pingalaGlow: "#E85A2A"
gold: "#D4A847"
brightGold: "#F0C84A"
honey: "#B8860B"
prana: "#A8BED4"
tejas: "#C04A2A"
ojas: "#B8860B"
btn: "#C0392B"
green: "#4A7C59"

SCALE RULE

Every single px value in the entire codebase must be multiplied by a sc (scale factor) prop passed into each component. Never hardcode px values. Define a helper: const s = (n) => n * sc

IPHONE 14 PRO FRAME COMPONENT

PhoneFrame accepts children and sc (default 1).
- Outer shell: 393 x 852 x sc, borderRadius 47 x sc, background #111
- Inner content area: full inset, same border radius, overflow hidden, background C.bg, fontFamily DM Sans
- Dynamic Island: position absolute, top 14 x sc, horizontally centered, 126 x 37 x sc, background #080808, borderRadius 20 x sc, zIndex 200
- Box shadow: 0 0 0 1.5 x sc px #3A3A3A, plus layered dark drop shadow

BOTTOM NAV COMPONENT

BottomNav accepts active (string) and onNav (function) and sc.
Five tabs: Home symbol (a hexagon outline), Revisit symbol (circular arrow), Speak symbol (large filled circle), Restore symbol (four-pointed star), Profile symbol (double circle outline).
- Active tab: color C.btn, small red underline pill at bottom
- Inactive tab: color C.sec at 60% opacity
- Speak icon is fontSize 21 x sc, others 16 x sc
- Background: rgba(250,243,236,0.94), backdropFilter blur 20px
- Height 84 x sc, position absolute bottom 0, zIndex 100
- Tab labels: 9 x sc, fontWeight 500 when active, 400 when inactive

ENERGY BLOB COMPONENT

EnergyBlob accepts value (number) and sc.
- Container div: 195 x sc square, position relative, flex center
- Outer halo: position absolute, 138% of container, borderRadius 50%, radial gradient amber to red at low opacity, blobPulse 9s animation
- Inner halo: 112% of container, borderRadius 50%, similar gradient more transparent, blobPulse 6s reverse
- Main blob: 100% size, radial gradient from C.brightGold at top-left to C.pingalaOrange to C.pingalaGlow to C.btn, border-radius animated with blobPulse 6s, glowPulse 4s simultaneously
- Inside blob: "ENERGY" text (10 x sc, white 78% opacity, letterSpacing 2.5 x sc, uppercase, DM Sans), below it the value number (54 x sc, white, Playfair Display, weight 600, lineHeight 1)

NAVIGATION SYSTEM

Root component holds a screens state string (default "home") and an active state string for prototype mode screen picker. All screen components receive onNav (function that sets the screens state) and sc as props.

Screen IDs: welcome, signin, onboarding, wristband, tutorial, home, speak, captured, revisit, restore, profile

Navigation map:
- welcome: Create account button goes to onboarding, Sign in button goes to signin
- signin: Sign in button goes to home
- onboarding: Allow & Continue goes to wristband
- wristband: Continue goes to tutorial
- tutorial: Next arrow advances pages, final page Begin NADI goes to home
- home: Restore now button goes to restore, Ready to Revisit Now button goes to revisit
- speak: tapping record button toggles recording state, tapping again goes to captured
- captured: Done goes to home
- Bottom nav tabs always navigate to their respective screen

SCREEN 01 - WELCOME

Full height div. Background: linear-gradient(175deg, #F5EFE8, #ECE3D5).

Top area: an animated organic shape using blobPulse, 110 x sc size, amber-red radial gradient. Inside it a smaller circle with warm gradient.

Center: NADI wordmark in Playfair Display, fontSize 68 x sc, fontWeight 600, color C.text, letterSpacing 10 x sc. Below it: "Feel your energy before it runs out." in DM Sans, 15 x sc, fontWeight 300, color C.sec, textAlign center, lineHeight 1.6.

Bottom: "Create account" primary button (height 56 x sc, background C.btn, borderRadius 16 x sc, white text, red box-shadow). Below it "Sign in" outline button (height 52 x sc, transparent background, 1.5px border rgba(196,114,42,0.4), borderRadius 16 x sc, color C.text). Below both: caption "A NEW SENSE FOR YOUR MIND" in 10 x sc, letterSpacing 0.5, C.sec at 60% opacity.

SCREEN 02 - SIGN IN

Back button top-left (text: <- Back, color C.sec, 13 x sc, no border no background).

Serif heading "Welcome back." in Playfair Display 30 x sc weight 600. Subtitle "Sign in to continue your rhythm." in DM Sans 13 x sc weight 300.

Two input field mockups stacked. Each has: an uppercase label above it (11 x sc, C.sec, letterSpacing 0.6, weight 500). The field itself is a div (height 52 x sc, background C.card, borderRadius 14 x sc, border 1px solid rgba(138,117,96,0.2)). Inside each field div place a short horizontal line (width 55% for email, 40% for password, height 1.5 x sc, background C.sec at 35% opacity, borderRadius 1) to simulate placeholder text.

Forgot password link right-aligned (fontSize 12 x sc, color C.indian).

Sign in primary button (height 54 x sc, background C.btn, borderRadius 16 x sc, white, red box-shadow, DM Sans 15 x sc weight 500).

Divider row: two horizontal lines with "or continue with" text centered (fontSize 11 x sc, C.sec 70%).

Two sign-in option rows for Apple and Google. Each: height 50 x sc, background C.card, borderRadius 14 x sc, border 1px solid rgba(138,117,96,0.18), flex row center, gap 8 x sc. Apple row shows apple emoji + "Continue with Apple". Google row shows blue circle emoji + "Continue with Google". Both in DM Sans 13 x sc.

SCREEN 03 - ONBOARDING

Top label: "Getting started" in 11 x sc, color C.indian, letterSpacing 2, uppercase, weight 500.
Heading: "Establishing Your Rhythm" in Playfair Display 27 x sc weight 600.
Subtitle: "These signals help NADI estimate your cognitive resilience over time." DM Sans 13 x sc weight 300 C.sec.

Three permission cards. Each card: background C.card, borderRadius 18 x sc, padding 16 x sc, border 1px. Flex row with icon square on left, text in middle, checkbox on right. Cards are tappable: clicking toggles a granted boolean in state.

Card 1: Connection, icon 📡, accent color C.idaAccent. Card 2: Reflection, icon 🎙, accent color C.gold. Card 3: Baseline, icon 🫀, accent color C.pingalaOrange.

Icon square: 46 x sc, borderRadius 13 x sc, background accent at 20% opacity, border 1.5px accent at 40%.
Text block: title 14 x sc C.text weight 500, description 11 x sc C.sec weight 300 lineHeight 1.4.
Checkbox div: 26 x sc square, borderRadius 8 x sc. When granted: background and border use accent color, white checkmark inside. When not: transparent background, border C.sec 50%.
When granted: card border glows with accent color (1px solid accent + outer box-shadow).

Privacy note card below the three cards: background rgba(212,168,71,0.1), borderRadius 14 x sc, border rgba(212,168,71,0.25), text "NADI never shares your data. All processing happens on device. You own your rhythm." 11 x sc C.sec weight 300.

"Allow & Continue" primary button at bottom (height 54 x sc, C.btn, borderRadius 16 x sc).

SCREEN 04 - WRISTBAND

Heading: "A new sense for cognitive energy." Playfair Display 26 x sc weight 600.
Subtitle: "The wristband communicates energy states through subtle temperature changes - below your conscious threshold." DM Sans 13 x sc weight 300 C.sec.

SVG wristband illustration (width 200 x sc, height 80 x sc). Draw a horizontal wristband strap using a rect with dark brown gradient fill, rounded ends (rx 18). In the center draw an ellipse as the watch case (dark background), inside it another ellipse with amber-to-red radial gradient as the watch face, a small bright circle in the center as screen reflection. On the right edge of the case draw a small rounded rect as the side button. On both ends of the strap add small rounded rects as the closure buckle pieces.

Three temperature state rows. Each row: background C.card, borderRadius 14 x sc, padding 11 x sc, border rgba(138,117,96,0.13), flex row, gap 12 x sc.
Row 1: dot color #E85A2A, label "Warm band", desc "Balanced or entering high capacity."
Row 2: dot color C.idaAccent, label "Cooling band", desc "Cognitive depletion beginning."
Row 3: dot color C.honey, label "Neutral band", desc "No strong shift detected."
Each dot: 10 x sc circle, box-shadow glow matching dot color.

Press & Speak card: background rgba(192,57,43,0.07), borderRadius 16 x sc, border rgba(192,57,43,0.18). Heading "Press & Speak" in 12 x sc C.btn weight 600. Body text explaining voice capture mechanic 12 x sc C.sec weight 300.

Connection status row: background C.card, borderRadius 14 x sc, border rgba(74,124,89,0.3), flex row space-between. Left: "Wristband" 13 x sc C.text. Right: green dot + "Connected" 12 x sc C.green weight 500.

Continue primary button at bottom.

SCREEN 05 - TUTORIAL

Use useState to track current page (0, 1, or 2).

Progress bars at top: three horizontal bars in a flex row. Active bar uses flex 2.5. Inactive bars use flex 1. Active: background C.indian, height 3 x sc, borderRadius 2 x sc. Inactive: background C.sec 28% opacity. Each is clickable to jump pages. Transition: all 0.3s ease.

Page data:
Page 0 - English title: "Energy Channels", Sanskrit label: "Nadi", description: "Your cognitive energy flows through three natural channels. NADI monitors all three to give you a whole picture.", items: [{ color: C.idaAccent, name: "Rest Channel", sk: "Ida", desc: "Recovery, calm, and inward flow" }, { color: C.btn, name: "Drive Channel", sk: "Pingala", desc: "Outward focus, action, and heat" }, { color: C.gold, name: "Balance Channel", sk: "Sushumna", desc: "Integration of both channels" }]
Page 1 - English title: "Mental Energy System", Sanskrit label: "Prana - Tejas - Ojas", description: "Three forms of energy power your cognition. When they're in balance, thinking feels effortless.", items: [{ color: C.prana, name: "Input Flow", sk: "Prana", desc: "Vitality - how much you take in" }, { color: C.tejas, name: "Thinking Fuel", sk: "Tejas", desc: "Clarity, discernment, focus" }, { color: C.ojas, name: "Reserve Energy", sk: "Ojas", desc: "Deep resilience and stamina" }]
Page 2 - English title: "Cognitive States", Sanskrit label: "The Five States of Mind", description: "Your mind naturally moves through five states. Knowing where you are helps you work with your energy, not against it.", items: [{ color: C.btn, name: "Scattered", sk: "Ksipta", desc: "Restless and distracted" }, { color: C.sec, name: "Dull", sk: "Mudha", desc: "Heavy, foggy, slow" }, { color: C.indian, name: "Wavering", sk: "Viksipta", desc: "Partially focused" }, { color: C.gold, name: "Absorbed", sk: "Ekagra", desc: "Deep, flowing attention" }, { color: C.green, name: "Mastered", sk: "Niruddha", desc: "Complete calm clarity" }]

Render the active page. English title: Playfair Display 26 x sc weight 600. Sanskrit label: italic 11 x sc C.indian weight 400 letterSpacing 0.3. Description: DM Sans 13 x sc weight 300 lineHeight 1.6.

Each item row: background C.card, borderRadius 15 x sc, padding 12 x sc, border rgba(138,117,96,0.11), flex row gap 12 x sc.
Icon square: 34 x sc, borderRadius 10 x sc, background item.color 20% opacity, border 1.5px item.color 55%. Inside: 9 x sc circle in item.color.
Text: name 13 x sc C.text weight 500, desc 11 x sc C.sec weight 300.
Sanskrit label: 10 x sc C.indian italic opacity 0.75, right-aligned.

Bottom button: pages 0-1 show "Next ->" and advance the page. Page 2 shows "Begin NADI" and navigates to home. Height 52 x sc, C.btn, borderRadius 16 x sc.

SCREEN 06 - HOME DASHBOARD

Header row: NADI wordmark left (Playfair Display 24 x sc weight 600 letterSpacing 3 x sc C.text). Right side: small green dot + "Band" text in 10 x sc C.green, then a circular avatar (32 x sc, gradient C.indian to C.btn, initial letter "S" in white Playfair Display 13 x sc). Padding top 58 x sc.

Scrollable content area (flex 1, overflowY auto, paddingBottom 88 x sc for nav).

EnergyBlob component centered, value 84.

Three state cards in a flex row below the blob. Gap 8 x sc, horizontal padding 18 x sc.
Card 1: label "Input Flow", dot color C.prana, value 72.
Card 2: label "Thinking Fuel", dot color C.tejas, value 61.
Card 3: label "Reserve Energy", dot color C.ojas, value 44.
Each card: flex 1, background C.card, borderRadius 14 x sc, padding 12 x sc 6 x sc, textAlign center, border rgba(138,117,96,0.11).
Inside: dot (8 x sc circle, auto margin bottom 5 x sc, box-shadow glow matching dot color), value number (17 x sc Playfair Display weight 600), label (9 x sc C.sec weight 300 lineHeight 1.35).

Insight card: margin 0 18 x sc, background C.card, borderRadius 18 x sc, padding 15 x sc, border rgba(212,168,71,0.28), box-shadow subtle.
Label: "Insight" 10 x sc C.gold weight 500 letterSpacing 1.2 uppercase.
Body: "Your thinking fuel has been dropping since 2pm. You have a 45 minute window at 4pm for focused work." 13 x sc C.text lineHeight 1.55 weight 400.
Restore button: background C.green, borderRadius 10 x sc, white, 12 x sc weight 500, padding 7 x sc 14 x sc. Navigates to restore screen.

Ready to Revisit section heading: 12 x sc C.text weight 600.
Two captured thought cards:
Card 1: type "Task", text "Reply to Marcus about the Q3 proposal", color C.pingalaOrange, time "captured 3h ago"
Card 2: type "Idea", text "Try the NADI feedback loop for onboarding", color C.gold, time "yesterday"
Each card: background C.card, borderRadius 14 x sc, padding 12 x sc 13 x sc, border rgba(138,117,96,0.1), flex row, gap 10 x sc.
Left: 5 x sc dot in item color with glow, marginTop 5 x sc.
Center: type label (9 x sc item.color weight 600) + time (9 x sc C.sec 60% weight 300), then text (12 x sc C.text lineHeight 1.4).
Right: two small action button divs: "Now" (C.btn tint background, C.btn border, C.btn text, 10 x sc) and "..." (transparent, C.sec border). "Now" navigates to revisit.

Weekly Energy chart card: margin 0 18 x sc, background C.card, borderRadius 18 x sc, padding 15 x sc, border rgba(138,117,96,0.1).
Header row: "Weekly Energy" 12 x sc C.text weight 600, "This week" 10 x sc C.sec weight 300.
Chart area: background using CSS repeating-linear-gradient horizontal rules (rgba(138,117,96,0.055) lines every 16 x sc px), borderRadius 8 x sc, height 80 x sc, flex row, alignItems flex-end, gap 6 x sc, padding 8 x sc 2 x sc.
Day values array: [0.68, 0.82, 0.55, 0.88, 0.48, 0.72, 0.79]. Today is index 4.
Each day column: flex 1, flex column, alignItems center, height 100%, justifyContent flex-end.
Inside each: a relative container (width 72%, height 100%). Inside it: an absolute full-height faint background bar (rgba(138,117,96,0.09), borderRadius top). Stacked above it a z-index 1 active bar (height barVals[i] x 100%, borderRadius top, today uses gradient C.gold to C.btn with glow, others use C.indian 65% to C.btn 45%).
Day labels row below chart: M T W T F S S, today's label uses C.indian weight 600, others C.sec 70% weight 400.

Bottom nav with active="home".

SCREEN 07 - SPEAK

Background: radial gradient rgba(192,57,43,0.07) at center fading to C.bg.
Header row: Cancel button left (background none, border none, C.sec 13 x sc, navigates to home), "Speak" centered (Playfair 15 x sc weight 500), empty div right for balance.

Center area (flex 1, flex column, alignItems center, justifyContent center, gap 44 x sc):

Recording button container: 220 x sc square, position relative, flex center.
Three ripple ring divs (position absolute, 104 x sc, borderRadius 50%, border 1.5px C.btn with decreasing opacity, rippleOut animation with delays 0s, 0.5s, 1s). Only render these when recording state is true.

Main button: 104 x sc circle (borderRadius 50%). 
When not recording: background radial gradient rgba(192,57,43,0.18) to rgba(192,57,43,0.06), border 2px C.btn at 50% opacity, inner shape is a 36 x sc circle in C.btn.
When recording: background radial gradient C.pingalaGlow to C.btn, border 2px C.btn, glowPulse animation, inner shape is a 28 x sc rounded square (borderRadius 6 x sc) in white.
Clicking toggles recording. Clicking while recording navigates to captured.

Instruction text: if not recording show "Say anything on your mind." (Playfair 17 x sc italic weight 500) and "Tasks, ideas, worries, or questions." (DM Sans 13 x sc weight 300 C.sec). If recording show "Listening..." and "Tap to stop recording."

When recording, show a waveform: flex row, gap 6 x sc, 10 vertical bars with widths 3 x sc and varying heights (e.g. 6, 10, 16, 12, 18, 14, 8, 12, 16, 10 all x sc), background C.btn, borderRadius 2 x sc, varying opacity.

Bottom nav with active="speak".

SCREEN 08 - CAPTURED

Background: radial gradient rgba(74,124,89,0.1) at 50% 45% fading to C.bg.
Full height flex column, alignItems center, justifyContent center, padding 36 x sc.

Checkmark circle: 84 x sc, borderRadius 50%, background radial gradient rgba(74,124,89,0.22) to rgba(74,124,89,0.06), border 2px rgba(74,124,89,0.45), flex center, fontSize 32 x sc color C.green, boxShadow 0 0 30 x sc rgba(74,124,89,0.25). Shows a checkmark character.

"Captured." heading: Playfair Display 32 x sc weight 600 C.text textAlign center.
Subtitle: "NADI will revisit this when your energy allows." DM Sans 14 x sc weight 300 C.sec textAlign center lineHeight 1.65 maxWidth 270 x sc.

Auto-categorized card: background C.card, borderRadius 18 x sc, padding 16 x sc, width 100%, border rgba(74,124,89,0.22). Label "Auto-categorized" 10 x sc C.green weight 500 letterSpacing 1.2 uppercase. Below it three tag pills in flex wrap gap 7 x sc: "Task", "Est. 20 min", "Best at: 4pm window". Each pill: padding 5 x sc 11 x sc, background rgba(74,124,89,0.1), border rgba(74,124,89,0.3), borderRadius 20 x sc, 11 x sc C.green weight 400.

Suggested window card: background C.card, borderRadius 16 x sc, padding 14 x sc, width 100%, border rgba(212,168,71,0.2). Label "Suggested window" 10 x sc C.gold weight 500 letterSpacing 1 uppercase. Body "4:00 PM today - 45 min free, high focus predicted" 13 x sc C.text weight 400.

"Done" button (height 52 x sc, C.btn, borderRadius 16 x sc, width 100%, marginTop 28 x sc). Navigates to home.

SCREEN 09 - REVISIT

Header: "Revisit" Playfair 26 x sc weight 600, subtitle "Your captured thoughts, ready when you are." DM Sans 13 x sc C.sec weight 300.

Calendar strip: background C.card, borderRadius 16 x sc, padding 13 x sc, border rgba(138,117,96,0.11). Section label "Today's windows" 10 x sc C.sec letterSpacing 0.8 uppercase. Three time slot rows (flex row, gap 10 x sc, marginBottom 8 x sc except last):
- "2:00 PM" + "Team meeting" (color C.btn)
- "3:15 PM" + "Free window" (color C.green)
- "4:00 PM" + "High focus window" with lightning bolt prefix (color C.gold)
Each slot: 3 x sc wide colored left-bar (borderRadius 2 x sc, height 22 x sc), time text 10 x sc C.sec weight 300 fixed width, label text 12 x sc C.text weight 400.

Three captured thought cards in scrollable area. Thought data:
Card 1: type "Task", text "Draft the Q3 proposal outline for Friday", color C.pingalaOrange, time "3h ago", hint "Schedule at 4pm?"
Card 2: type "Idea", text "Use NADI feedback loop in onboarding - show band responding in real time", color C.gold, time "Yesterday", hint "Explore further?"
Card 3: type "Emotion", text "Feeling overwhelmed with the presentation prep, can't focus", color C.idaAccent, time "2 days ago", hint "Breathe and reflect?"

Each card: background C.card, borderRadius 16 x sc, padding 13 x sc 14 x sc, marginBottom 10 x sc, border rgba(138,117,96,0.1), boxShadow subtle.
Top row: colored dot + type label (9 x sc item.color weight 600) left, time text right (9 x sc C.sec 70% weight 300).
Main text: 12 x sc C.text lineHeight 1.5.
Hint text: 11 x sc C.sec italic weight 300.
Three action buttons in a flex row: "Work now" (flex 1, height 28 x sc, C.btn tint background, C.btn border, C.btn text, borderRadius 8 x sc, 10 x sc weight 500), "Park later" (flex 1, transparent, C.sec border, C.sec text), "Delete" (flex 1, transparent, rgba(192,57,43,0.18) border, rgba(192,57,43,0.65) text).

Bottom nav with active="revisit".

SCREEN 10 - RESTORE

Header: "Restore" Playfair 26 x sc weight 600. Subtitle "Your reserve energy is low. True rest is part of the work." DM Sans 13 x sc weight 300 C.sec.

Warning banner: background rgba(184,134,11,0.08), borderRadius 15 x sc, border rgba(184,134,11,0.3), flex row, gap 10 x sc, padding 12 x sc.
Left: thermometer emoji 18 x sc. Right: heading "Reserve Energy at 44%" 12 x sc C.honey weight 500, body "Ojas is depleting. Rest is not optional - it is the rebuild." 11 x sc C.sec weight 300 lineHeight 1.5.

2-column grid of 6 activity cards (CSS grid, gridTemplateColumns 1fr 1fr, gap 10 x sc). Activity data:
{ icon: pencil emoji, label: "Sketching", desc: "Create without demands" }
{ icon: movie clapper emoji, label: "Watch a film", desc: "Absorb without producing" }
{ icon: walking person emoji, label: "Walk outside", desc: "Move. Let the mind still." }
{ icon: music notes emoji, label: "Listen to music", desc: "Let sound carry you" }
{ icon: bathtub emoji, label: "Slow bath", desc: "Full sensory rest" }
{ icon: open book emoji, label: "Read fiction", desc: "Borrow another world" }
Each card: background C.card, borderRadius 18 x sc, padding 15 x sc 13 x sc, border rgba(138,117,96,0.1), cursor pointer. Emoji fontSize 24 x sc, marginBottom 8 x sc. Label 13 x sc C.text weight 500. Desc 11 x sc C.sec weight 300 lineHeight 1.4.

72-Hour Protocol card: background rgba(192,57,43,0.05), borderRadius 16 x sc, padding 14 x sc, border rgba(192,57,43,0.14). Heading "72-Hour Protocol" 12 x sc C.btn weight 600. Body "If deep depletion persists for 72 hours, NADI will gently suggest reaching out to someone you trust." 12 x sc C.sec weight 300 lineHeight 1.6.

Bottom nav with active="restore".

SCREEN 11 - PROFILE

Avatar section: flex column, alignItems center, gap 8 x sc, padding top 60 x sc.
Avatar circle: 64 x sc, borderRadius 50%, gradient C.indian to C.btn, flex center, initial letter "S" in white Playfair Display 24 x sc weight 600, boxShadow red glow.
Name "Swetha" 15 x sc C.text weight 500.
Status row: 6 x sc green dot + "Band connected - 14 days streak" 11 x sc C.sec weight 300.

Stats row: flex row, gap 10 x sc, padding 0 18 x sc, marginBottom 18 x sc.
Three stat tiles: { label: "Avg Energy", val: "78" }, { label: "Captures", val: "24" }, { label: "Restored", val: "11" }
Each tile: flex 1, background C.card, borderRadius 14 x sc, padding 10 x sc 8 x sc, textAlign center, border rgba(138,117,96,0.1). Value in Playfair Display 18 x sc C.text weight 600. Label 9 x sc C.sec weight 300 marginTop 2 x sc.

Three settings groups in scrollable area (overflowY auto, paddingBottom 90 x sc):
Group 1 section label "NADI", items: ["How it works", "Wristband guide", "Tutorial recap", "FAQ"]
Group 2 section label "Settings", items: ["Notifications", "Restore preferences", "Calendar sync", "Data & privacy"]
Group 3 section label "Sovereignty", items: ["72-hour protocol", "Data on device", "Delete all data"]

Section labels: 10 x sc C.indian weight 500 letterSpacing 1.6 uppercase, marginBottom 7 x sc.
Each group list: background C.card, borderRadius 16 x sc, overflow hidden, border rgba(138,117,96,0.1).
Each list item: padding 13 x sc 15 x sc, borderBottom 1px rgba(138,117,96,0.09) except last, flex row space-between, cursor pointer. Label text 13 x sc C.text weight 400. Exception: "Delete all data" uses rgba(192,57,43,0.75). Chevron right: 15 x sc C.sec 50%.

Footer: textAlign center, padding 12 x sc 0. "NADI" in Playfair Display 13 x sc C.sec 60% letterSpacing 2. Below it "v1.0.0 - Data stays on your device" 10 x sc C.sec 40% weight 300.

Bottom nav with active="profile".

MAIN APP SHELL

Root component renders a dark workspace.

Outer wrapper: minHeight 100vh, background #191919, flex column, fontFamily DM Sans.

Toolbar: height 48px (not scaled), background #262626, borderBottom 1px solid #333, flex row, alignItems center, padding 0 20px, gap 16px, flexShrink 0, zIndex 100.
Left side: small logo div (22px square, borderRadius 6px, gradient C.indian to C.btn, flex center, small white dot inside) + "NADI" wordmark (Playfair Display, color #E8DDD4, fontSize 14px, letterSpacing 4px, weight 600) + breadcrumb text "/ Design System / App Screens v1.0" in gray.
Center: flex 1 spacer.
Mode switcher pill: background #181818, borderRadius 8px, padding 3px, flex row, gap 2px. Two buttons: "Canvas" (with grid symbol) and "Prototype" (with play symbol). Active button: background #333, color #E8DDD4. Inactive: transparent, color #666.
Right side: "iPhone 14 Pro - 393x852" text + divider + "11 screens" text. All in 11-12px gray.

State: mode (canvas or prototype), active screen string, CANVAS_SC = 0.395, PROTO_SC = 0.88.

CANVAS MODE (mode === "canvas"):
Full flex 1 div, overflowY auto, dot-grid background (radial-gradient(circle, #2A2A2A 1px, transparent 1px) at 24px 24px), padding 52px, display flex, flexWrap wrap, gap: 56px row 40px column, alignItems flex-start.

For each of the 11 screens render a column (flex column, alignItems center, gap 12px, cursor pointer). On click: set mode to "prototype" and set active to that screen's id.
Inside each column: screen label above ("01 - Welcome" etc, 10px #555 uppercase letterSpacing 0.4), PhoneFrame at CANVAS_SC containing the screen component (pass null for onNav since navigation is disabled in canvas), "click to preview" caption below (10px #444, background #222, borderRadius 4px, padding 2px 8px, border #333).
On hover: add onMouseEnter/onMouseLeave handlers to the PhoneFrame wrapper to apply transform translateY(-4px), transition 0.15s ease.

PROTOTYPE MODE (mode === "prototype"):
Full flex 1 div, flex column, alignItems center, padding 28px 20px, gap 20px, overflow auto, same dot-grid background.

Screen selector: flex row, gap 5px, flexWrap wrap, justifyContent center, maxWidth 820px.
For each screen: a button showing the short screen name (e.g. "Welcome", "Sign In", etc). Active button: background rgba(196,114,42,0.85), border C.indian, white text, weight 600. Inactive: background #252525, border #333, color #666. All: padding 4px 12px, borderRadius 6px, fontSize 10px, cursor pointer, transition all 0.15s, whiteSpace nowrap.

Below: flex row, alignItems flex-start, gap 36px.

Left side (flex column, alignItems center, gap 14px):
PhoneFrame at PROTO_SC containing the active screen component with onNav wired to setActive and sc = PROTO_SC.
Progress dots row: flex row, gap 8px. For each screen: a div, active dot is 18px wide 6px tall borderRadius 3px background C.indian, inactive is 6x6 borderRadius 3px background #333. All cursor pointer, transition all 0.2s.

Right side (side panel, color #666, fontSize 12px, maxWidth 180px, paddingTop 32px):
Screen name in Playfair Display 15px #CCBFB5 weight 600 marginBottom 10px.
Instructions text "Tap any button inside the phone to navigate between screens." 11px #888 lineHeight 1.7 marginBottom 20px.
Divider + specs section with rows for: Frame ("iPhone 14 Pro"), Screen ("393 x 852 pt"), Scale (show as percentage e.g. "88%"), Fonts ("Playfair Display, DM Sans"). Each row: flex row space-between, key 10px #555, value 10px #888.
Divider + Navigate section: label "NAVIGATE" 10px #555 letterSpacing 0.5. Two buttons: left arrow and right arrow. Each: flex 1, height 28px, background #2A2A2A, border #333, borderRadius 6px, color #888, fontSize 12px, cursor pointer. Left arrow navigates to previous screen in order. Right arrow navigates to next screen in order.

FINAL REQUIREMENTS

No external UI libraries. Pure inline styles only. No localStorage or sessionStorage. All values scaled by sc. Every screen must be fully visible and scrollable within the phone frame. The blob animation must be live (CSS animation, not JS). The recording button in Speak must actually toggle state visually. The permission cards in Onboarding must toggle individually. The tutorial pages must swipe forward via button. Bottom nav must be functional on every screen that shows it. Canvas mode must show all 11 phones. Prototype mode must allow free navigation between all screens.