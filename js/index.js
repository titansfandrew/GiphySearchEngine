const outputDiv = document.getElementById("output");

async function page_load()
{
    
    try {
                    
        const msg = "Giphy Search Engine - page load"
        console.log(msg)

        if(outputDiv == null | outputDiv == undefined){       
            const msg = "Giphy Search Engine - output div not found";
            console.log(msg) 
            return false;
        }

    } catch (error) {

        console.log("Giphy Search Engine - error ")
        console.log(error)

        msg = "Giphy Search Engine - error ";
        outputDiv.innerText = msg;
    }
}


document.getElementById("btn-search").addEventListener("click",async =>{
    
    let msg = "";
    
    try {
        
        msg = "btn-search";
        outputDiv.innerText = msg;

        const _txtsearch = document.getElementById("txtsearch");

        if(_txtsearch == null | _txtsearch == undefined)
        {                
            msg = "please enter a search text";
            outputDiv.innerText = msg;
            return false;
        }
        else if (_txtsearch.value.trim().length == 0)
        {                
            msg = "please enter a search text";
            outputDiv.innerText = msg;
            return false;
        }

        const _url_giphy_data_url = "./data/giphy2.json";

        const _giphy_apikey = "Wmop3aReC0ypaS1Tifrv7oB5azTx5oCD"
        const _search_text = _txtsearch.value;
        const _giphy_url_1 = `//api.giphy.com/v1/gifs/search?api_key=${_giphy_apikey}&q=${_search_text}`;
        const _giphy_url_2 = `//api.giphy.com/v1/gifs/search?q=${_search_text}&api_key=${_giphy_apikey}`;

        const _url = (_giphy_apikey == "Wmop3aReC0ypaS1Tifrv7oB5azTx5oCD")?_url_giphy_data_url:_giphy_url_1;

        fetch(_url)
        .then(response => {  
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(results => { 

            console.log("fetch giphy data result")
            console.log(results);

            outputDiv.innerText = "fetch giphy data result";
            
            if(results.data.length>0){ 

                let _html = "<div class='center-page'>"

                results.data.forEach((gif, giphy2) => {

                    if(giphy2 <= 10){
                        
                        const _img_url = gif.images.original.url;

                        _html += `<img width='300' height='200' src='${_img_url}'>`
                        
                    }
                });

                _html += "<div>"

                outputDiv.innerHTML = _html;
            }
  
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            outputDiv.innerText = error;
        });


    } catch (error) {
        
        console.log("btn-search - error")
        console.log(error)

        msg = "btn-search - error";
        outputDiv.innerText = msg;
    }

})


document.getElementById("btn-reset").addEventListener("click", async =>{
    
    let msg = "";
    try {
        msg = "";
        outputDiv.innerText = msg;
        let _txtsearch = document.getElementById("txtsearch");
        _txtsearch.value = "";
        _txtsearch.focus();
    } catch (error) {
        
        console.log("btn-reset - error")
        console.log(error)
        msg = "btn-reset - error";
        outputDiv.innerText = msg;
    }
})
