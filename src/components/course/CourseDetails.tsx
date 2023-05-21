import Dropzone from '@/components/Dropzone'
import Select from '@/components/Select'
import TextInput from '@/components/TextInput'
import {
  courseCategoryOptions,
  courseLanguageOptions,
  courseLevelOptions,
} from '@/utils/constants'
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form'

type CourseDetailsProps = {
  register: UseFormRegister<any>
  control: Control<any>
  errors: FieldErrors<any>
}

export default function CourseDetails(props: CourseDetailsProps) {
  return (
    <div>
      <TextInput
        label="Couse Title"
        placeholder="Couse Title"
        type="text"
        error={props.errors.title?.message?.toString()}
        rest={{
          ...props.register('title', {
            required: {
              value: true,
              message: 'Title is required',
            },
          }),
        }}
      />
      <TextInput
        label="Couse Subtitle"
        placeholder="Couse Subtitle"
        type="text"
        error={props.errors.title?.message?.toString()}
        rest={{
          ...props.register('subTitle', {
            required: {
              value: true,
              message: 'Sub Title is required',
            },
          }),
        }}
      />
      <TextInput
        label="Couse Description"
        placeholder="My Awesome Course"
        type="textarea"
        error={props.errors.description?.message?.toString()}
        rest={{
          ...props.register('description', {
            required: {
              value: true,
              message: 'Description is required',
            },
          }),
        }}
      />
      <div className="flex flex-col justify-between gap-2 md:flex-row">
        <Select
          label="Language"
          error={props.errors.language?.message?.toString()}
          options={courseLanguageOptions}
          placeholder="Choose language"
          control={props.control}
          name="language"
        />
        <Select
          label="Level"
          options={courseLevelOptions}
          placeholder="Choose level"
          control={props.control}
          name="level"
          error={props.errors.level?.message?.toString()}
        />
        <Select
          label="Category"
          options={courseCategoryOptions}
          placeholder="Choose category"
          control={props.control}
          name="category"
          error={props.errors.category?.message?.toString()}
        />
      </div>
      <Dropzone
        label="Course Introduction File"
        accept="video/mp4, video/mkv"
        control={props.control}
        name="introFile"
        error={props.errors.introFile?.message?.toString()}
      />
      <Dropzone
        label="Course Thumnbail"
        accept="image/png, image/jpeg"
        control={props.control}
        name="thumbnail"
        error={props.errors.thumbnail?.message?.toString()}
      />
    </div>
  )
}
