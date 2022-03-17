/**
 * Get a random lorem ipsum string
 * Set prng by using getLorem.setPrng(lcg)
 * @param words
 * @param sentences
 * @param paragraphs
 * @returns {string}
 */
var getLorem = (function(){
    var loremList = 'a et at in mi ac id eu ut non dis cum sem dui nam sed est nec sit mus vel leo urna duis quam cras nibh enim quis arcu orci diam nisi nisl nunc elit odio amet eget ante erat eros ipsum morbi nulla neque vitae purus felis justo massa donec metus risus curae dolor etiam fusce lorem augue magna proin mauris nullam rutrum mattis libero tellus cursus lectus varius auctor sociis ornare magnis turpis tortor semper dictum primis ligula mollis luctus congue montes vivamus aliquam integer quisque feugiat viverra sodales gravida laoreet pretium natoque iaculis euismod posuere blandit egestas dapibus cubilia pulvinar bibendum faucibus lobortis ultrices interdum maecenas accumsan vehicula nascetur molestie sagittis eleifend facilisi suscipit volutpat venenatis fringilla elementum tristique penatibus porttitor imperdiet curabitur malesuada vulputate ultricies convallis ridiculus tincidunt fermentum dignissim facilisis phasellus consequat adipiscing parturient vestibulum condimentum ullamcorper scelerisque suspendisse consectetur pellentesque'.split(' ')
        ,loremNum = loremList.length
        ,prng = Math;

    function getLorem(words,sentences,paragraphs){
        var iWords, aWords
            ,iSentences, sSentence, aSentences
            ,aParagraphs = []
            ,bSentence = !!sentences
            ,bParagraph = !!paragraphs
        ;
        paragraphs = processLength(paragraphs);
        while (paragraphs--) {
            iSentences = processLength(sentences);
            aSentences = [];
            while (iSentences--) {
                iWords = processLength(words);
                aWords = [];
                while (iWords--) {
                    aWords.push(loremList[(prng.random())*loremNum<<0]);
                }
                sSentence = aWords.join(' ') + (bParagraph?'.':'');
                if (bSentence) {
                    sSentence = sSentence.charAt(0).toUpperCase() + sSentence.slice(1);
                }
                aSentences.push(sSentence);
            }
            aParagraphs.push(aSentences.join(' '));
        }
        return aParagraphs.join('\n');
    }

    function processLength(number){
        var float = number||1
            ,int = float<<0;
        if (int!==float) {
            float = Math.max(int + Math.round(2*(prng.random()-0.5)*(float-int)*int),1);
        }
        return float;
    }

    function setPrng(rng){
        prng = rng;
    }

    getLorem.setPrng = setPrng;
    return getLorem;
})();

console.log(getLorem(5,1,3))

