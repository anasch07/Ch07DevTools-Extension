document.addEventListener('DOMContentLoaded',async ()=>{
    const input=document.querySelector("#input");
    const output=document.querySelector("#output");
    const copys=document.querySelectorAll(".btn.btn-primary");
    const copy256 =document.querySelector("#copyElement256");
    const copy512=document.querySelector("#copyElement512");
    const sha1output=document.querySelector("#sha1output");
    const sha256output=document.querySelector("#sha256output");
    const sha512output=document.querySelector("#sha512output");
    const urlDecodeInput=document.querySelector("#decodeInput");
    const urlDecodeOutput=document.querySelector("#decodeOutput");
    const base64DecodeInput=document.querySelector("#base64DecodeInput")
    const base64DecodeOutput=document.querySelector("#base64DecodeOutput");


    input.addEventListener("input",()=>{
         data=input.value;
        // console.log(data)
        // console.log(input.classList)
         if(data===""){
             if(output){
                 output.value="";
             }
             if(sha1output){
                 sha1output.value="";
             }
             if(sha256output){
                 sha256output.value="";
             }
             if(sha512output){
                 sha512output.value="";
             }
         }
         else
         {
             if(input.classList=="form-control md5"){
                 output.value=md5(data)
             }
             else if(input.classList=="form-control sha") {
                 sha1output.value=hex_sha1(data);
                 sha256output.value=hex_sha256(data);
                 sha512output.value=hex_sha512(data);
             }
             else if(input.classList=="form-control url-encode"){
                 output.value=encodeURIComponent(data);
             }
             else if(input.classList=="form-control base64Encode"){
                 output.value=btoa(data);
             }
         }

    })

    //FOR URL DECODE
    if(urlDecodeInput){
        urlDecodeInput.addEventListener("input",()=>{
            data=urlDecodeInput.value;
            // console.log(data)
            // console.log(input.classList)
            urlDecodeOutput.value="decodeURIComponent(data)";
            // console.log(decodeURIComponent(data))
            urlDecodeOutput.value=decodeURIComponent(data);


        })
    }

    //FOR BASE64 DECODE
    if(base64DecodeInput){
        base64DecodeInput.addEventListener("input",()=>{
            data=base64DecodeInput.value;
            // console.log(data)
            // console.log(input.classList)
            base64DecodeOutput.value="decodeURIComponent(data)";
            // console.log(decodeURIComponent(data))

            let e;
            try{
                base64DecodeOutput.value=atob(data);
            }
            catch (e){
                base64DecodeOutput.value='Error: ' + e;
            }


        })
    }



    copys.forEach((copy)=>{
        copy.addEventListener("click",(e)=>{
            console.log(e.target.id);
            const copyFrom=document.createElement("textarea");
            if(e.target.id=="copyElement1"){
                copyFrom.textContent =sha1output.value ;
            }
            else if(e.target.id=="copyElement256"){
                copyFrom.textContent =sha256output.value ;
            }
            else if(e.target.id=="copyElement512"){
                copyFrom.textContent =sha512output.value ;
            }
            else if(e.target.id=="copyElementDecode"){
                copyFrom.textContent =urlDecodeOutput.value ;
            }
            else if(e.target.id=="base64DecodeCopy"){
                copyFrom.textContent =base64DecodeOutput.value ;
            }
            else{
                copyFrom.textContent =output.value ;
            }
            document.body.appendChild(copyFrom);
            copyFrom.select();
            document.execCommand('copy');
            copyFrom.blur();
            document.body.removeChild(copyFrom);
        })
    })
})

