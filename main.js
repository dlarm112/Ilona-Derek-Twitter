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
let parent = null
let parentStatus
let userName = "Obama"
let userNameArea = document.getElementById("userInput")
let newsArea = document.getElementById("searchInput")

const countLetter = () => {
    lengthOfSentence = tweetArea.value.length
    remain = max - lengthOfSentence
    percentage = (100 / 140) * lengthOfSentence
    progressBar()
}
let changeUser = () =>{
    userName = document.getElementById("userInput").value
    document.getElementById("userInput").value = ''
}
newsArea.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        searchByKeyword();
    }
});   
userNameArea.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        changeUser()
    }
});    
tweetArea.addEventListener("input", countLetter)
tweetArea.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        tweet()
    }
});

let tweetList = []

let tweet = () => {
    let hashTag = tweetArea.value.match(/#[^\s#\.\;]*/gmi)
    let str = tweetArea.value
    let newStr = str.replace(/#[^\s#\.\;]*/gmi, `<a href="#">${hashTag}</a>`)

    let item = {
        text: newStr,
        isRetweet: false,
        parent: null,
        likeStatus: false,
        id: num,
        retweetPrompt: '',
        parentStatus: true,
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
            heart = `<i class="fas fa-heart fill-red"></i>`
        } else if (item.likeStatus == false) {
            heart = `<i class="far fa-heart fill-none"></i>`
        }
        if (item.isRetweet == false) {
            return `<li>
            <div class="row justify-content-between">
                <div class="col-2"><img src="img/barack-obama-12782369-1-402.jpg" class="profile-pic" width=50 height=50>
                </div>
                <div class="col-10">
                <p><b>@${userName}</b></p>
                    <p>${item.text}</p>
                </div>
                <div class="row align-items-end">
                <div class="col">
                    <a href="#" onclick="retweet(${item.id})"><i class="fas fa-retweet rt-icon"></i></a>
                </div>
                <div class="col">
                    <a href="#" onclick="retweetMessage(${item.id})"><i class="far fa-comment bubble"></i></a>
                </div>
                <div class="col">
                    <a href="#" id="heartClick" onclick="liked(${index})">${heart}</a>
                </div>
                <div class="col">
                    <a href="#" onclick="trash(${index})"><i class="fas fa-trash"></i></a>
                </div>
                </div>
            </div>
        </li>`
        } else if (item.isRetweet == true) {
            return `<li>
            <div class="row">
                <div class="col-2"><img src="img/barack-obama-12782369-1-402.jpg" class="profile-pic" width=50 height=50>
                </div>
                <div class="col-10">
                <p><b>@${userName}</b></p>
                <p class="retweeted-text"><i class="fas fa-retweet rt-icon"></i> You Retweeted</p><p>${item.retweetPrompt}</p>
                    <p class="retweet-box container">${item.text}</p>
                </div>
                <div class="row align-items-end">
                <div class="col">
                    <a href="#" onclick="retweet(${item.id})"><i class="fas fa-retweet rt-icon"></i></a>
                </div>
                <div class="col">
                    <a href="#" onclick="retweetMessage(${item.id})"><i class="far fa-comment bubble"></i></a>
                </div>
                <div class="col">
                    <a href="#" id="heartClick" onclick="liked(${index})">${heart}</a>
                </div>
                <div class="col">
                    <a href="#" onclick="trash(${index})"><i class="fas fa-trash"></i></a>
                </div>
                </div>
            </div>
        </li>`}
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
        id: num,
        isRetweet: true,
        parent: original.id,
        likeStatus: false,
        retweetPrompt: ''
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
        id: num,
        isRetweet: true,
        parent: original.id,
        likeStatus: false,
        retweetPrompt: prompt("What do you want to say?", '', '')
    }
    if (retweetObj.retweetPrompt == null) {
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

let trash = (i) => {
    tweetList.splice(i, 1)
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

const loadNews = async () => {
    let url = `https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/everything?q=${keyword}&language=en&pagesize=${pageSize}&apiKey=${apiKey}`
    let data = await fetch(url)
    let result = await data.json()
    newsList = result.articles
    render(newsList)
}

const searchByKeyword = () => {
    keyword = document.getElementById("searchInput").value
    loadNews()
    document.getElementById("searchInput").value = ''
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

