const express=require("express")
const server=express()
const helmet =require("helmet")
const morgan =require("morgan")
const logger=require("./logger")
const axios =require("axios").default
const cookieParser=require("cookie-parser")

server.set("etag",false)
server.use(helmet())
server.use(logger)

morgan.token("custom", ":http-version (:method) :url => :status")
server.use(morgan("custom"))

server.get("/",morgan("tiny"),(req,res)=>{
    res.send("main-home-page")
})
server.get("/first",logger,(req,res)=>{
    res.send("first-home-page")
})
server.get("/second",(req,res)=>{

    res.send("second-home-page")
    res.on("finish",()=>{
        console.log("finished")
    })
})

server.get("/photos",async(req,res)=>{
    res.cookie("responsePhotos","photosCookie",{path:"/",maxAge:10*1000,httpOnly:true,secure:true,sameSite:"lax",priority:"low"})
    const response=await axios.get("https://jsonplaceholder.typicode.com/photos")
    const data =response.data
    res.json(data)
})

server.listen(3000,()=>{console.log("*******************")})