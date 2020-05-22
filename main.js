let tweetArea = document.getElementById("tweetInput")
let max = 140
let lengthOfSentence = 0
let carryMessage = ''
let heart = ''
let percentage = 0
let remain = 140
let num = 0
let retweetPrompt = ''
let promptPop

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
        retweetPrompt:'',
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

// Upload image through URL 
let imgUrl = document.getElementById("tweetInput")

let showList = (list) => {
    let message = list.map((item, index) => {
        if (item.likeStatus == true) {
            heart = `<i class="material-icons fill-red">favorite</i>`
        } else if (item.likeStatus == false) {
            heart = `<i class="material-icons fill-none">favorite_border</i>`
        }
        if (item.isRetweet == false) {
            return `<li><h3>${item.text}</h3><a href="#" onclick="retweet(${item.id})"><i class="material-icons rt-icon">repeat</i></a><a href="#" onclick="retweetMessage(${item.id})"><i class="material-icons bubble">chat_bubble_outline</i></a><a href="#" id="heartClick" onclick="liked(${index})">${heart}</a></li>`
        } else if (item.isRetweet == true) {
            return `<li><h3>${item.retweetPrompt}</h3><br><h5>${item.text}</h5><br><a href="#" onclick="retweet(${item.id})"><i class="material-icons rt-icon">repeat</i></a><a href="#" onclick="retweetMessage(${item.id})"><i class="material-icons bubble">chat_bubble_outline</i></a><a href="#" id="heartClick" onclick="liked(${index})">${heart}</a></li>`
        }
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
    retweetPrompt = "Retweeted"
    const retweetObj = {
        text: original.text,
        id:num,
        isRetweet: true,
        parents: original.id,
        likeStatus: false,
        retweetPrompt: 'Retweeted'
    }
    tweetList.splice(0, 0, retweetObj)
    num++
    isRetweet = false,
    showList(tweetList)
}
const retweetMessage = (id) => {
    let original = tweetList.find(item => item.id == id)
    const retweetObj = {
        text: original.text,
        id:num,
        isRetweet: true,
        parents: original.id,
        likeStatus: false,
        retweetPrompt: prompt("What do you want to say?", '','')
    }
    if (retweetObj.retweetPrompt == ''){
        retweetObj.retweetPrompt = 'Retweeted'
    }
    tweetList.splice(0, 0, retweetObj)
    num++
    isRetweet = false,
    showList(tweetList)
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

document.body.addEventListener("keyup", function(event) {
    if(event.keyCode == 13) {
        searchBtn.click()
    }
})

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
                <img class="news-img" src="${item.urlToImage}" width="90" height="90" />
            </div>
        </div>
    `).join('')

    document.getElementById("newsArea").innerHTML = newsHtml
}

loadNews()

