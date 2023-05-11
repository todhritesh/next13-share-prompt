'use client'
import {useState , useEffect} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Profile from '@components/Profile'

function MyProfile() {
  const {data:session} = useSession()
  const [posts , setPosts] = useState([])
  const router = useRouter()
  const handleEdit = async (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  }
  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete ?")
    if(hasConfirmed){
      try{
        await fetch(`api/prompt/${post._id}`,{
          method:'DELETE'
        })

        const filteredPost = posts.filter(item=>item._id!==post._id)
        setPosts(filteredPost)
      }catch(err){
        console.log(err)
      }
    }
  }
  useEffect(()=>{
    const fetchPosts = async () => {
        const response = await fetch(`api/users/${session?.user.id}/posts`)
        const data = await response.json()
        console.log(data)
        setPosts(data)
    }
    if(session?.user.id) fetchPosts()
  },[session?.user.id])
  return (
    <Profile
        name="Myy" 
        desc={"Welcome to your peersonalized profile page"} 
        data = {posts}
        handleEdit = {handleEdit}
        handleDelete = {handleDelete}
    />

  )
}

export default MyProfile