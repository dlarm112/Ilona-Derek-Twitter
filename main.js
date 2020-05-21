let tweetArea = document.getElementById("tweetInput")
let max = 140
let lengthOfSentence = 0
let container = false
let carryMessage = ''
let heart = ''
let percentage = 0
let remain = 140

const countLetter = () => {
    lengthOfSentence = tweetArea.value.length
    remain = max - lengthOfSentence
    percentage = (100 / 140) * lengthOfSentence
    progressBar()
}

tweetArea.addEventListener("input", countLetter)
tweetArea.addEventListener('keypress', function (e) {
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
        likeStatus: false,
    }

    if (item.text == '') {
        return;
    }

    if (lengthOfSentence > 140) {
        return;
    }

    tweetList.splice(0, 0, item)
    showList(tweetList)
    clearInput()
}

let showList = (list) => {
    let message = list.map((item, index) => {
        if (item.likeStatus == true) {
            heart = "(show heart)"
        } else if (item.likeStatus == false) {
            heart = ""
        }
        if (item.container == false) {
            return `<li>${item.text}<a href="#" onclick="retweet(${index})"> Retweet </a><a href="#" id="heartClick" onclick="liked(${index})"> Like ${heart}</a></li>`
        } else if (item.container == true) {
            return `<li>${item.text}<a href="#" onclick="retweet(${index})"> Retweet </a><a href="#" id="heartClick" onclick="liked(${index})"> Like ${heart}</a><br><h3>${item.carryMessage}</h3></li>`
        } /*between h3 tags ^ need to by styled for retweet size*/
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
    retweetMessage.likeStatus = false
    showList(tweetList)
}
let liked = (index) => {
    tweetList[index].likeStatus = !tweetList[index].likeStatus
    showList(tweetList)
}

let progressBar = () => {
    let progressShown
    if (percentage > 100) {
        progressShown = `<div class="progress-bar bg-danger" role="progressbar" style="width: ${percentage}%;" aria-valuenow="25"
    aria-valuemin="0" aria-valuemax="100">${remain} left</div>`
    } else {
        progressShown = `<div class="progress-bar" role="progressbar" style="width: ${percentage}%;" aria-valuenow="25"
    aria-valuemin="0" aria-valuemax="100">${remain} left</div>`
    }
    document.getElementById("progress").innerHTML = progressShown
}



