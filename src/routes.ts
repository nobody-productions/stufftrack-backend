import express, { Router } from "express";
import { GetUser, Users } from "./controller/user.controller";

export const routes = (router: Router) => {
    router.get('/api/v1/users', Users)
    router.get("/api/v1/users/:id", GetUser)

}