
let myForm=document.getElementById('myForm').addEventListener('submit',saveBook);

function saveBook(e){
    let siteName=document.getElementById('siteName').value;
    let siteUrl=document.getElementById('siteUrl').value;
    // Creating Object from Input values
    let bookmark={
        site:siteName,
        url:siteUrl
    };
    // Check the input valid is not empty
    if(siteName=="" || siteUrl==""){
        alert("Enter the Value:")
        return false;
    }
    // Check the siteUrl starts with valid URL
    if(!siteUrl.startsWith("https://")){
        alert("Enter Valid URL");
        return false;
    }   
    // Setting an array of the input values to localStorage
    if(localStorage.getItem('bookmarks')===null){
        let bookmarks=[];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }else{
        let bookmarks= JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }
    // Clearing Input Values
    document.getElementById('siteName').value="";
    document.getElementById('siteUrl').value="";
    // Re-calling showBook function
    showBook();
    e.preventDefault();
}

function showBook(){
    let bookmarks= JSON.parse(localStorage.getItem('bookmarks'));
    var result= document.querySelector('.bookResult');
    result.innerHTML = '';

    for(let i=0;i<bookmarks.length;i++){
        let name=bookmarks[i].site;
        let url=bookmarks[i].url;

        result.innerHTML+=`<div class="well">
                                <h3 class="text-center">${name}</h3>
                                <div class="display-flex">
                                <a class="btn btn-info" href="${url}">Visit</a>
                                <a onclick="removeBook('${url}')" class="btn btn-danger" href="#">Delete</a>
                                </div>
                            </div>`
        
    }
}

function removeBook(url){
    let bookmarks= JSON.parse(localStorage.getItem('bookmarks'));
    
    for(let i=0;i<bookmarks.length;i++){
        if(bookmarks[i].url== url){
            bookmarks.splice(i,1);
            localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
        }
    }
    var result= document.querySelector('.bookResult');
    result.innerHTML = '';
    showBook();
}

