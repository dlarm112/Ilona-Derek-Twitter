let tweetArea = document.getElementById("tweetInput")
let max = 140
let lengthOfSentence = 0
let container = false
let carryMessage = ''

const countLetter = () => {
    lengthOfSentence = tweetArea.value.length
    let remain = max - lengthOfSentence
    if (lengthOfSentence > 140) {
        document.getElementById("remainingArea").innerHTML = `${remain} left`
        document.getElementById("remainingArea").style.color = 'red'
    } else {
        document.getElementById("remainingArea").innerHTML = `${remain} left`
    }
}

tweetArea.addEventListener("input", countLetter)
tweetArea.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        tweet()
    }
});

let tweetList = []

let tweet = () => {
    let item = {
        text: document.getElementById("tweetInput").value,   
        container: false,
    }

    if(item.text == '') {
        return;
    }

    if(lengthOfSentence > 140) {
        return;
    }

    tweetList.splice(0, 0, item)
    showList(tweetList)
    clearInput()
}

let showList = (list) => {
    let message = list.map((item, index) => {

        if (item.container == false){
            return `<li>${item.text}<a href="#" onclick="retweet(${index})">Retweet</a></li>`
        }
        else if (item.container == true){
            return `<li>${item.text}<a href="#" onclick="retweet(${index})">Retweet</a><br><h3>${item.carryMessage}</h3></li>`
        }/*between h3 tags ^ need to by styled for retweet size*/
    }).join('')

    document.getElementById("tweetArea").innerHTML = message
    console.log("tweet array", tweetList)
}

let clearInput = () => {
    document.getElementById("tweetInput").value = ''
    countLetter()
}

let retweet = (i) => {
    let retweetMessage = {
        text: prompt("what do you want to say?")
    }

    let sendMessage = tweetList[i].text
    retweetMessage.carryMessage = sendMessage
    retweetMessage.container = true

    tweetList.splice(0, 0, retweetMessage)
    
    showList(tweetList)
}



//hiii

