let tweetArea = document.getElementById("tweetInput")
let max = 140
let lengthOfSentence = 0
let carryMessage = ''
let heart = ''
let percentage = 0
let remain = 140
let num = 0

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
        isRetweet: false,
        parents: null,
        likeStatus: false,
        id: num,
    }

    if (item.text == '') {
        return;
    }

    if (lengthOfSentence > 140) {
        return;
    }

    tweetList.splice(0, 0, item)
    num++
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
        if (item.isRetweet == false) {
            return `<li>${item.text}<a href="#" onclick="retweet(${item.id})"> Retweet </a><a href="#" id="heartClick" onclick="liked(${index})"> Like ${heart}</a></li>`
        } else if (item.isRetweet == true) {
            return `<li>Retweeted <a href="#" onclick="retweet(${item.id})"> Retweet </a><a href="#" id="heartClick" onclick="liked(${index})"> Like ${heart}</a><br><h3>${item.text}</h3></li>`
        } /*between h3 tags ^ need to by styled for retweet size*/
    }).join('')

    document.getElementById("tweetArea").innerHTML = message
    console.log("tweet array", tweetList)
}

let clearInput = () => {
    document.getElementById("tweetInput").value = ''
    countLetter()
}

const retweet = (id) => {
    let original = tweetList.find(item => item.id == id)

    const retweetObj = {
        text: original.text,
        id:num,
        isRetweet: true,
        parents: original.id
    }

    tweetList.splice(0, 0, retweetObj)
    num++
    isRetweet = false,
    showList(tweetList)
    // let retweetMessage = {
    //     text: prompt("what do you want to say?")
    // }

    // let sendMessage = tweetList[id].text
    // retweetMessage.carryMessage = sendMessage
    // retweetMessage.container = true

    // tweetList.splice(0, 0, retweetMessage)
    // retweetMessage.likeStatus = false
    // showList(tweetList)
}
let liked = (id) => {
    tweetList[id].likeStatus = !tweetList[id].likeStatus
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

// Trending Area
let newsList = []
let keyword = "business"
let pageSize = 10

const apiKey = "6c380f89bed94699b3f75b8d9e88f14e"

const loadNews = async() => {
    let url = `https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/everything?q=${keyword}&language=en&pagesize=${pageSize}&apiKey=${apiKey}`
    let data = await fetch(url)
    let result = await data.json()
    newsList = result.articles
    render(newsList)
}

const searchByKeyword = () => {
    keyword = document.getElementById("searchInput").value
    loadNews()
}

const render = (list) => {
    let newsHtml = list.map(item => `
        <div id="news">
            <div id="contentsArea">
                <div id="source"><a href="${item.url}">${item.source.name}</a></div>
                <div id="title">${item.title}</div>
            </div>
            <div id="imgArea">
                <img src="${item.urlToImage}" width="90" height="90" />
            </div>
        </div>
    `).join('')

    document.getElementById("newsArea").innerHTML = newsHtml
}

loadNews()

