import { useEffect, useState } from 'react'
import './App.css'
import { fetchTodo, newTodo } from './utills/todo'
import { QueryClient, useMutation, useQuery } from 'react-query'

const queryClient = new QueryClient()


function App() {

  const [todo, setTodo] = useState('')
  
  const {data: todos= [], isLoading, isError , refetch} = useQuery('todos', fetchTodo) //1st method
  // const {data: todo= [], isLoading, isError} = useQuery({queryKey:["todos"] , queryFn:fetchTodo}) //2nd method
 
  
  const mutation = useMutation({
    mutationFn: (todo) => {
      return newTodo(todo)
    
    },
    onSuccess : ()=> {
refetch(), setTodo('')
    
    }
    
  });


if( isError )
return (
<h1 className='text-3xl font-bold'>Sorry we can't fetch your data right now</h1>
)
  return (
    
    <div className='flex flex-col justify-center items-center'>
     
      <h1 className='text-3xl font-bold'>React Query</h1>
{isLoading &&  <h1 className='text-3xl font-bold'>...Loading</h1>}
{/* {error &&  <h1 className='text-3xl font-bold'>Sorry we can't fetch your data right now</h1>} */}

    <div>
    <input value={todo} onChange={(e)=> setTodo(e.target.value)} className = "w-100 border p-2 m-3 " type="text" placeholder='Todo' />
    <button 
    onClick={()=>{mutation.mutate(todo)}} 
    >
      {mutation.isLoading ? "Adding" : "Add Todo"} 
      
    </button>
    </div>

{todos.map((data,ind)=>{
  return(  <h1 key={ind} className='text-xl my-2  font-bold  '> {data}  </h1>
    )
 


})
}
    
    </div>
  )
}


export default App
