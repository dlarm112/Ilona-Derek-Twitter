let tweetArea = document.getElementById("tweetInput")
let max = 140
let lengthOfSentence = 0

const countLetter = () => {
    lengthOfSentence = tweetArea.value.length
    let remain = max - lengthOfSentence
    if (remain < 0) {
        document.getElementById("remainingArea").innerHTML = `${remain} left`
        document.getElementById("remainingArea").style.color = 'red'
    } else {
        document.getElementById("remainingArea").innerHTML = `${remain} left`
    }
}

tweetArea.addEventListener("input", countLetter)

let tweetList = []

let tweet = () => {
    let item = {
        text: document.getElementById("tweetInput").value   
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
        return `<li>${item.text}<a href="#" onclick="retweeet()">Retweet</a></li>`
    }).join('')

    document.getElementById("tweetArea").innerHTML = message
}

let clearInput = () => {
    document.getElementById("tweetInput").value = ''
    countLetter()
}

let retweet = (i) => {
    let retweetMessage = {
        text: prompt("what do you want to say?")
    }
    console.log("retweet index", i)
    tweetList.splice(0, 0, tweetList[i])
    tweetList.splice(0, 0, retweetMessage)
    showList(tweetList)
}
