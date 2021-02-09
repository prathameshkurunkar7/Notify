require('./models/db');
const appConfig = require('./config/appConfig');
const http = require('http');

const PORT = appConfig.PORT;

//catching uncaught exceptions
process.on('uncaughtException',(err)=>{
    console.log("Uncaught Exception! Shutting down server...");
    console.log(err.name,err.message);
    process.exit(1);
})

const app = require('./app');

//server setup
const server = http.createServer(app);
server.listen(PORT, _ =>{
    console.log(`Server running on PORT ${PORT}`)
});

// handling unhandled promises(safety net)
process.on('unhandledRejection',(err)=>{
    console.log("Unhandled Rejection (Some Promise is unresolved)! Shutting down server...");
    console.log(err.name,err.message);
    server.close(()=>{
        process.exit(1);
    })
});

process.on('SIGTERM',()=>{
    console.log("SIGTERM Received. Shutting down server gracefully...");
    server.close(()=>{
        console.log('Process Terminated...');
    })
})