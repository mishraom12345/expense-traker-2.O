let form=document.getElementById("form");

form.addEventListener("submit",getitems);

function getitems(e){
   e.preventDefault();
 
  let amount=e.target.amountinput.value;
  let description=e.target.descriptioninput.value;
  let selected=e.target.selected.value;

  var obj={
    amount,
    description,
    selected
  }
  axios.post("https://crudcrud.com/api/57e585e1128d4768a25ee278933c821d/seeling",obj)
  .then((response)=>{
    displayonscreen(response.data)
      console.log(response)

  }).catch((err)=>{
      document.body.innerHTML = document.body.innerHTML + "<h3> something went wrong </h3>"
      console.log(err)
  })
}
window.addEventListener('DOMContentLoaded',()=>{
    axios.get("https://crudcrud.com/api/57e585e1128d4768a25ee278933c821d/selling")
            .then((response)=>{
                
                console.log(response)

                for (let i = 0; i < response.data.length; i++) {
                    displayonscreen(response.data[i])
                    
                }

            }).catch((err)=>{
                document.body.innerHTML = document.body.innerHTML + "<h3> something went wrong </h3>"
                console.log(err)
            })
    // for (let i = 0; i < localStorage.length; i++) {
    //     var keys = localStorage.key(i)
    //     var data = localStorage.getItem(keys)
    
    //     var strtoobj = JSON.parse(data)
    
    //     displayonsreen(strtoobj)
        
    // }
    
})






function displayonscreen(obj){

var li=`<li id="'${obj._id}">${obj.amount} ${obj.description} ${obj.selected}  <button onClick="deleting(''${obj._id}')">del</button>  <button onClick="editing(''${obj._id}')">edit</button></li>`

var target=document.getElementById("ul");
target.innerHTML=target.innerHTML+li;
}

function deleting(objId){
    axios.delete(`https://crudcrud.com/api/57e585e1128d4768a25ee278933c821d/selling/${objId}`)
            .then((response)=>{
                deletefromscreen(objId)

            }).catch((err)=>{
                document.body.innerHTML = document.body.innerHTML + "<h3> something went wrong </h3>"
                console.log(err)
            })

    
}

function deletefromscreen(objId){
    var parent = document.getElementById('ul')
    var child = document.getElementById(objId)
    parent.removeChild(child)
    
}


function editing(e){
  
let amountval=JSON.parse(localStorage.getItem(e)).amount;

let descval=JSON.parse(localStorage.getItem(e)).description;

let selecteditem=JSON.parse(localStorage.getItem(e)).selected;


document.getElementById("amountinput").value=amountval;
document.getElementById("descriptioninput").value=descval;
document.getElementById("selected").value=selecteditem;

}