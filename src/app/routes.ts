import { createBrowserRouter } from "react-router";
import { Welcome } from "./screens/Welcome";
import { SignIn } from "./screens/SignIn";
import { Permissions } from "./screens/Permissions";
import { ConnectCalendar } from "./screens/ConnectCalendar";
import { HowItWorks } from "./screens/HowItWorks";
import { HomeDashboard } from "./screens/HomeDashboard";
import { VoiceCapture } from "./screens/VoiceCapture";
import { VoiceCaptured } from "./screens/VoiceCaptured";
import { ThoughtsInbox } from "./screens/ThoughtsInbox";
import { ResurfacedThought } from "./screens/ResurfacedThought";
import { TasksCalendar } from "./screens/TasksCalendar";
import { WeeklyPatterns } from "./screens/WeeklyPatterns";
import { RestoreMode } from "./screens/RestoreMode";
import { Profile } from "./screens/Profile";

export const router = createBrowserRouter([
  { path: "/", Component: Welcome },
  { path: "/signin", Component: SignIn },
  { path: "/permissions", Component: Permissions },
  { path: "/connect-calendar", Component: ConnectCalendar },
  { path: "/how-it-works", Component: HowItWorks },
  { path: "/home", Component: HomeDashboard },
  { path: "/voice-capture", Component: VoiceCapture },
  { path: "/voice-captured", Component: VoiceCaptured },
  { path: "/thoughts", Component: ThoughtsInbox },
  { path: "/resurfaced", Component: ResurfacedThought },
  { path: "/tasks", Component: TasksCalendar },
  { path: "/weekly-patterns", Component: WeeklyPatterns },
  { path: "/restore", Component: RestoreMode },
  { path: "/profile", Component: Profile },
]);