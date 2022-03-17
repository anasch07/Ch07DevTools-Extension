document.addEventListener('DOMContentLoaded',async ()=>{
    const words=document.querySelector("#words");
    const sentences=document.querySelector("#sentences");
    const paragraphs=document.querySelector("#paragraphs");
    const output=document.getElementById("textArea");
    const paramaters=document.querySelectorAll(".form-control");
    const copy=document.querySelector("#copyButton")

    paramaters.forEach(param=>{
        param.addEventListener("input",(e)=>{
            let wordsValue=words.value;
            let paragraphsValue=paragraphs.value;
            let sentencesValue=sentences.value;
            output.value=getLorem(wordsValue,sentencesValue,paragraphsValue)
            if(!wordsValue && !paragraphsValue &&!sentencesValue){
                output.value="Auctor dis a elit dapibus.\n" +
                    "Mollis congue neque libero lobortis.\n" ;
            }
        })
    })
    copy.addEventListener("click",()=>{
        if(output.value){
            const copyFrom=document.createElement("textarea");
            copyFrom.textContent =output.value ;
            document.body.appendChild(copyFrom);
            copyFrom.select();
            document.execCommand('copy');
            copyFrom.blur();
            document.body.removeChild(copyFrom);
        }

    })

})



