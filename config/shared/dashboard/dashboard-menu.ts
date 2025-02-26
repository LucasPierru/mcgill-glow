import {
  dashBoardEvent,
  dashBoardPost,
  dashBoardSettings,
} from "@/config/shared/dashboard";
import { DashBoardType } from "@/types";

const dashBoardMenu: DashBoardType[] = [
  dashBoardPost,
  dashBoardEvent,
  dashBoardSettings,
];

export default dashBoardMenu;
