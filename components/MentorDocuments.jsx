import Dropzone from './Dropzone'

export default function MentorDocuments({ form, setForm }) {
  return (
    <div>
      <h1 className="text-primary font-extrabold text-3xl text-left w-full">
        You are almost there <br />
        Upload your documents
      </h1>
      <Dropzone
        label="Upload PAN Card"
        onPicked={(e) => setForm({ ...form, mentorPanCard: e })}
        value={form.mentorPanCard}
      />
      <Dropzone
        label="Upload Your Video"
        onPicked={(e) => setForm({ ...form, mentorVideo: e })}
        value={form.mentorVideo}
      />
    </div>
  )
}
