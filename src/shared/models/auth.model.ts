import React from "react";
import { IBase } from "../../core/models/core.model";

export interface IAuthData {
  userEmail: string;
  userName: string;
  role: string;
}
export interface IAuthContext {
  authData: IAuthData | null;
  setAuthData: React.Dispatch<React.SetStateAction<IAuthData | null>>;
}

export interface ILoginRes
  extends IBase<{ success: boolean; message: string, authData: IAuthData }> {}

export interface IRegisterRes
  extends IBase<{ success: boolean; message: string }> {}
