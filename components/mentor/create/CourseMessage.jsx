import TextInput from '@/components/TextInput'

export default function CourseMessage({ form, setForm }) {
  return (
    <div className="mt-6 flex flex-col gap-4">
      <TextInput
        label="Welcome Message"
        type="textarea"
        value={form.welcomeMessage}
        placeholder="Welcome to the course!"
        onChange={(e) => setForm({ ...form, welcomeMessage: e })}
      />
      <TextInput
        label="Congragulations Message"
        type="textarea"
        value={form.congratulationsMessage}
        placeholder="Congratulations on completing the course!"
        onChange={(e) => setForm({ ...form, congratulationsMessage: e })}
      />
    </div>
  )
}
