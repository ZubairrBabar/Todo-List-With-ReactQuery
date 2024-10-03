const todos = ["bath","breaking fast","walking","office","lunch"];


export const fetchTodo = () => 
    new Promise((resolve , reject) => {
     setTimeout(()=>{
        resolve(todos)
     },1000)
    })


export const newTodo = (todo) => 
    new Promise((resolve, reject)=>{
        todos.push(todo)
    resolve([...todos])
    },1000)
