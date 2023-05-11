'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState , useEffect } from 'react'
import {signIn , signOut , useSession , getProviders} from "next-auth/react"

function Nav() {
  const {data:session} = useSession()
  const [toggleDropdown , setToggleDropDown] = useState(false)
  const [providers , setProviders] = useState(null)

  useEffect(()=>{
    const handleSetProviders = async () => {
      const res = await getProviders()
      setProviders(res)
    }
    handleSetProviders()
  },[])
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href={'/'} className="flex gap-2 flex-center">
        <Image alt='logo' width={30} height={30} className='object-contain' src="/assets/images/logo.svg" />
        <p className="logo_text">Prompt Share</p>
      </Link>
      
      {/* desktop navigaion */}
      <div className="sm:flex hidden">
        {
          session?.user ? (
            <div className="flex gap-3 md:gap-5">
              <Link href={'/create-prompt'} className='black_btn' >Create Post</Link>

              <button className='outline_btn' type='button' onClick={signOut} >Sign Out</button>

              <Link href={'profile'}>
                <Image src={session?.user.image} height={40} width={40} alt='profile' className='rounded-full' />
              </Link>
            </div>
          ) : (
            <>
              {
                providers &&
                Object.values(providers).map((provider,i)=>(
                  <button type='button' key={provider.name} onClick={()=>signIn(provider.id)} className='black_btn' >
                    Sign Up
                  </button>
                ))
              }
            </>
          )
        }
      </div>


      {/* mobile navigation */}
      <div className="sm:hidden flex relative">
        {
          session?.user ? (
            <div className="flex">
              <Image onClick={()=>setToggleDropDown(prev=>!prev)} src={session?.user.image} height={40} width={40} alt='profile' className='rounded-full' />
              {
                toggleDropdown && (
                  <div className="dropdown">
                    <Link href="/profile" className='dropdown_link' onClick={()=>setToggleDropDown(false)} >
                      My Profile
                    </Link>
                    <Link href="/create-prompt" className='dropdown_link' onClick={()=>setToggleDropDown(false)} >
                      Create Prompt
                    </Link>
                    <button className='black_btn mt-5 w-full' type='button' onClick={()=>{
                      setToggleDropDown(false)
                      signOut()
                    }} >
                      Sign Out
                    </button>
                  </div>
                )
              }
            </div>
          ) : (
            <>
              {
                providers &&
                Object.values(providers).map((provider,i)=>(
                  <button type='button' key={provider.name} onClick={()=>signIn(provider.id)} className='black_btn' >
                    Sign Up
                  </button>
                ))
              }
            </>
          )
        }
      </div>

    </nav>
  )
}

export default Nav