import HomeNavigation from '@/components/HomeNavigation'
import ResizableTextArea from '@/components/ResizableTextArea'
import { S3_PREFIX } from '@/utils/constants'
import { getTimeElapsedString } from '@/utils/helpers'
import {
  ArrowRightIcon,
  BookmarkIcon,
  ChatBubbleOvalLeftIcon,
  EllipsisVerticalIcon,
  HeartIcon,
  PaperAirplaneIcon,
  ShareIcon,
} from '@heroicons/react/24/outline'
import {
  BellAlertIcon,
  HeartIcon as HeartIconSolid,
} from '@heroicons/react/24/solid'

import axios from 'axios'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function Home() {
  const user = useSelector((state) => state.user.data)
  const [profilePhoto, setProfilePhoto] = useState([
    {
      image: '/png/photo-1.png',
    },
    {
      image: '/png/photo-2.jpg',
    },
    {
      image: '/png/photo-3.jpg',
    },
    {
      image: '/png/photo-4.jpg',
    },
    {
      image: '/png/photo-5.jpg',
    },
    {
      image: '/png/photo-6.jpg',
    },
    {
      image: '/png/photo-7.jpg',
    },
  ])
  const [postData, setPostData] = useState([])
  const [newComments, setNewComments] = useState({})
  const router = useRouter()
  const [matchProfileData, setMatchProfileData] = useState([
    {
      name: '_Suhana_singh',
      short_title: 'Suhana singh',
      profile_photo: '/png/photo-1.png',
    },
    {
      name: '_John_smith',
      short_title: 'John Smith',
      profile_photo: '/png/photo-2.jpg',
    },
    {
      name: '_Mr_johnson',
      short_title: 'Mr JOHNSON',
      profile_photo: '/png/photo-3.jpg',
    },
    {
      name: '_Md_williams',
      short_title: 'Md WILLIAMS',
      profile_photo: '/png/photo-4.jpg',
    },
    {
      name: '_Thompson_ali',
      short_title: 'Thompson ali',
      profile_photo: '/png/photo-5.jpg',
    },
  ])
  const { courseData } = useSelector((state) => state.cart)

  const userLikedPost = (likes) => {
    if (user === undefined || likes == undefined) return true
    // console.log(user, likes)
    for (var i = 0; i < likes?.length; i++) {
      // console.log(likes[i].userId === user.id)
      if (likes[i]?.userId === user?.id) return true
    }
    return false
  }

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/posts')
      setPostData(
        response.data.data.map((post) => ({
          ...post,
          userLiked: userLikedPost(post.likes),
        }))
      )
      const emptyComments = {}
      response.data.data.map((post) => (emptyComments[post.id] = ''))
      setNewComments(emptyComments)
      // console.log(user)
    } catch (error) {
      console.log(error)
    }
  }

  const addComment = async (postId, content) => {
    try {
      const response = await axios.post('/api/posts/comment', {
        postId,
        content,
      })
      console.log('adding comment', response.data)
      fetchData()
    } catch (error) {
      console.log(error)
    }
  }

  const likePost = async (postId) => {
    // console.log({ postId })
    try {
      const response = await axios.post('/api/posts/like', {
        postId,
      })
      console.log('adding like', response.data)
      await fetchData()
    } catch (error) {
      console.log(error)
    }
  }

  const unlikePost = async (postId) => {
    try {
      const response = await axios.delete(`/api/posts/like?id=${postId}`)
      console.log('deleting like', response.data)
      await fetchData()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // useEffect(() => console.log(postData), [postData])

  return (
    <div className="flex">
      <HomeNavigation courseData={courseData.length} />
      <div className="w-full px-5 flex flex-wrap justify-between">
        <div className="flex md:hidden flex-row items-center w-full p-2 justify-between">
          <span className="text-4xl font-extrabold text-primary">Youvatar</span>
          <div className="flex items-center gap-2">
            <BellAlertIcon className="w-7 h-7 text-primary" />
            <Link
              href="/messages"
              className={clsx(
                'flex flex-row gap-4 items-center cursor-pointer text-gray-800 p-2 rounded-md',
                router.pathname === '/messages' && 'text-primary font-bold'
              )}
            >
              <PaperAirplaneIcon className="w-7 h-7" />
            </Link>
          </div>
        </div>
        <div className="w-screen pb-4 border-b md:border-b-0 border-b-gray-200 max-w-xl flex gap-2 justify-start items-center overflow-x-auto scrollbar-corner-rounded-full scrollbar-track-rounded scrollbar-none md:scrollbar-thin scrollbar-thumb-gray-200 mx-auto">
          {profilePhoto.map((profileImage, i) => (
            <img
              key={i}
              src={profileImage.image}
              className="aspect-square h-20 border p-0.5 border-primary rounded-full"
            />
          ))}
        </div>
        <div className="w-1/3 py-10 lg:flex flex-wrap items-center justify-center xl:justify-between px-4 2xl:px-8 hidden">
          <div className="flex gap-1 pr-5">
            <img
              src="/png/photo-1.png"
              alt=""
              className="w-16 h-16 border-none rounded-full"
            />
            <div className="flex flex-col justify-center items-center">
              <h3 className="text-base font-semibold text-black">
                _Suhana_singh
              </h3>
              <p className="text-black text-opacity-60">Suhana Singh</p>
            </div>
          </div>
          <div>
            <p className="text-indigo-700 text-sm font-medium">Search</p>
          </div>
        </div>

        <div className="w-full flex justify-end">
          <div className="w-full lg:w-2/3 flex flex-col justify-center items-center">
            {postData.map((post, i) => (
              <div key={i} className="w-full sm:max-w-lg py-5">
                <div className="flex flex-wrap justify-between">
                  <div className="flex flex-wrap items-center gap-6">
                    <img
                      src={S3_PREFIX + post.author.image}
                      alt=""
                      className="w-14 h-14 border-none rounded-full"
                    />
                    <div className="flex gap-3 items-center">
                      <h2 className="text-base font-semibold text-black">
                        {post.author.username}
                      </h2>
                      <div className="flex justify-center items-center h-16">
                        <div className="h-1 w-1 rounded-full bg-gray-400"></div>
                      </div>

                      <p className="text-lg text-gray-600 font-semibold">
                        {getTimeElapsedString(post.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
                    <EllipsisVerticalIcon className="w-6 h-6" />
                  </div>
                </div>
                <div className="py-3 relative">
                  <img
                    src={S3_PREFIX + post.image}
                    className="w-full max-h-450 rounded-32"
                  />
                  {post.courseId && (
                    <div className="absolute bottom-3 rounded-b-32 h-12 p-2 px-4 bg-gray-300 w-full flex justify-between items-center">
                      <p>Learn More</p>
                      <ArrowRightIcon className="w-6 h-6 cursor-pointer" />
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between my-1">
                  <div className="flex gap-4 items-center">
                    {post.userLiked ? (
                      <HeartIconSolid
                        className="h-6 w-6 text-red-500"
                        onClick={() => {
                          setPostData((prev) =>
                            prev.map((curPost) => {
                              if (curPost.id === post.id)
                                return { ...curPost, userLiked: false }
                              return curPost
                            })
                          )
                          unlikePost(post.id)
                        }}
                      />
                    ) : (
                      <HeartIcon
                        className="h-6 w-6"
                        onClick={() => {
                          setPostData((prev) =>
                            prev.map((curPost) => {
                              if (curPost.id === post.id)
                                return { ...curPost, userLiked: true }
                              return curPost
                            })
                          )
                          likePost(post.id)
                        }}
                      />
                    )}
                    <ChatBubbleOvalLeftIcon className="h-6 w-6" />
                    <ShareIcon className="h-6 w-6" />
                  </div>
                  <BookmarkIcon className="h-6 w-6" />
                </div>
                <div className="flex flex-col gap-3 py-3">
                  <p className="text-black text-sm font-semibold">
                    {post.likes.length} likes
                  </p>
                  <p className="text-base text-gray-400">
                    <span className="font-semibold text-black inline-block">
                      {post.author.username} |
                    </span>
                    {' ' + post.content}
                  </p>
                  <p className="text-sm font-semibold text-black opacity-60">
                    {post.comments.length > 0
                      ? `View all ${post.comments.length} comments`
                      : 'No comments'}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-3 items-center w-full mr-2">
                    <div className="w-8 h-8  border-2 border-primary border-solid rounded-full flex justify-center items-center">
                      <img
                        src="/png/photo-1.png"
                        alt=""
                        className="w-7 h-7 border-none rounded-full"
                      />
                    </div>
                    {/* <p className="text-sm text-black">Add a comments</p> */}
                    <div className="w-full shadow-sm flex items-center rounded-lg">
                      <ResizableTextArea
                        value={newComments[post.id]}
                        placeholder="Enter your comment..."
                        onChange={(e) =>
                          setNewComments((prev) => ({
                            ...prev,
                            [post.id]: e.target.value,
                          }))
                        }
                        onSubmit={() => {
                          addComment(post.id, newComments[post.id])
                        }}
                      />
                    </div>
                  </div>
                  <p className="text-primary font-sm font-semibold">Post</p>
                </div>
              </div>
            ))}
          </div>

          <div className="w-1/3 px-4 2xl:px-16 hidden lg:flex flex-col">
            <div className="flex justify-center items-center lg:justify-between py-10">
              <p className="text-gray-400 font-semibold text-xl">
                Justify For You
              </p>
              <p className="text-sm text-gray-600 font-semibold">See all</p>
            </div>
            <div className="flex flex-col gap-5">
              {matchProfileData.map((profile, i) => (
                <div
                  key={i}
                  className="flex flex-wrap gap-1 items-center justify-center xl:justify-between"
                >
                  <div className="flex gap-4 pr-5">
                    <img
                      src={profile.profile_photo}
                      alt=""
                      className="w-14 h-14 border-none rounded-full"
                    />
                    <div className="flex flex-col justify-center items-center">
                      <h3 className="text-base font-semibold text-black">
                        {profile.name}
                      </h3>
                      <p className="text-black text-opacity-60">
                        {profile.short_title}
                      </p>
                    </div>
                  </div>
                  <h3 className="text-primary text-sm font-semibold">Follow</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Home.auth = true
