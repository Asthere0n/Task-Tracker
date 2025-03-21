// POP-UP
const deletePopup = document.getElementById("delete-box").classList
const deletePopupBG = document.getElementById("deleteModal").classList
const completePopup = document.getElementById("complete-box").classList
const completePopupBG = document.getElementById("completeModal").classList

// Delete
const deleteButton = document.getElementById("task-delete")
const confirmDeleteButton = document.getElementById("confirm-delete")
const cancelDeleteButton = document.getElementById("cancel-delete")

// Complete
const completeButton = document.getElementById("task-complete")
const confirmCompleteButton = document.getElementById("confirm-complete")
const cancelCompleteButton = document.getElementById("cancel-complete")

//  Event listeners
completeButton.addEventListener("click", () => {
    completePopup.add("open")
    completePopupBG.add("open")
})

confirmCompleteButton.addEventListener("click", () => {
    completePopup.add("open")
    completePopupBG.add("open")
})

cancelCompleteButton.addEventListener("click", () => {
    completePopup.remove("open")
    completePopupBG.remove("open")
})

deleteButton.addEventListener("click", () => {
    deletePopup.add("open")
    deletePopupBG.add("open")
})

confirmDeleteButton.addEventListener("click", () => {
    deletePopup.add("open")
    deletePopupBG.add("open")
})

cancelDeleteButton.addEventListener("click", () => {
    deletePopup.remove("open")
    deletePopupBG.remove("open")
})

document.querySelectorAll('modal').forEach(
    deletePopup.addEventListener('click', ()=>{
        deletePopup.remove("open")
        deletePopupBG.remove("open")
        completePopup.remove("open")
        completePopupBG.remove("open")
    })
)