import {
  HAVE_MATERIAL_TO_TEACH_OPTIONS,
  IDENTIFY_YOURSELF_OPTIONS,
  LANGUAGE_OPTIONS,
  ONLINE_TEACHER_OPTIONS,
  YEARS_OF_EXPERIENCE_OPTIONS,
} from '@/utils/constants'
import SelectDropdown from './SelectDropdown'

export default function MentorDetails({ form, setForm }) {
  return (
    <div>
      <h1 className="text-primary font-extrabold text-3xl text-left w-full">
        Fill up your details
      </h1>
      <SelectDropdown
        label="In what language do you teach?"
        options={LANGUAGE_OPTIONS}
        defaultOption="Select an option"
        onChange={(value) => setForm({ ...form, mentorLanguage: value })}
        value={form.mentorLanguage}
        required
      />
      <SelectDropdown
        label="How do you identify yourself?"
        options={IDENTIFY_YOURSELF_OPTIONS}
        defaultOption="Select an option"
        onChange={(value) => setForm({ ...form, mentorIdentity: value })}
        value={form.mentorIdentity}
        required
      />
      <SelectDropdown
        label="Are you already teaching online?"
        options={ONLINE_TEACHER_OPTIONS}
        defaultOption="Select an option"
        onChange={(value) => setForm({ ...form, mentorIsTeacher: value })}
        value={form.mentorIsTeacher}
        required
      />
      <SelectDropdown
        label="How many years of experience do you have in teaching?"
        options={YEARS_OF_EXPERIENCE_OPTIONS}
        defaultOption="Select an option"
        onChange={(value) => setForm({ ...form, mentorExperience: value })}
        value={form.mentorExperience}
        required
      />
      <SelectDropdown
        label="Do you have material or document to teach?"
        options={HAVE_MATERIAL_TO_TEACH_OPTIONS}
        defaultOption="Select an option"
        onChange={(value) => setForm({ ...form, mentorHaveDocuments: value })}
        value={form.mentorHaveDocuments}
        required
      />
    </div>
  )
}
