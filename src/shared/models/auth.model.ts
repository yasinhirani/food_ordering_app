import React from "react";
import { IBase } from "../../core/models/core.model";

export interface IAuthData {
  userEmail: string;
  userName: string;
  role: string;
  access_token: string;
}
export interface IAuthContext {
  authData: IAuthData | null;
  setAuthData: React.Dispatch<React.SetStateAction<IAuthData | null>>;
}

export interface ILoadingContext {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ILoginRes
  extends IBase<{ success: boolean; message: string; authData: IAuthData }> {}

export interface IRegisterRes
  extends IBase<{ success: boolean; message: string }> {}
