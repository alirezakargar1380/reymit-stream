import fs from "fs"
import path from "path" 

export const forgetPassEmaiTemplate = fs.readFileSync(path.join(__dirname, "./../../../template/Forget Password - MyCamp.html"), {
    encoding: "utf-8"
})

export const welcomeEmaiTemplate = fs.readFileSync(path.join(__dirname, "./../../../template/Welcome- MyCamp.html"), {
    encoding: "utf-8"
})