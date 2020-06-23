toss = ()=>{
    min = 0
    max = 6
    result =Math.random() * (max - min) + min;
    if (result > 3)
    {
        //heads
        return true
    }
    else if(result < 3)
    {
        //tails
        return false
    }
    
    
}

scramble = (userlist)=>{
    no_user = userlist.length
    team1=[]
    team2=[]
    users1 = 0
    users2 = 0
    
    if(no_user % 2 == 0){
        users1 = users2 =  no_user/ 2;
        
    }
    else{
        //randomly selecting channel for uneven players
        user_toss = toss()
        if(user_toss){
            users1 = Math.ceil(no_user/2)
            users2 = no_user - users1
        }
        else{
            users2 = Math.ceil(no_user / 2)
            users1 = no_user - users2
        }
        
        
    }
    userlist.forEach(user => {
        result = toss()
        if (result && team1.length < users1){
            team1.push(user)
        }
        else{
            if(result){
                team2.push(user) 
            }    
        }
        if(!result && team2.length < users2){
            team2.push(user)
        }
        else{
            if(!result){
                team1.push(user)       
            }
        }
    })

    return {'team1':team1,'team2':team2}
    
}











//console.log(scramble([1,2,3,4,5,6]))








module.exports = {toss,scramble}