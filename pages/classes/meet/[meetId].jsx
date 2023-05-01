import Spinner from '@/components/Spinner'
import axios from 'axios'
import moment from 'moment'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const JitsiMeeting = dynamic(
  () => import('@jitsi/react-sdk').then(({ JitsiMeeting }) => JitsiMeeting),
  {
    ssr: false,
  }
)

function Meet() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState('')
  const [token, setToken] = useState('')
  const user = useSelector((state) => state.user.data)
  const [externalApi, setExternalApi] = useState(null)
  const [lectureEndTime, setLectureEndTime] = useState(null)
  const [participants, setParticipants] = useState([])

  const meetId = router.query.meetId
  const lecture = router.query.lecture

  const fetchInvitees = async () => {
    try {
      const response = await axios.get(
        `/api/meets/${meetId}/invitees?lecture=${lecture}`
      )
      setTitle(response.data?.title)
      setToken(response.data?.token)
      setLectureEndTime(response.data?.lectureEndTime)
    } catch (error) {
      console.log(error)
      router.replace('/')
    }
    setLoading(false)
  }

  useEffect(() => {
    if (!externalApi || !lectureEndTime) return

    const future = moment(lectureEndTime)
    const now = moment()
    const diffInSeconds = future.diff(now, 'seconds')

    const disposeTimeoutId = setTimeout(() => {
      externalApi.dispose()
      router.replace('/')
    }, diffInSeconds * 1000)

    return () => clearTimeout(disposeTimeoutId)
  }, [externalApi, lectureEndTime])

  useEffect(() => {
    if (!router.query.meetId) return
    fetchInvitees()
  }, [meetId])

  useEffect(() => {
    if (!externalApi) return
  }, [participants])

  if (!meetId || loading || !user)
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Spinner height={50} width={50} color="#3949ab" />
      </div>
    )

  return (
    <JitsiMeeting
      roomName={lecture}
      jwt={token}
      domain="meet.youvatar.in"
      configOverwrite={{
        enableEmailInStats: true,
        disableProfile: true,
        hiddenPremeetingButtons: ['invite'],
        subject: title,
      }}
      onReadyToClose={() => router.replace('/')}
      onApiReady={(externalApi) => {
        setExternalApi(externalApi)
        externalApi.on('participantRoleChanged', (e) => {
          if (e.role === 'moderator' && token) {
            externalApi.startRecording({ mode: 'file' })
          }
        })
      }}
      userInfo={{
        displayName: user.username,
      }}
      getIFrameRef={(iframeRef) => {
        iframeRef.style.height = '100vh'
      }}
    />
  )
}

export default Meet
Meet.auth = true
