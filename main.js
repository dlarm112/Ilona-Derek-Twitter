let tweetArea = document.getElementById("tweetArea")
let max = 140
const countLetter = () => {
    let lengthOfSentence = tweetArea.value.length
    let remain = max - lengthOfSentence
    if (remain < 0) {
        document.getElementById("remainingArea").innerHTML = `${remain} left`
        document.getElementById("remainingArea").style.color = 'red'
    } else {
        document.getElementById("remainingArea").innerHTML = `${remain} left`
    }
}

tweetArea.addEventListener("input", countLetter)