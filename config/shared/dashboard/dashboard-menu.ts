import {
  dashBoardEvent,
  dashBoardMember,
  dashBoardPost,
  dashBoardSettings,
} from "@/config/shared/dashboard";
import { DashBoardType } from "@/types";

const dashBoardMenu: DashBoardType[] = [
  dashBoardMember,
  dashBoardPost,
  dashBoardEvent,
  dashBoardSettings,
];

export default dashBoardMenu;
