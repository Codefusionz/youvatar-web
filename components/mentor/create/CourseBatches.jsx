import DatePicker from '@/components/DatePicker'
import SelectDropdown from '@/components/SelectDropdown'
import TextInput from '@/components/TextInput'
import { TrashIcon } from '@heroicons/react/24/outline'
import moment from 'moment'
import { useEffect } from 'react'

export default function CourseBatches({ form, setForm }) {
  const classDurationOptions = [
    { label: '30 minutes', value: 30 },
    { label: '45 minutes', value: 45 },
    { label: '60 minutes', value: 60 },
    { label: '75 minutes', value: 75 },
    { label: '90 minutes', value: 90 },
    { label: '120 minutes', value: 120 },
  ]

  const getTimeSlots = (classDuration) => {
    const timeSlots = []
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 60; j += classDuration.value) {
        let hour = i < 10 ? `0${i}` : i
        const minute = j < 10 ? `0${j}` : j
        const suffix = hour < 12 ? 'AM' : 'PM'
        hour = hour % 12 === 0 ? 12 : hour % 12
        timeSlots.push({
          label: `${hour}:${minute} ${suffix}`,
          value: `${hour}:${minute} ${suffix}`,
        })
      }
    }
    return timeSlots
  }

  const weekDayOptions = [
    { label: 'Monday', value: 'Monday' },
    { label: 'Tuesday', value: 'Tuesday' },
    { label: 'Wednesday', value: 'Wednesday' },
    { label: 'Thursday', value: 'Thursday' },
    { label: 'Friday', value: 'Friday' },
    { label: 'Saturday', value: 'Saturday' },
    { label: 'Sunday', value: 'Sunday' },
  ]

  const updateBatch = (index, key, value) => {
    const newBatches = form.batches.map((batch, i) => {
      if (i === index) {
        return { ...batch, [key]: value }
      }
      return batch
    })
    setForm({ ...form, batches: newBatches })
  }

  const createNewBatch = () => {
    setForm({
      ...form,
      batches: [
        ...form.batches,
        {
          timeSlot: '',
          numberOfStudents: '',
        },
      ],
    })
  }

  const resetAllBatchTimeSlots = (classDuration) => {
    const newBatches = form.batches.map((batch) => {
      return { ...batch, timeSlot: '' }
    })
    setForm({ ...form, classDuration: classDuration, batches: newBatches })
  }

  const deleteBatch = (index) => {
    if (form.batches.length === 1) return
    const newBatches = form.batches.filter((batch, i) => i !== index)
    setForm({
      ...form,
      batches: newBatches,
    })
  }

  useEffect(() => {
    if (form.batches.length === 0) createNewBatch()
  }, [])

  return (
    <div className="mt-4">
      <span>Organise your batches</span>
      <div className="mt-4 border border-gray-300 rounded-md p-4">
        <span className="font-semibold">Configure your batch</span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <SelectDropdown
            label="Class Duration"
            defaultOption="Select Class Duration"
            required
            value={form.classDuration}
            onChange={(e) => resetAllBatchTimeSlots(e)}
            options={classDurationOptions}
          />
          <SelectDropdown
            label="Week Off"
            defaultOption="Select week off"
            required
            multiple
            value={form.batchWeekOff}
            onChange={(e) => setForm({ ...form, batchWeekOff: e })}
            options={weekDayOptions}
          />
        </div>
        <div className="grid justify-between grid-cols-1 md:grid-cols-2 gap-2">
          <div className="mr-4 w-full">
            <DatePicker
              dateFormat="DD-MM-YYYY"
              label={'Application Close Date'}
              value={moment(form.applicationCloseDate).toDate()}
              onChange={(e) => setForm({ ...form, applicationCloseDate: e })}
            />
          </div>
          <div className="flex place-items-end w-full">
            <DatePicker
              dateFormat="DD-MM-YYYY"
              label={'Class Start Date'}
              value={moment(form.classStartDate).toDate()}
              onChange={(e) => setForm({ ...form, classStartDate: e })}
            />
          </div>
        </div>
      </div>
      {form.batches.map((batch, index) => (
        <div key={index} className="mt-4 border border-gray-300 rounded-md p-4">
          <div className="flex w-full items-center justify-between">
            <span className="font-semibold">Batch No: {index + 1}</span>
            <TrashIcon
              className="h-5 w-5 text-red-500 cursor-pointer"
              onClick={() => deleteBatch(index)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <SelectDropdown
              label="Select Time"
              defaultOption="Select Batch Timing"
              required
              value={batch.timeSlot}
              onChange={(e) => updateBatch(index, 'timeSlot', e)}
              options={getTimeSlots(form.classDuration)}
            />
            <TextInput
              label="No. of Students"
              type={'number'}
              value={batch.numberOfStudents}
              placeholder="Enter number of students"
              onChange={(e) => updateBatch(index, 'numberOfStudents', e)}
            />
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={createNewBatch}
        className="p-2 w-48 my-4 rounded-md font-semibold text-sm bg-primary text-white"
      >
        Add new batch
      </button>
    </div>
  )
}
