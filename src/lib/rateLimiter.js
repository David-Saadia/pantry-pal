const requestCounts=new Map();

export function checkRateLimit(userId,maxRequests=100,interval=60*1000){
    const now=Date.now();
    const userKey=userId;

    if (!requestCounts.has(userKey)){
        requestCounts.set(userKey,{count:0,resetTime:now+interval})
    }

    const userData=requestCounts.get(userKey);

    if (now>userData.resetTime) {
        userData.count = 0;
        userData.resetTime = now + interval;
    }

    if (userData.count >= maxRequests){
        return {allowed:false,retryAfter:userData.resetTime-now}
    }

    userData.count++;
    return {allowed:true}
}