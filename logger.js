const logger=(req,res,next)=>{
    const stdin=process.stdin.connecting
    const stdout=process.stdout.connecting
    const stderr=process.stderr.connecting

    const {method,url}=req
    const {settings}=req.app
    const {cookie}=req.headers
    const userAgent=req.headers["user-agent"]
    const startTime =Date.now()
    const localTime =new Date().toLocaleString()
    const isoTime=new Date().toISOString()
    const utcTime=new Date().toUTCString()

    let responseTime=null

    res.on("finish",()=>{
        const endTime =Date.now()
        const responseContentType=res.getHeaders()["content-type"]
        const responseContentLength=res.getHeaders()["content-length"]
        const statusCode=res.statusCode

        const responseCookies=res.getHeaders()["set-cookie"]
        responseTime=endTime-startTime

        console.table([
            {
                stdin:stdin,
                stdout:stdout,
                stderr:stderr
            }

        ])
        console.table([
            {
                method:method,
                url:url,
                enviroment:settings.env,
                isoTime:isoTime,
                utcTime:utcTime,
                localTime:localTime,
            }
        ])

        console.table([
            {
                responseContentType:responseContentType,
                responseContentLength:responseContentLength,
                responseTime:responseTime,
                statusCode:statusCode
            }
        ])

        console.table([
            {
                userAgent:userAgent,
            }
        ])

        console.table([
            {
                requestCookies:cookie,
                responseCookies:responseCookies,
            }
        ])
    })

    next()
}

module.exports=logger