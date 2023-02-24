import React from "react";

export interface IAuthData {
  userEmail: string;
  userName: string;
  role: string;
}
export interface IAuthContext {
  authData: IAuthData | null;
  setAuthData: React.Dispatch<React.SetStateAction<IAuthData | null>>;
}
