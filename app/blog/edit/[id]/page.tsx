'use client'

import { PostType } from '@/types/types'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'

const editBlog = async (
  title: string | undefined,
  description: string | undefined,
  id: number
) => {
  const res = await fetch(`http://localhost:3001/api/blog/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title, description, id }),
    headers: {
      "Content-type": "application/json"
    }
  })

  return res.json()
}
const deleteBlog = async (
  id: number
) => {
  const res = await fetch(`http://localhost:3001/api/blog/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json"
    }
  })

  return res.json()
}

const getBlogById = async (
  id: number
) => {
  const res = await fetch(`http://localhost:3001/api/blog/${id}`)
  const data = await res.json()
  return data.post
}


const EditPage = ({params}: {params: {id: number}}) => {
  const router = useRouter()
  const titleRef = useRef<HTMLInputElement | null>(null)
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    toast.promise(
      editBlog(titleRef.current?.value, descriptionRef.current?.value, params.id),
       {
         loading: '編集中...',
         success: <b>編集に成功しました</b>,
         error: <b>失敗しました</b>,
       }
     ).then(() => {
       router.push('/')
       router.refresh()
     })
  }

  const handleDelete = () => {
    toast.promise(
      deleteBlog(params.id),
       {
         loading: '削除中...',
         success: <b>削除しました</b>,
         error: <b>失敗しました</b>,
       }
     ).then(() => {
       router.push('/')
       router.refresh()
     })
  }

  useEffect(() => {
    getBlogById(params.id).then((data) => {
      titleRef.current!.value = data.title
      descriptionRef.current!.value = data.description
    }).catch(err => {
      toast.error("エラーが発生しました", err)
    })
  }, [])

  const handleBack = () => {
    router.push('/')
  }

  return (
    <>
      <Toaster />
      <div className="w-full h-screen m-auto flex bg-slate-900">
        <div className="flex flex-col justify-start items-center mx-auto p-20">
          <p className="text-2xl text-slate-200 font-bold p-3">ブログの編集 🚀</p>
            <div className='w-full flex justify-between'>
              <button onClick={handleBack} className="transition ml-2 font-semibold px-4 py-2 shadow-xl bg-gray-200 rounded-lg m-auto md:hover:scale-105">
                戻る
              </button>
            </div>
          <form onSubmit={handleSubmit}>
            <input
              ref={titleRef}
              placeholder="タイトルを入力"
              type="text"
              className="rounded-md px-4 w-full py-2 my-2 mt-8"
            />
            <textarea
              ref={descriptionRef}
              placeholder="記事詳細を入力"
              className="rounded-md px-4 py-2 h-32 w-full my-2"
            ></textarea>
            <div className='w-full flex flex-col'>
              <button type='submit' className="w-full transition font-semibold px-4 py-2 shadow-xl bg-blue-400 rounded-lg md:hover:bg-slate-100 md:hover:scale-105">
                更新
              </button>
              <button onClick={handleDelete} className="transition font-semibold px-4 py-2 shadow-xl bg-red-400 rounded-lg mt-2 md:hover:bg-slate-100 md:hover:scale-105">
                削除
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default EditPage