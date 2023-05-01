import { NICHE_OPTIONS } from '@/utils/constants'
import SelectDropdown from './SelectDropdown'
import TextInput from './TextInput'

export default function MentorOnboard({ form, setForm }) {
  return (
    <div>
      <h1 className="text-primary font-extrabold text-3xl text-left w-full">
        Lets get you setup
      </h1>
      <h3 className="text-left w-full text-gray-700 mt-4">
        You can update the information later as well
      </h3>
      <TextInput
        label="School Name"
        placeholder="Enter School Name"
        value={form.schoolName}
        type="text"
        onChange={(value) => setForm({ ...form, schoolName: value })}
      />
      <TextInput
        label="School's Motive"
        placeholder="Enter School's Motive"
        value={form.schoolMotive}
        type="text"
        onChange={(value) => setForm({ ...form, schoolMotive: value })}
      />
      <SelectDropdown
        label="What's your niche?"
        placeholder="Enter School's Motive"
        options={NICHE_OPTIONS}
        onChange={(value) => setForm({ ...form, schoolNiche: value })}
        value={form.schoolNiche}
        defaultOption="Select Niche"
        required
      />
      <TextInput
        label="Describe about yourself and mention your education/qualifications"
        placeholder="Enter School's Motive"
        value={form.schoolDescription}
        type="textarea"
        onChange={(value) => setForm({ ...form, schoolDescription: value })}
      />
    </div>
  )
}
