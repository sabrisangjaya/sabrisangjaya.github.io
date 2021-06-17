function extractplot(movieplot) {
    var candidates = removeStopwords(preprocess(movieplot));
    x = candidates.length;
    var text = candidates.join(" ");
    var bag = new Set(text.split(" "));
    bag = Array.from(bag);
    bag = bag.slice(1);
    var m = bag.length;

    var freq = [];
    var degree = new Array(m).fill(0);
    for (var i = 0; i < m; i++) {
        freq.push(countInstances(text, " "+bag[i]+" "));
        for (var c = 0; c < x; c++) {
            if (candidates[c].includes(" "+bag[i]+" ")) {
                degree[i] += countInstances(candidates[c], " ") - 1;
            }
        }
    }
    var word_scores = [];
    for (var i = 0; i < m; i++) {
        word_scores.push(degree[i] / freq[i]);
    }
    var candidate_scores = new Array(x).fill(0);
    for (var c = 0; c < x; c++) {
        var candi = candidates[c].slice(1, -1).split(" ");
        for (var i = 0; i < candi.length; i++) {
            var wi = bag.indexOf(candi[i]);
            candidate_scores[c] += word_scores[wi];
        }
    }
    var combination = [];
    for (var i = 1; i < x; i++) {
        combination.push(
            {score: candidate_scores[i], kw: candidates[i].slice(1, -1)}
        );
    }
    combination.sort(function(a, b) {
    return ((a.score > b.score) ? -1 : ((a.score == b.score) ? 0 : 1));
    });

    var temp = [];
    for (var i = 0; i < Math.floor(x/2); i++) {
        temp.push(combination[i].kw);
    }

    var combination = [];
    for (var i = 0; i < 20; i++) {
        if (combination.includes(temp[i]) == false) {
            combination.push(temp[i]);
        }
    }
    x = combination.length;

    var keywordresult=[];

    if(combination.length>3){
        for (var i = 0; i < 4; i++) {
            keywordresult.push(combination[Math.floor(Math.random()*(combination.length-0)+0)]);        
        }    
    }
    else{
        keywordresult=combination;
    }
    keywordresult=[...new Set(keywordresult)];
    console.log(keywordresult);
}


var fox_stoplist = ["a","able","about","above","according","accordingly","across","actually","after","afterwards","again","against","all","allow","allows","almost","alone","along","already","also","although","always","am","among","amongst","an","and","another","any","anybody","anyhow","anyone","anything","anyway","anyways","anywhere","apart","appear","appreciate","appropriate","are","area","areas","around","as","aside","ask","asked","asking","asks","associated","at","available","away","awfully","b","back","backed","backing","backs","be","became","because","become","becomes","becoming","been","before","beforehand","began","behind","being","beings","believe","below","beside","besides","best","better","between","beyond","big","both","brief","but","by","c","came","can","cannot","cant","case","cases","cause","causes","certain","certainly","changes","clear","clearly","co","com","come","comes","concerning","consequently","consider","considering","contain","containing","contains","corresponding","could","course","currently","d","definitely","described","despite","did","differ","different","differently","do","does","doing","done","down","downed","downing","downs","downwards","during","e","each","early","edu","eg","eight","either","else","elsewhere","end","ended","ending","ends","enough","entirely","especially","et","etc","even","evenly","ever","every","everybody","everyone","everything","everywhere","ex","exactly","example","except","f","face","faces","fact","facts","far","felt","few","fifth","find","finds","first","five","followed","following","follows","for","former","formerly","forth","four","from","full","fully","further","furthered","furthering","furthermore","furthers","g","gave","general","generally","get","gets","getting","give","given","gives","go","goes","going","gone","good","goods","got","gotten","great","greater","greatest","greetings","group","grouped","grouping","groups","h","had","happens","hardly","has","have","having","he","hello","help","hence","her","here","hereafter","hereby","herein","hereupon","hers","herself","hi","high","higher","highest","him","himself","his","hither","hopefully","how","howbeit","however","i","ie","if","ignored","immediate","important","in","inasmuch","inc","indeed","indicate","indicated","indicates","inner","insofar","instead","interest","interested","interesting","interests","into","inward","is","it","its","itself","j","just","k","keep","keeps","kept","kind","knew","know","known","knows","l","large","largely","last","lately","later","latest","latter","latterly","least","less","lest","let","lets","like","liked","likely","little","long","longer","longest","look","looking","looks","ltd","m","made","mainly","make","making","man","many","may","maybe","me","mean","meanwhile","member","members","men","merely","might","more","moreover","most","mostly","mr","mrs","much","must","my","myself","n","name","namely","nd","near","nearly","necessary","need","needed","needing","needs","neither","never","nevertheless","new","newer","newest","next","nine","no","nobody","non","none","noone","nor","normally","not","nothing","novel","now","nowhere","number","numbered","numbering","numbers","o","obviously","of","off","often","oh","ok","okay","old","older","oldest","on","once","one","ones","only","onto","open","opened","opening","opens","or","order","ordered","ordering","orders","other","others","otherwise","ought","our","ours","ourselves","out","outside","over","overall","own","p","part","parted","particular","particularly","parting","parts","per","perhaps","place","placed","places","please","plus","point","pointed","pointing","points","possible","present","presented","presenting","presents","presumably","probably","problem","problems","provides","put","puts","q","que","quite","qv","r","rather","rd","re","really","reasonably","regarding","regardless","regards","relatively","respectively","right","room","rooms","s","said","same","saw","say","saying","says","second","secondly","seconds","see","seeing","seem","seemed","seeming","seems","seen","sees","self","selves","sensible","sent","serious","seriously","seven","several","shall","she","should","show","showed","showing","shows","side","sides","since","six","small","smaller","smallest","so","some","somebody","somehow","someone","something","sometime","sometimes","somewhat","somewhere","soon","sorry","specified","specify","specifying","state","states","still","sub","such","sup","sure","t","take","taken","tell","tends","th","than","thank","thanks","thanx","that","thats","the","their","theirs","them","themselves","then","thence","there","thereafter","thereby","therefore","therein","theres","thereupon","these","they","thing","things","think","thinks","third","this","thorough","thoroughly","those","though","thought","thoughts","three","through","throughout","thru","thus","to","today","together","too","took","toward","towards","tried","tries","truly","try","trying","turn","turned","turning","turns","twice","two","u","un","under","unfortunately","unless","unlikely","until","unto","up","upon","us","use","used","useful","uses","using","usually","uucp","v","value","various","very","via","viz","vs","w","want","wanted","wanting","wants","was","way","ways","we","welcome","well","wells","went","were","what","whatever","when","whence","whenever","where","whereafter","whereas","whereby","wherein","whereupon","wherever","whether","which","while","whither","who","whoever","whole","whom","whose","why","will","willing","wish","with","within","without","wonder","work","worked","working","works","would","x","y","year","years","yes","yet","you","young","younger","youngest","your","yours","yourself","yourselves","z","zero"];

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

function preprocess(movieplot) {
    var delimiters = ["(", ")", "[", "]", "{", "}", ".", ",", ":", ";", "!", "#", "$", "&", "?", " - ", "_", "+", "<", ">", '“', '”', '–', "…", ' / ', "|", '’', "'"];
    var str = movieplot;
    str = " " + str + " ";
    str = splitMulti(str, delimiters).join(" wwttff ");
    return str;
}

function removeStopwords(str) {
    n = fox_stoplist.length;
    str = str.replaceAll("n't", " not");
    str = str.replaceAll("n’t", " not");
    str = str.replaceAll("'ve", " have");
    str = str.replaceAll('’ve', " have");
    str = str.replaceAll('t’s', "t is");
    str = str.replaceAll("t's", "t is");
    str = str.replaceAll('\n', " wwttff ");
    for (var i = 0; i < n; i++) {
        str = str.replaceAll(" "+fox_stoplist[i]+" ", " wwttff ");
    }
    str = str.replace(/\s+/g, ' ');
    //str = str.replaceAll("wwttff", "+");
    str = str.split("wwttff");

    n = str.length;
    var candidates = [];
    for (var i = 0; i < n; i++) {
        if (str[i].length >= 2) {
            candidates.push(str[i]);
        }
    }
    return candidates;
}


function countInstances(string, word) {
   return string.split(word).length - 1;
}

function splitMulti(str, tokens){
        var tempChar = tokens[0]; // We can use the first token as a temporary join character
        for(var i = 1; i < tokens.length; i++){
            str = str.split(tokens[i]).join(tempChar);
        }
        str = str.split(tempChar);
        return str;
}
