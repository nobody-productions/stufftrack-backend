import express, { Router } from "express";
import { Users } from "./controller/user.controller";

export const routes = (router: Router) => {
    router.get('/api/v1/users', Users)
}