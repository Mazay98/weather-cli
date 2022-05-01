#!/usr/bin/env node

import {App} from "./services/app.service.js";

const app = new App()
app.init().then(async () => {
    await app.getWeather()
})
