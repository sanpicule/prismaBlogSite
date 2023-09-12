import Link from 'next/link'
import { PostType } from '@/types/types'

async function getAllPosts() {
  const res = await fetch(`http://localhost:3001/api/blog`, {
    cache: "no-store" //SSR
  })

  const data = await res.json()
  return data.posts
}

export default async function Home() {
  const posts = await getAllPosts()
  return (
    <>
      <header className='h-screen'>
        <div className="bg-cover bg-center w-full m-auto p-4 h-screen bg-[url('https://images.unsplash.com/photo-1682687982298-c7514a167088?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')]">
          <span className='block w-full h-screen bg-black absolute top-0 left-0 opacity-50'></span>
          <h1 className="absolute top-1/2 text-xl md:text-8xl lg:text-16xl font-mono text-white">
            Full Stack Blog
          </h1>
        </div>
      </header>
      <main className="w-full h-full pb-20 bg-slate-900 px-10 md:px-20">
        {/* Link */}
        <div className="flex">
          <Link
            href={"/blog/add"}
            className="transition text-center shadow-2xl rounded-md mt-10 p-4 ml-auto bg-green-300 font-semibold hover:shadow-none md:hover:bg-slate-200 md:active:scale-95"
          >
            ブログ新規作成
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-12 lg:gap-24 mt-20 bg-slate-900 ">
          {posts.map((post: PostType) => (
            <Link
              key={post.id}
              className="transition mx-auto w-full p-4 rounded-md my-2 bg-slate-900 border border-slate-500 flex flex-col justify-center cursor-pointer text-white md:hover:scale-110 md:hover:bg-slate-200 md:hover:text-black"
              href={`/blog/edit/${post.id}`}
            >
              <div className="flex my-3">
                <div className="mr-auto">
                  <h2 className="mr-auto font-semibold">{post.title}</h2>
                </div>
              </div>

              <div className="mr-auto my-1">
                <blockquote className="font-bold text-slate-400">{new Date(post.date).toDateString()}</blockquote>
              </div>

              <div className="mr-auto my-1">
                <h2>{post.description}</h2>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}
