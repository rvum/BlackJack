var cardWord;//牌代表的数值 花色var colors;
var sureYourDeal = document.getElementById("sureYourDeal");//确定所放置筹码按钮
//显示牌数之和
var dealerAdd = document.getElementById("dealerAdd");
var userAdd = document.getElementById("userAdd");
//暗牌
var dealerSecondCard = document.getElementById("dealerSecondCard");
var alerts = document.getElementById("alerts");//放置提醒的容器
var bets = document.getElementById("bets");//所有的筹码类型
var allPlaceBetsNumb = 0;//本轮游戏所有放置的筹码总和
var hit = document.getElementById("hit");//叫牌
var stand = document.getElementById("stand");//停牌
var double = document.getElementById("double");//加倍
var spilt = document.getElementById("spilt");//分牌
var surrender = document.getElementById("surrender");//投降
var allBets = document.getElementById("allBets");//放置筹码总和容器
var allBetsNum = parseInt(allBets.innerHTML.match(/\s([0-9]+)/));//筹码总和
var placeBets = document.getElementById("placeBets");//放置所有筹码(闲家所押的筹码)的容器
var userSum;//闲家牌面数字之和
var dealerSum;//庄家牌面数字之和
var deal = [];//用来存储已经发过的牌
var hasDeald = 0;//已经发过的张数
var insuranced = 0;//是否购买保险

sureYourDeal.addEventListener('click', sureYourDealClick);
function sureYourDealClick() {
    dealerAdd.style.display = "block";
    userAdd.style.display = "block";
    dealerSecondCard.style.display = "block";
    bets.style.display = "none";
    sureYourDeal.style.display = "none";
    for (var j = 0; j < 4; j++) {
        dealCards();
    }
    displayTheStartTwoCards();
    displayUserCardsSum();
    displayDealerCardsSum();
    allPlacebetsSum();//计算所有放置的筹码总和
    //监听相应事件并隐藏相应按钮
    hit.addEventListener('click', hitClick);//移除hit按钮监听事件
    hit.className = "button";//将hit按钮隐藏
    stand.addEventListener('click', standClick);
    stand.className = "button";
    double.addEventListener('click', doubleClick);
    double.className = "button";
    spilt.removeEventListener('click', spiltClick);
    spilt.className = "button  opacity";
    surrender.addEventListener('click', surrenderClick);
    surrender.className = "button";

    //是否能加倍
    var slash = userSum.toString().indexOf('/');
    var theSecondWord = parseInt(userSum.toString().slice(slash + 1));
    if (slash && theSecondWord == 21) {
        double.removeEventListener('click', doubleClick);
        double.className = "button opacity";
    }
    if (slash == -1 && userSum == 21) {
        double.removeEventListener('click', doubleClick);
        double.className = "button opacity";
    }
    //是否能投降
    if (exchange(deal[hasDeald - 3]) == 'A') {
        surrender.removeEventListener('click', surrenderClick);
        surrender.className = "button opacity";
    }
    //是否提醒买保险
    if (exchange(deal[hasDeald - 3]) == 'A') {
        insuranceClick();
    }
    //是否能分牌
    if (exchange(deal[hasDeald - 4]) == exchange(deal[hasDeald - 2])) {
        spilt.addEventListener('click', spiltClick);
        spilt.className = "button";
    }
}


var A;
var cardsNum = 52;//牌总数
var remainCards = cardsNum; //剩余的牌数
//hearts, clubs, diamonds and spades
//红桃、梅花、方块和黑桃

//开局未放筹码前移除相应事件并隐藏相应按钮
hit.removeEventListener('click', hitClick);//移除hit按钮监听事件
hit.className = "button  opacity";//将hit按钮隐藏
stand.removeEventListener('click', standClick);
stand.className = "button  opacity";
double.removeEventListener('click', doubleClick);
double.className = "button  opacity";
spilt.removeEventListener('click', spiltClick);
spilt.className = "button  opacity";
surrender.removeEventListener('click', surrenderClick);
surrender.className = "button  opacity";

/*-------------------分割线-------------------------------------------------------------*/
//加倍
double.addEventListener('click', doubleClick);
function doubleClick() {
    allBetsNum -= allPlaceBetsNumb;
    allPlaceBetsNumb *= 2;
    allBets.innerHTML = "$ " + allBetsNum;
    placeBets.innerHTML = placeBets.innerHTML + "<div id=\"doubleBets\">" + placeBets.innerHTML + "</div>";
    double.removeEventListener('click', doubleClick);
    double.className = "button  opacity";
    hitClick();
    standClick();
}
/*-------------------分割线-------------------------------------------------------------*/
//买保险
function insuranceClick() {
    hit.removeEventListener('click', hitClick);//移除hit按钮监听事件
    hit.className = "button  opacity";//将hit按钮隐藏
    stand.removeEventListener('click', standClick);
    stand.className = "button  opacity";
    double.removeEventListener('click', doubleClick);
    double.className = "button  opacity";
    spilt.removeEventListener('click', spiltClick);
    spilt.className = "button  opacity";
    surrender.removeEventListener('click', surrenderClick);
    surrender.className = "button  opacity";

    var alertA = document.createElement("a");
    alertA.id = "alert";
    alertA.setAttribute("href", "#");
    alertA.innerHTML = "INSURANCE?";
    alerts.appendChild(alertA);
    var insurance = document.getElementById("insurance");
    var dealHidden = document.getElementById("deal");
    insurance.style.display = "block";
    dealHidden.style.display = "none";

    var insuranceYes = document.getElementById("insuranceYes");
    var insuranceNo = document.getElementById("insuranceNo");
    insuranceYes.addEventListener('click', insuranceYesClick);
    insuranceNo.addEventListener('click', insuranceNoClick);
    function insuranceYesClick() {
        hit.addEventListener('click', hitClick);//移除hit按钮监听事件
        hit.className = "button";//将hit按钮隐藏
        stand.addEventListener('click', standClick);
        stand.className = "button";
        double.addEventListener('click', doubleClick);
        double.className = "button";
        spilt.addEventListener('click', spiltClick);
        spilt.className = "button  opacity";

        alerts.innerHTML = "";
        allBetsNum -= allPlaceBetsNumb / 2;
        allBets.innerHTML = "$ " + allBetsNum;
        insuranced = 1;
        dealHidden.style.display = "block";
        insurance.style.display = "none";

    }

    function insuranceNoClick() {
        hit.addEventListener('click', hitClick);//移除hit按钮监听事件
        hit.className = "button";//将hit按钮隐藏
        stand.addEventListener('click', standClick);
        stand.className = "button";
        double.addEventListener('click', doubleClick);
        double.className = "button";
        spilt.addEventListener('click', spiltClick);
        spilt.className = "button  opacity";

        alerts.innerHTML = "";
        dealHidden.style.display = "block";
        insurance.style.display = "none";
    }
}
/*-------------------分割线-------------------------------------------------------------*/
//投降
surrender.addEventListener('click', surrenderClick);
function surrenderClick() {
    allBetsNum += allPlaceBetsNumb / 2;
    allPlaceBetsNumb /= 2;
    allBets.innerHTML = "$ " + allBetsNum;
    placeBets.innerHTML = "";
    surrender.addEventListener('click', surrenderClick);
    initTheGame();
}
/*-------------------分割线-------------------------------------------------------------*/
//分牌
var spilted = 0;//分牌标记
var spiltArray=[];
spilt.addEventListener('click', spiltClick);
function spiltClick() {
    spilted = 1;
    //exchange(deal[hasDeald-4])==exchange(deal[hasDeald-2])
    spiltArray.push=deal[hasDeald-2];
    spiltArray.push=deal[hasDeald-3];
    spiltArray.push=deal[hasDeald-1];
    dealCards();//先发张牌
    deal.splice(hasDeald - 3, 1, deal[hasDeald - 1]);
    deal.pop();
    hasDeald--;
    displayTheStartTwoCards();
    allBetsNum -= allPlaceBetsNumb;
    allBets.innerHTML = "$ " + allBetsNum;

}
/*-------------------分割线-------------------------------------------------------------*/
//洗牌并分牌
var cardStat = {};//cardStat为0代表本张牌未被发出去,非0代表本张牌已经被发出去
for (var i = 0; i < cardsNum; i++) {
    cardStat[i] = 0;
}
function dealCards() {
    var card = Math.floor(Math.random() * remainCards);//随机数生成接下来要发的一张牌
    hasDeald++;

    var m = 0;
    var n = 0;
    while (m < cardsNum) {
        m++;
        if (cardStat[m - 1] === 0) {
            n++;
        }
        if (n - 1 === card) {
            cardStat[m - 1] = hasDeald;
            break;
        }
    }

    deal.push(m);
    remainCards--;
}

/*-------------------分割线-------------------------------------------------------------*/
//显示初始的两张牌
//displayTheStartTwoCards();
var dealerFirstCard = document.getElementById("dealerFirstCard");
//var dealerSecondCard = document.getElementById("dealerSecondCard");
var userFirstCard = document.getElementById("userFirstCard");
var userSecondCard = document.getElementById("userSecondCard");
var saveDealerSecondCard;//保存庄家第二张牌
function displayTheStartTwoCards() {
    dealerFirstCard.innerHTML = "<img src='" + "./playingCards/" + deal[hasDeald - 3] + ".png'>";
//dealerSecondCard.innerHTML="<img src='" + "./playingCards/" + deal[3] + ".png'>";
    saveDealerSecondCard = deal[hasDeald - 1];//保存庄家第二张牌
    dealerSecondCard.innerHTML = "<img src='./img/Back.png'>";
    userFirstCard.innerHTML = "<img src='" + "./playingCards/" + deal[hasDeald - 4] + ".png'>";
    userSecondCard.innerHTML = "<img src='" + "./playingCards/" + deal[hasDeald - 2] + ".png'>";
}


/*-------------------分割线-------------------------------------------------------------*/

function exchange(numb) {//将牌转换成对应的牌面(A,2-10)
    var number = parseInt(numb);
    var complement = number % 13;

    if (complement === 1) {
        cardWord = "A";
    } else if (complement >= 10 || complement == 0) {
        cardWord = 10;
    } else {
        cardWord = complement;
    }
    return cardWord;
}

//i=0;
var userHasA, dealerHasA;//标志,代表牌中有几个A,方便判断统计牌数之和时是否显示'/'这个字符
//显示闲家牌面数字之和
//var userSum;
//displayUserCardsSum();
function displayUserCardsSum() {
    if (exchange(deal[hasDeald - 4]) == 'A' && exchange(deal[hasDeald - 2]) == 'A') {
        userSum = 2 + '/' + 12;
        userHasA = 2;
    } else if (exchange(deal[hasDeald - 4]) == 'A') {
        userSum = parseInt(1 + exchange(deal[hasDeald - 2])) + '/' + parseInt(11 + exchange(deal[hasDeald - 2]));
        userHasA = 1;
    } else if (exchange(deal[hasDeald - 2]) == 'A') {
        userSum = parseInt(1 + exchange(deal[hasDeald - 4])) + '/' + parseInt(11 + exchange(deal[hasDeald - 4]));
        userHasA = 1;
    } else {
        userSum = exchange(deal[hasDeald - 4]) + exchange(deal[hasDeald - 2]);
        userHasA = 0;
    }

    userAdd.innerHTML = userSum;
}
//显示庄家的明牌数字
//var dealerSum;
//displayDealerCardsSum();
function displayDealerCardsSum() {
    if (exchange(deal[hasDeald - 3]) == 'A') {
        dealerSum = 1 + '/' + 11;
        dealerHasA = 1;
    } else {
        dealerSum = exchange(deal[hasDeald - 3]);
        dealerHasA = 0;
    }

    dealerAdd.innerHTML = dealerSum;
}


/*-------------------分割线----------------------*/
//用户叫牌
var userBust = 0;//闲家是否爆牌
/*var hit = document.getElementById("hit");
 var double = document.getElementById("double");
 var spilt = document.getElementById("spilt");
 var surrender = document.getElementById("surrender");*/
hit.addEventListener('click', hitClick);
function hitClick() {
    //移除相应事件并隐藏相应按钮
    double.removeEventListener('click', doubleClick);
    double.className = "button opacity";
    //spilt.removeEventListener('click', spiltClick);
    spilt.className = "button opacity";
    surrender.removeEventListener('click', surrenderClick);
    surrender.className = "button opacity";

    dealCards();
    var addDealDiv = document.createElement("div");
    //addDealDiv.id = "addDealDiv" + (hasDeald);
    addDealDiv.className = "float";
    var addImg = document.createElement("img");
    addImg.src = "./playingCards/" + deal[hasDeald - 1] + ".png";
    addDealDiv.appendChild(addImg);
    userAdd.parentNode.insertBefore(addDealDiv, userAdd);

    //接下来更新闲家的牌面之和看是否到达21点,并显示牌数之和
    var thisDealdWord = exchange(deal[hasDeald - 1]);

    var slash = userSum.toString().indexOf('/');//看斜杠是否存在
    if (slash !== -1) { //表明此次之前的牌里最少有一个A
        var theFirstWord, theSecondWord;//有A时,分别代表前一个数字(A当1),后一个数字(A当11)
        theFirstWord = parseInt(userSum.slice(0, slash));
        theSecondWord = parseInt(userSum.slice(slash + 1));
        if (thisDealdWord == 'A' && theFirstWord >= 11) {
            userSum = theFirstWord + 1;
        } else if (thisDealdWord == 'A' && theFirstWord <= 10) {
            userSum = parseInt(theFirstWord + 1) + '/' + parseInt(theFirstWord + 11);
        } else if (thisDealdWord !== 'A' && (thisDealdWord + theSecondWord) <= 21) {
            userSum = parseInt(thisDealdWord + theFirstWord) + '/' + parseInt(thisDealdWord + theSecondWord);
        } else if (thisDealdWord !== 'A' && (thisDealdWord + theSecondWord) > 21) {
            userSum = parseInt(thisDealdWord + theFirstWord);
        }
    } else {
        if (thisDealdWord == 'A' && userSum >= 21) {
            userSum = 'bust';
            userBust = 1;
            whoWin();
        } else if (thisDealdWord == 'A' && userSum >= 11 && userSum <= 20) {
            userSum += 1;
        } else if (thisDealdWord == 'A' && userSum <= 10) {
            userSum = parseInt(1 + userSum) + '/' + parseInt(11 + userSum);
        } else if (thisDealdWord !== 'A' && (thisDealdWord + userSum) > 21) {
            userSum = 'bust';
            userBust = 1;
            whoWin();
        } else if (thisDealdWord !== 'A' && (thisDealdWord + userSum) <= 21) {
            userSum += thisDealdWord;
        }
    }
    userAdd.innerHTML = userSum;
}
/*-------------------分割线-------------------------------------------------------------*/
//下一轮游戏初始化
var fiv, twf, fit, onh, fih;//分别记录各种类型筹码个数
fiv = twf = fit = onh = fih = 0;

function initTheGame() {
    if (spilted == 0) {
        userBust = 0;
        dealerBust = 0;
        dealerAdd.style.display = "none";
        userAdd.style.display = "none";
        dealerSecondCard.style.display = "none";
        bets.style.display = "block";
        sureYourDeal.style.display = "block";
        dealerFirstCard.innerHTML = "";
        dealerSecondCard.innerHTML = "";
        userFirstCard.innerHTML = "";
        userSecondCard.innerHTML = "";
        var floats = document.getElementsByClassName("float");
        for (var m = 0; m < floats.length;) {
            floats[m].parentNode.removeChild(floats[m]);
        }

        allPlaceBetsNumb = 0;
        fiv = twf = fit = onh = fih = 0;

        //移除相应事件并隐藏相应按钮
        hit.removeEventListener('click', hitClick);//移除hit按钮监听事件
        hit.className = "button  opacity";//将hit按钮隐藏
        stand.removeEventListener('click', standClick);
        stand.className = "button  opacity";
        double.removeEventListener('click', doubleClick);
        double.className = "button  opacity";
        spilt.removeEventListener('click', spiltClick);
        spilt.className = "button  opacity";
        surrender.removeEventListener('click', surrenderClick);
        surrender.className = "button  opacity";
        shuffle();//剩余牌小于一半,开始洗牌
    }else {//如果分牌则进行如下初始化
        dealCards();
        deal[hasDeald-4]=spiltArray[0];
        deal[hasDeald-3]=spiltArray[1];
        deal[hasDeald-2]=deal[hasDeald-1];
        deal[hasDeald-1]=spiltArray[2];
        displayDealerCardsSum();

    }
}
/*-------------------分割线-------------------------------------------------------------*/
//庄家叫牌
//先计算前两张牌牌面之和
var dealerBust = 0;//庄家是否爆牌
//var stand = document.getElementById("stand");
stand.addEventListener('click', standClick);

function standClick() {

    //显示暗牌
    dealerSecondCard.innerHTML = "<img src='" + "./playingCards/" + deal[hasDeald - 1] + ".png'>";
    //对保险输赢进行判断////////////////////////////
    if (insuranced == 1 && exchange(deal[hasDeald - 3]) == 10) {
        allBetsNum += allPlaceBetsNumb * 3 / 2;
        allBets.innerHTML = "$ " + allBetsNum;
    }


    //计算前两张牌牌面之和
    if (exchange(deal[hasDeald - 3]) == 'A' && exchange(deal[hasDeald - 1]) == 'A') {
        dealerSum = '2/12';
    } else if (exchange(deal[hasDeald - 3]) == 'A') {
        dealerSum = parseInt(1 + exchange(deal[hasDeald - 1])) + '/' + parseInt(11 + exchange(deal[hasDeald - 1]));
    } else if (exchange(deal[hasDeald - 1]) == 'A') {
        dealerSum = parseInt(1 + exchange(deal[hasDeald - 3])) + '/' + parseInt(11 + exchange(deal[hasDeald - 3]));
    } else {
        dealerSum = exchange(deal[hasDeald - 3]) + exchange(deal[hasDeald - 1]);
    }
    //然后看是否小于等于16点
    var dealerSlash = dealerSum.toString().indexOf('/');

    if (dealerSlash !== -1) {
        var theFirstWord, theSecondWord;//有A时,分别代表前一个数字(A当1),后一个数字(A当11)
        theFirstWord = parseInt(dealerSum.slice(0, dealerSlash));
        theSecondWord = parseInt(dealerSum.slice(dealerSlash + 1));

        while (theSecondWord <= 16) {
            dealerhitOneCard();//庄家要牌
            var thisDealdWord = exchange(deal[hasDeald - 1]);
            if (thisDealdWord == 'A' && theSecondWord == 16) {
                dealerSum = 17;
                break;
            } else if (thisDealdWord == 'A' && theSecondWord < 16) {
                dealerSum += 1;
                theSecondWord += 1;
            } else if (thisDealdWord !== 'A' && (theSecondWord + thisDealdWord) > 21) {
                theFirstWord += thisDealdWord;
                dealerSum = theFirstWord;
                theFirstWordLessThan16(theFirstWord);
                break;
            } else if (thisDealdWord !== 'A' && (theSecondWord + thisDealdWord) >= 17) {
                dealerSum = theSecondWord + thisDealdWord;
                break;
            } else if (thisDealdWord !== 'A' && (theSecondWord + thisDealdWord) <= 16) {
                theSecondWord += thisDealdWord;
                theFirstWord += thisDealdWord;
            }
        }
        //当前两张有A,且本次有A,加11爆掉,则判断使本次+1的牌面之和大于等于17
        function theFirstWordLessThan16(theFirstWord) {
            while (theFirstWord <= 16) {
                dealerhitOneCard();//庄家要牌
                thisDealdWord = exchange(deal[hasDeald - 1]);

                if (thisDealdWord == 'A' && theFirstWord == 16) {
                    theFirstWord += 1;
                    dealerSum = 17;
                    break;
                } else if (thisDealdWord == 'A') {
                    dealerSum += 1;
                    theFirstWord += 1;
                } else if (thisDealdWord !== 'A' && (theFirstWord + thisDealdWord) > 21) {
                    dealerSum = 'bust';
                    dealerBust = 1;
                    break;
                } else if (thisDealdWord !== 'A' && (theFirstWord + thisDealdWord) >= 17) {
                    dealerSum += theFirstWord;
                    break;
                } else if (thisDealdWord !== 'A' && (theFirstWord + thisDealdWord) <= 16) {
                    theFirstWord += thisDealdWord;
                    dealerSum += thisDealdWord
                }
            }
        }
    } else {
        while (dealerSum <= 16) {
            dealerhitOneCard();//庄家要牌
            thisDealdWord = exchange(deal[hasDeald - 1]);
            if (thisDealdWord == 'A' && dealerSum == 16) {
                dealerSum += 1;
                break;
            } else if (thisDealdWord == 'A' && dealerSum > 10) {
                dealerSum += 1;
            } else if (thisDealdWord == 'A' && dealerSum <= 10 && dealerSum >= 6) {
                dealerSum += 11;
                break;
            } else if (thisDealdWord == 'A' && dealerSum <= 10) {
                dealerSum += 11;

            } else if (thisDealdWord !== 'A' && (dealerSum + thisDealdWord) > 21) {
                dealerBust = 1;
                dealerSum = 'bust';
                break;
            } else if (thisDealdWord !== 'A' && (dealerSum + thisDealdWord) >= 17) {
                dealerSum += thisDealdWord;
                break;
            } else if (thisDealdWord !== 'A' && (dealerSum + thisDealdWord) < 17) {
                dealerSum += thisDealdWord;
            }
        }
    }
    dealerAdd.innerHTML = dealerSum;

    function dealerhitOneCard() {
        dealCards();
        var addDealDiv = document.createElement("div");
        //addDealDiv.id = "addDealerDealDiv" + (hasDeald - 4);
        addDealDiv.className = "float";
        var addImg = document.createElement("img");
        addImg.src = "./playingCards/" + deal[hasDeald - 1] + ".png";
        addDealDiv.appendChild(addImg);
        dealerAdd.parentNode.insertBefore(addDealDiv, dealerAdd);
    }

    //移除相应事件并隐藏相应按钮
    hit.removeEventListener('click', hitClick);//移除hit按钮监听事件
    hit.className = "button opacity";//将hit按钮隐藏
    stand.removeEventListener('click', standClick);
    stand.className = "button opacity";
    double.removeEventListener('click', doubleClick);
    double.className = "button opacity";
    //spilt.removeEventListener('click', spiltClick);
    spilt.className = "button opacity";
    surrender.removeEventListener('click', surrenderClick);
    surrender.className = "button opacity";

    setTimeout(function () {
        whoWin();
    }, 1000);
    //whoWin();//将输赢显示在alert提醒里

    setTimeout(function () {
        //移除筹码
        placeBets.innerHTML = "";
    }, 2000);

}

/*-------------------分割线-------------------------------------------------------------*/
//判输赢

//var placeBets = document.getElementById("placeBets");//放置所有筹码(闲家所押的筹码)的容器
var placeBets2 = document.getElementById("placeBets2");//放置赢得的筹码
var placeBets3 = document.getElementById("placeBets3");
//var allBets = document.getElementById("allBets");//放置筹码总和容器
//var allBetsNum = parseInt(allBets.innerHTML.match(/\s([0-9]+)/));//筹码总和

function whoWin() {
    var userSlash = userSum.toString().indexOf('/');
    var dealerSlash = dealerSum.toString().indexOf('/');
    if (userSlash !== -1) {
        var theUserSecondWord = userSum.slice(parseInt(userSlash + 1));
    }
    if (dealerSlash !== -1) {
        var theDealerSecondWord = dealerSum.slice(parseInt(dealerSlash + 1));
    }
    var alertA = document.createElement("a");
    alertA.id = "alert";
    alertA.setAttribute("href", "#");

    var power = 1;//倍率

    if (userBust) {
        alertA.innerHTML = "USER BUST!";
        power = 0;
        //移除相应事件并隐藏相应按钮
        hit.removeEventListener('click', hitClick);//移除hit按钮监听事件
        hit.className = "button opacity";//将hit按钮隐藏
        stand.removeEventListener('click', standClick);
        stand.className = "button opacity";
        double.removeEventListener('click', doubleClick);
        double.className = "button opacity";
        spilt.removeEventListener('click', spiltClick);
        spilt.className = "button opacity";
        surrender.removeEventListener('click', surrenderClick);
        surrender.className = "button opacity";
        //动画:移动筹码
        i = 0;
        var movebets1 = setInterval(function () {
            i++;
            placeBets.style.top = 60 - 10 * i + "%";
            if (i > 6) {
                placeBets.innerHTML = "";
                clearInterval(movebets1);
                placeBets.style.top = "60%";
            }
        }, 300);

        //看是否有保险,对保险金进行处理
        if (insuranced == 1 && exchange(saveDealerSecondCard) == 10) {
            dealerSecondCard.innerHTML = "<img src='" + "./playingCards/" + saveDealerSecondCard + ".png'>";
            allBetsNum += allPlaceBetsNumb * 3 / 2;
            allBets.innerHTML = "$ " + allBetsNum;
        } else if (insuranced == 1) {
            dealerSecondCard.innerHTML = "<img src='" + "./playingCards/" + saveDealerSecondCard + ".png'>";
        }


    } else if (userBust == 0 && dealerBust == 1 && userSlash !== -1 && theUserSecondWord !== 21) {
        alertA.innerHTML = "DEALER BUST!";
        power = 2;

        //动画:移动筹码
        i = 0;
        placeBets2.innerHTML = placeBets.innerHTML;
        var movebets2 = setInterval(function () {
            i++;
            placeBets.style.top = 60 + 10 * i + "%";
            placeBets2.style.top = 60 + 10 * i + "%";
            if (i > 6) {
                clearInterval(movebets2);
                placeBets.innerHTML = "";
                placeBets2.innerHTML = "";
                placeBets.style.top = "60%";
                placeBets2.style.top = "60%";
            }
        }, 300);
    } else if (userBust == 0 && dealerBust == 1 && userSlash == -1 && userSum !== 21) {
        alertA.innerHTML = "DEALER BUST!";
        power = 2;
        //动画:移动筹码
        i = 0;
        placeBets2.innerHTML = placeBets.innerHTML;
        var movebets3 = setInterval(function () {
            i++;
            placeBets.style.top = 60 + 10 * i + "%";
            placeBets2.style.top = 60 + 10 * i + "%";
            if (i > 6) {
                clearInterval(movebets3);
                placeBets.innerHTML = "";
                placeBets2.innerHTML = "";
                placeBets.style.top = "60%";
                placeBets2.style.top = "60%";
            }
        }, 300);
    } else if (userBust == 0 && dealerBust == 0 && userSlash !== -1 && dealerSlash == -1 && theUserSecondWord > dealerSum && theUserSecondWord == 21) {
        alertA.innerHTML = "BLACKJACK!";
        power = 3;
        if (spilted) power = 2;
    } else if (userBust == 0 && dealerBust == 0 && userSlash !== -1 && dealerSlash !== -1 && theUserSecondWord > theDealerSecondWord && theUserSecondWord == 21) {
        alertA.innerHTML = "BLACKJACK!";
        power = 3;
        if (spilted) power = 2;
    } else if (userBust == 0 && dealerBust == 0 && userSlash !== -1 && dealerSlash == -1 && theUserSecondWord > dealerSum && theUserSecondWord !== 21) {
        alertA.innerHTML = "WIN!";
        power = 2;
    } else if (userBust == 0 && dealerBust == 0 && userSlash !== -1 && dealerSlash !== -1 && theUserSecondWord > theDealerSecondWord && theUserSecondWord !== 21) {
        alertA.innerHTML = "WIN!";
        power = 2;
    } else if (userBust == 0 && dealerBust == 0 && userSlash !== -1 && dealerSlash == -1 && theUserSecondWord < dealerSum) {
        alertA.innerHTML = "LOST!";
        power = 0;
    } else if (userBust == 0 && dealerBust == 0 && userSlash !== -1 && dealerSlash !== -1 && theUserSecondWord < theDealerSecondWord) {
        alertA.innerHTML = "LOST!";
        power = 0;
    } else if (userBust == 0 && dealerBust == 0 && userSlash !== -1 && dealerSlash == -1 && theUserSecondWord == dealerSum) {
        alertA.innerHTML = "PUSH!";
        power = 1;
    } else if (userBust == 0 && dealerBust == 0 && userSlash !== -1 && dealerSlash !== -1 && theUserSecondWord == theDealerSecondWord) {
        alertA.innerHTML = "PUSH!";
    }//////////////////////////
    else if (userBust == 0 && dealerBust == 0 && userSlash == -1 && dealerSlash == -1 && userSum > dealerSum && userSum == 21) {
        alertA.innerHTML = "BLACKJACK!";
        power = 3;
        if (spilted) power = 2;
    } else if (userBust == 0 && dealerBust == 0 && userSlash == -1 && dealerSlash !== -1 && userSum > theDealerSecondWord && userSum == 21) {
        alertA.innerHTML = "BLACKJACK!";
        power = 3;
        if (spilted) power = 2;
    } else if (userBust == 0 && dealerBust == 0 && userSlash == -1 && dealerSlash == -1 && userSum > dealerSum && userSum !== 21) {
        alertA.innerHTML = "WIN!";
        power = 2;
    } else if (userBust == 0 && dealerBust == 0 && userSlash == -1 && dealerSlash !== -1 && userSum > theDealerSecondWord && userSum !== 21) {
        alertA.innerHTML = "WIN!";
        power = 2;
    } else if (userBust == 0 && dealerBust == 0 && userSlash == -1 && dealerSlash == -1 && userSum < dealerSum) {
        alertA.innerHTML = "LOST!";
        power = 0;
    } else if (userBust == 0 && dealerBust == 0 && userSlash == -1 && dealerSlash !== -1 && userSum < theDealerSecondWord) {
        alertA.innerHTML = "LOST!";
        power = 0;
    } else if (userBust == 0 && dealerBust == 0 && userSlash == -1 && dealerSlash == -1 && userSum == dealerSum) {
        alertA.innerHTML = "PUSH!";
        power = 1;
    } else if (userBust == 0 && dealerBust == 0 && userSlash == -1 && dealerSlash !== -1 && userSum == theDealerSecondWord) {
        alertA.innerHTML = "PUSH!";
        power = 1;
    }

    alerts.appendChild(alertA);
    setTimeout(function () {
        alerts.innerHTML = "";
    }, 1500);

    //增减筹码
    //allPlacebetsSum();////////////////////////////
    allBetsNum += allPlaceBetsNumb * power;
    allBets.innerHTML = "$ " + allBetsNum;

    setTimeout(function () {
        initTheGame();//初始化下一轮游戏
    }, 2500);
}


/*-------------------分割线-------------------------------------------------------------*/
//检查筹码,决定显示哪些类型的筹码,并监听相应的点击事件,同时记录所有筹码的总和
var startBetsNumb = 300;//设置初始有300$筹码
//var allBets = document.getElementById("allBets");//放置筹码总和容器
//var alerts = document.getElementById("alerts");//放置提醒的容器
var bet5 = document.getElementById("bet5");
var bet25 = document.getElementById("bet25");
var bet50 = document.getElementById("bet50");
var bet100 = document.getElementById("bet100");
var bet500 = document.getElementById("bet500");

var betsNumb = 0;//记录筹码个数
var dealOrNOt = 0;//记录是否是第一轮游戏(即以前没有放置过筹码)
//var fiv = twf = fit = onh = fih = 0;//分别记录各种类型筹码个数
//var placeBets = document.getElementById("placeBets");//放置所有筹码(每一个筹码)的容器
//var allBetsNum = parseInt(allBets.innerHTML.match(/\s([0-9]+)/));//筹码总和

judegBets();//对筹码总数进行判断,决定哪些类型的筹码显示

function judegBets() {
    if (allBetsNum < 5 && dealOrNOt !== 0) {
        bet5.className = "bet opacity";
        bet25.className = "bet opacity";
        bet50.className = "bet opacity";
        bet100.className = "bet opacity";
        bet500.className = "bet opacity";

        bet5.removeEventListener('click', bet5click);
        bet25.removeEventListener('click', bet25click);
        bet50.removeEventListener('click', bet50click);
        bet100.removeEventListener('click', bet100click);
        bet500.removeEventListener('click', bet500click);
        var alertA = document.createElement("a");
        alertA.id = "alert";
        alertA.setAttribute("href", "#");
        alertA.innerHTML = "CLICK TO RESTART!";
        alerts.appendChild(alertA);
        alertA.addEventListener('click', function () {
            betsNumb = 0;
            placeBets.innerHTML = "";
            allBetsNum = startBetsNumb;
            allBets.innerHTML = "$ " + startBetsNumb;
            alerts.innerHTML = "";
            judegBets();
        });
    }

    if (allBetsNum < 5) {
        betsLessFiv();
    } else if (allBetsNum >= 500) {
        betsMoreFih();
    } else if (allBetsNum >= 100) {
        betsMoreOnh();
    } else if (allBetsNum >= 50) {
        betsMoreFit();
    } else if (allBetsNum >= 25) {
        betsMoreTwf();
    } else if (allBetsNum >= 5) {
        betsMoreFiv();
    }
}

function betsLessFiv() {
    bet5.className = "bet opacity";
    bet25.className = "bet opacity";
    bet50.className = "bet opacity";
    bet100.className = "bet opacity";
    bet500.className = "bet opacity";

    bet5.removeEventListener('click', bet5click);
    bet25.removeEventListener('click', bet25click);
    bet50.removeEventListener('click', bet50click);
    bet100.removeEventListener('click', bet100click);
    bet500.removeEventListener('click', bet500click);
}

function betsMoreFih() {
    bet5.className = "bet";
    bet25.className = "bet";
    bet50.className = "bet";
    bet100.className = "bet";
    bet500.className = "bet";
    bet5.addEventListener('click', bet5click);
    bet25.addEventListener('click', bet25click);
    bet50.addEventListener('click', bet50click);
    bet100.addEventListener('click', bet100click);
    bet500.addEventListener('click', bet500click);
}

function betsMoreOnh() {
    bet5.className = "bet";
    bet25.className = "bet";
    bet50.className = "bet";
    bet100.className = "bet";
    bet500.className = "bet opacity";
    bet5.addEventListener('click', bet5click);
    bet25.addEventListener('click', bet25click);
    bet50.addEventListener('click', bet50click);
    bet100.addEventListener('click', bet100click);
    bet500.removeEventListener('click', bet500click);
}

function betsMoreFit() {
    bet5.className = "bet";
    bet25.className = "bet";
    bet50.className = "bet";
    bet100.className = "bet opacity";
    bet500.className = "bet opacity";
    bet5.addEventListener('click', bet5click);
    bet25.addEventListener('click', bet25click);
    bet50.addEventListener('click', bet50click);
    bet100.removeEventListener('click', bet100click);
    bet500.removeEventListener('click', bet500click);
}

function betsMoreTwf() {
    bet5.className = "bet";
    bet25.className = "bet";
    bet50.className = "bet opacity";
    bet100.className = "bet opacity";
    bet500.className = "bet opacity";
    bet5.addEventListener('click', bet5click);
    bet25.addEventListener('click', bet25click);
    bet50.removeEventListener('click', bet50click);
    bet100.removeEventListener('click', bet100click);
    bet500.removeEventListener('click', bet500click);
}

function betsMoreFiv() {
    bet5.className = "bet";
    bet25.className = "bet opacity";
    bet50.className = "bet opacity";
    bet100.className = "bet opacity";
    bet500.className = "bet opacity";
    bet5.addEventListener('click', bet5click);
    bet25.removeEventListener('click', bet25click);
    bet50.removeEventListener('click', bet50click);
    bet100.removeEventListener('click', bet100click);
    bet500.removeEventListener('click', bet500click);
}

bet5.addEventListener('click', bet5click);
bet25.addEventListener('click', bet25click);
bet50.addEventListener('click', bet50click);
bet100.addEventListener('click', bet100click);
bet500.addEventListener('click', bet500click);

function bet5click() {
    var div = document.createElement("div");
    betsNumb++;
    allBetsNum -= 5;
    fiv++;
    //div.id = "fiv" + fiv;
    //div.className = "addBet fiv";
    div.className = "fiv" + fiv + " addBet fiv";
    div.style.marginTop = 22.5 - betsNumb + "px";
    placeBets.appendChild(div);
    allBets.innerHTML = "$ " + allBetsNum;
    judegBets();
}

function bet25click() {
    var div = document.createElement("div");
    betsNumb++;
    twf++;
    allBetsNum -= 25;
    //div.id = "twf" + twf;
    div.className = "twf" + twf + " addBet twf";
    div.style.marginTop = 22.5 - betsNumb + "px";
    placeBets.appendChild(div);
    allBets.innerHTML = "$ " + allBetsNum;
    judegBets();
}

function bet50click() {
    var div = document.createElement("div");
    betsNumb++;
    fit++;
    allBetsNum -= 50;
    //div.id = "fit" + fit;
    div.className = "fit" + fit + " addBet fit";
    div.style.marginTop = 22.5 - betsNumb + "px";
    placeBets.appendChild(div);
    allBets.innerHTML = "$ " + allBetsNum;
    judegBets();
}

function bet100click() {
    var div = document.createElement("div");
    betsNumb++;
    onh++;
    allBetsNum -= 100;
    //div.id = "onh" + onh;
    div.className = "onh" + onh + " addBet onh";
    div.style.marginTop = 22.5 - betsNumb + "px";
    placeBets.appendChild(div);
    allBets.innerHTML = "$ " + allBetsNum;
    judegBets();
}

function bet500click() {
    var div = document.createElement("div");
    betsNumb++;
    fih++;
    allBetsNum -= 500;
    //div.id = "fiv" + fih;
    div.className = "fiv" + fih + " addBet fih";
    div.style.marginTop = 22.5 - betsNumb + "px";
    placeBets.appendChild(div);
    allBets.innerHTML = "$ " + allBetsNum;
    judegBets();
}
/*-------------------分割线-------------------------------------------------------------*/
//本轮游戏所有放置的筹码总和

/*var betsNumb = 0;//记录筹码个数
 var dealOrNOt = 0;//记录是否是第一轮游戏(即以前没有放置过筹码)
 var fiv = twf = fit = onh = fih = 0;//分别记录各种类型筹码个数
 var placeBets = document.getElementById("placeBets");//放置所有筹码(每一个筹码)的容器
 var allBetsNum = parseInt(allBets.innerHTML.match(/\s([0-9]+)/));//筹码总和*/

function allPlacebetsSum() {
    allPlaceBetsNumb = fiv * 5 + twf * 25 + fit * 50 + onh * 100 + fih * 500;
}
/*-------------------分割线-------------------------------------------------------------*/
//当牌张数小于一半时,洗牌
//var cardsNum = 52;//牌总数
//var remainCards = 52; //剩余的牌数
var shuffleCard = document.getElementById("shuffle");
var cards1 = document.getElementById("cards1");
var cards2 = document.getElementById("cards2");

function shuffle() {
    if (2 * remainCards < cardsNum) {
        var alertA = document.createElement("a");
        alertA.id = "alert";
        alertA.setAttribute("href", "#");
        alertA.innerHTML = "剩余牌数少于一半,洗牌中...";
        alerts.appendChild(alertA);
        deal = [];
        hasDeald = 0;
        remainCards = cardsNum;
        for (var i = 0; i < cardsNum; i++) {
            cardStat[i] = 0;
        }
        setTimeout(function () {
            alerts.innerHTML = "";
        }, 1500);
        //洗牌动画
        shuffleCard.style.display = "block";
        i = 0;
        var moveCards = setInterval(function () {
            i++;
            //cards1.style.zIndex=3*j;
            //cards2.style.zIndex=3*-j;
            if (i < 18) {
                cards1.style.marginLeft = 4 * i + "px";
            } else if (i >= 18 && i < 36) {
                cards1.style.marginLeft = 68 - 4 * (i - 18) + "px";
            } else if (i >= 36 && i < 54) {
                cards2.style.marginLeft = -4 * (i - 36) + "px";
            } else if (i >= 54 && i < 72) {
                cards2.style.marginLeft = -68 + 4 * (i - 54) + "px";
            } else if (i == 72) {
                i = 0;
            }
        }, 20);
        setTimeout(function () {
            clearInterval(moveCards);
            shuffleCard.style.display = "none";
        }, 2000);

    }
}

/*-------------------分割线-------------------------------------------------------------*/
