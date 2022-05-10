import express, { Router } from "express";
import { CreateUser, GetUser, Users } from "./controller/user.controller";

export const routes = (router: Router) => {
    // user routes
    router.get('/api/v1/users', Users)
    router.get("/api/v1/users/:id", GetUser)
    router.post('/api/v1/users', CreateUser)

}