'use client'

import {useState} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Form from '@components/Form'

function CreatePrompt(e) {
    const router = useRouter()
    const {data:session} = useSession()
    console.log(session,"=====session========")
    const [submitting , setSubmitting] = useState(false)
    const [post , setPost] = useState({
        prompt:"",
        tag:""
    })
    async function handleSubmit(e){
      e.preventDefault()
      setSubmitting(true)
      try{
        const response = await fetch('/api/prompt/new',{
          method:'POST',
          body:JSON.stringify({
            prompt:post.prompt,
            tag:post.tag ,
            userId : session?.user.id
          })
        })

        if(response.ok){
          router.push('/')
        }
      }catch(err){
        console.log(err)
      } finally{
        setSubmitting(false)
      }

    }
  return (
    <Form type="Create"
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={handleSubmit}
    />
  )
}

export default CreatePrompt