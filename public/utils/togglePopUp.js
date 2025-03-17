const popup = document.getElementById("popup-box").classList
const popupBG = document.getElementById("modal") .classList
const deleteButton = document.getElementById("task-delete")
const confirmButton = document.getElementById("confirm-button")
const cancelButton = document.getElementById("cancel-button")

cancelButton.addEventListener('click', ()=>{
    popup.remove("open")
    popupBG.remove("open")
})

deleteButton.addEventListener("click", ()=>{
    popup.add("open")
    popupBG.add("open")
})

