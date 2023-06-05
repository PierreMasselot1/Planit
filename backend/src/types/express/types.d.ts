import { User as SharedUser } from "@shared/types/user_types";

declare global {
  namespace Express {
    export interface Request {
      user?: SharedUser;
    }
  }
}
