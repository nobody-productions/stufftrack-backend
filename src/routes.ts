import express, { Router } from "express";
import {Login, Register, Logout, Profile} from "./controller/auth.controller";
import {AuthMiddleware} from "./middleware/auth.middleware";

export const routes = (router: Router) => {
    // user routes
    router.post("/api/v1/register", Register)
    router.post("/api/v1/login", Login)
    router.post("/api/v1/logout", Logout)
    router.get("/api/v1/profile", AuthMiddleware, Profile)

}