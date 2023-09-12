'use client'

import { useRouter } from 'next/navigation'
import React, { useRef } from 'react'
import { Toaster, toast } from 'react-hot-toast'

const postBlog = async (title: string | undefined, description: string | undefined) => {
  const res = await fetch(`http://localhost:3001/api/blog`, {
    method: "POST",
    body: JSON.stringify({ title, description }),
    headers: {
      "Content-type": "application/json"
    }
  })

  return res.json()
}

const PostBlog = () => {
  const router = useRouter()
  const titleRef = useRef<HTMLInputElement | null>(null)
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null)
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.promise(
      postBlog(titleRef.current?.value, descriptionRef.current?.value),
       {
         loading: '投稿中...',
         success: <b>投稿に成功しました</b>,
         error: <b>失敗しました</b>,
       }
     ).then(() => {
       router.push('/')
       router.refresh()
     })
  }
  const handleBack = () => {
    router.push('/')
  }

  return (
    <>
      <Toaster />
      <div className="w-full h-screen m-auto flex bg-slate-900">
        <div className="flex flex-col justify-start items-center mx-auto p-20">
          <p className="text-2xl text-slate-200 font-bold p-3">ブログ新規作成 🚀</p>
          <button onClick={handleBack} className="p-2 mr-auto transition font-semibold shadow-xl bg-gray-200 rounded-lg md:hover:scale-105">
            戻る
          </button>
          <form onSubmit={handleSubmit}>
            <input
              ref={titleRef}
              placeholder="タイトルを入力"
              type="text"
              className="rounded-md px-4 w-full py-2 my-2"
            />
            <textarea
              ref={descriptionRef}
              placeholder="記事詳細を入力"
              className="rounded-md px-4 py-2 h-32 w-full my-2"
            ></textarea>
            <button className="transition w-full font-semibold px-4 py-2 shadow-xl bg-green-300 rounded-lg md:hover:bg-slate-100 md:hover:scale-105">
              投稿
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default PostBlog