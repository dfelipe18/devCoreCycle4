import * as React from "react";

export function useGetUserAuth() {
    const userCredentials = window.localStorage.getItem('user-auth');
    return JSON.parse(userCredentials);
}