/**
 * Alert Funtion
 */
const alertFuntion = (ms, alertType='danger')=>{
    return `<p class="alert alert-${alertType}">${ms}</p>`;
}


/**
 * Set Ls Data
 */
const SetLsData = (key, val)=>{

    let dataLsReceive = [];

    // Check Exist Data 
    if(localStorage.getItem(key)){
        dataLsReceive = JSON.parse(localStorage.getItem(key))
    }

    // Now Set Data 
    dataLsReceive.push(val);
    localStorage.setItem(key, JSON.stringify(dataLsReceive))

}

/**
 * Get Ls Data
 */
const getLsData = (key)=>{
    
    // check Ls Data 
    if(localStorage.getItem(key)){
        return JSON.parse(localStorage.getItem(key));
    }else{
        return false;
    }
}

/**
 * Update Ls Data
 */
const updateLsData = (key, val)=>{
    localStorage.setItem(key, JSON.stringify(val))
}