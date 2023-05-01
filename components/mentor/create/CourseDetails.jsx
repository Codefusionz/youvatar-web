import Dropzone from '@/components/Dropzone'
import SelectDropdown from '@/components/SelectDropdown'
import TextInput from '@/components/TextInput'
import {
  courseCategoryOptions,
  courseLanguageOptions,
  courseLevelOptions,
} from '@/utils/constants'

export default function CourseDetails({ form, setForm }) {
  return (
    <div>
      <TextInput
        label="Couse Title"
        placeholder="Couse Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e })}
      />
      <TextInput
        label="Couse Subtitle"
        placeholder="Couse Subtitle"
        value={form.subTitle}
        onChange={(e) => setForm({ ...form, subTitle: e })}
      />
      <TextInput
        label="Couse Description"
        placeholder="My Awesome Course"
        type="textarea"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e })}
      />
      <div className="flex flex-col justify-between gap-2 md:flex-row">
        <SelectDropdown
          defaultOption="Course Language"
          label="Language"
          required
          options={courseLanguageOptions}
          value={form.courseLanguage}
          onChange={(e) => setForm({ ...form, courseLanguage: e })}
        />
        <SelectDropdown
          defaultOption="Course Level"
          label="Level"
          required
          options={courseLevelOptions}
          value={form.courseLevel}
          onChange={(e) => setForm({ ...form, courseLevel: e })}
        />
        <SelectDropdown
          defaultOption="Course Category"
          label="Category"
          required
          options={courseCategoryOptions}
          value={form.courseCategory}
          onChange={(e) => setForm({ ...form, courseCategory: e })}
        />
      </div>
      <Dropzone
        label="Course Introduction File"
        value={form.courseIntroFile}
        onPicked={(e) => {
          setForm({ ...form, courseIntroFile: e })
        }}
      />
      <Dropzone
        label="Course Thumnbail"
        value={form.courseThumbnail}
        onPicked={(e) => {
          setForm({ ...form, courseThumbnail: e })
        }}
      />
    </div>
  )
}
