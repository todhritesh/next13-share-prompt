import React from 'react'
import PromptCard from './PromptCard'

function Profile({
  name,
  desc,
  data,
  handleEdit,
  handleDelete,
}) {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left' >
        <span className='blue_gradient' >
          {name} Profile
        </span>
      </h1>
      <p className="desc text-left">
        {desc}
      </p>
      {
        data.map((post=>{
          return (
            <PromptCard key={post._id} post={post} handleEdit={ handleEdit} handleDelete={handleDelete} />
          )
        }))
      }
    </section>
  )
}

export default Profile