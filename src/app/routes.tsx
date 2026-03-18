import { createBrowserRouter } from "react-router";
import Home from "./screens/Home";
import SendInternet from "./screens/SendInternet";
import RequestInternet from "./screens/RequestInternet";
import SellInternet from "./screens/SellInternet";
import InternetHistory from "./screens/InternetHistory";
import DailyRewards from "./screens/DailyRewards";
import Missions from "./screens/Missions";
import GamificationHub from "./screens/GamificationHub";
import AllServices from "./screens/AllServices";
import Marketplace from "./screens/Marketplace";
import FriendsList from "./screens/FriendsList";
import DostNetPlus from "./screens/DostNetPlus";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/send",
    Component: SendInternet,
  },
  {
    path: "/request",
    Component: RequestInternet,
  },
  {
    path: "/sell",
    Component: SellInternet,
  },
  {
    path: "/history",
    Component: InternetHistory,
  },
  {
    path: "/rewards",
    Component: DailyRewards,
  },
  {
    path: "/missions",
    Component: Missions,
  },
  {
    path: "/gamification",
    Component: GamificationHub,
  },
  {
    path: "/all-services",
    Component: AllServices,
  },
  {
    path: "/marketplace",
    Component: Marketplace,
  },
  {
    path: "/friends",
    Component: FriendsList,
  },
  {
    path: "/plus",
    Component: DostNetPlus,
  },
]);