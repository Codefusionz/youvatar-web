import MentorNavbar from '@/components/mentor/MentorNavbar'
import Spinner from '@/components/Spinner'
import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'

const localizer = momentLocalizer(moment)

const IconStyle = {
  cursor: 'pointer',
}

const TooltipContent = ({ onClose, event }) => {
  console.log(event)
  return (
    <React.Fragment>
      <div>{event.title}</div>
      <div>Some other Info</div>
      <strong>Holy guacamole!</strong> Check this info.
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button style={{ backgroundColor: 'lightgray', border: 'none' }}>
          Button 1
        </button>
        <button style={{ backgroundColor: 'lightgray', border: 'none' }}>
          Button 2
        </button>
      </div>
      <div style={{ textAlign: 'right', marginTop: '10px' }}>
        <button
          style={{ backgroundColor: 'lightgray', border: 'none' }}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </React.Fragment>
  )
}

function Event(event) {
  const [showTooltip, setShowTooltip] = useState(false)

  const closeTooltip = () => {
    setShowTooltip(false)
  }

  const openTooltip = () => {
    setShowTooltip(true)
  }
  const ref = useRef(null)

  const getTarget = () => {
    return ReactDOM.findDOMNode(ref.current)
  }

  return (
    <div ref={ref}>
      <span onMouseOver={openTooltip}>{event.title}</span>
      {showTooltip && (
        <div
          style={{
            position: 'absolute',
            top: '-10px',
            left: '110%',
            backgroundColor: 'white',
            padding: '10px',
            border: '1px solid black',
            borderRadius: '5px',
            zIndex: 1000,
          }}
        >
          <TooltipContent event={event} onClose={closeTooltip} />
        </div>
      )}
    </div>
  )
}

export default function MentorDashboardCalender() {
  const [reminders, setReminders] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchReminders = async (date, endData) => {
    try {
      const response = await axios.get(
        `/api/mentor/reminders?date=${date}&end=${endData}`
      )
      const events = response.data.data.map((reminder) => {
        const start = moment(
          `${reminder.date.slice(0, 10)} ${reminder.time}`,
          'YYYY-MM-DD h:mm A'
        )
        const end = moment(start).add(reminder.duration, 'minutes')

        return {
          ...reminder,
          start: start.toDate(),
          end: end.toDate(),
          title: reminder.title,
          time: reminder.time,
        }
      })
      setReminders(events)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  const handleSelectEvent = (event) => {
    console.log(event)
    // setSelectedEvent(event)
  }

  useEffect(() => {
    const startOfMonth = moment().startOf('month').format('YYYY-MM-DD')
    const endOfMonth = moment().endOf('month').format('YYYY-MM-DD')
    fetchReminders(startOfMonth, endOfMonth)
  }, [])

  if (loading)
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Spinner height={50} width={50} color="#3949ab" />
      </div>
    )

  return (
    <div className="h-screen">
      <MentorNavbar />
      <div className="p-8 rounded-md h-full">
        <Calendar
          toolbar={true}
          localizer={localizer}
          events={reminders}
          startAccessor="start"
          endAccessor="end"
          selectable={true}
        />
      </div>
    </div>
  )
}
