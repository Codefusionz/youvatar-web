import TextInput from './TextInput'

export default function MentorAddress({ form, setForm }) {
  return (
    <div>
      <h1 className="text-primary font-extrabold text-3xl text-left w-full">
        Fill Your Address
      </h1>
      <TextInput
        label="Address Line 1"
        placeholder="Enter Address Line"
        value={form.addressLine1}
        type="text"
        onChange={(value) => setForm({ ...form, addressLine1: value })}
      />
      <TextInput
        label="Address Line 2"
        placeholder="Enter Address Line 2"
        value={form.addressLine2}
        type="text"
        onChange={(value) => setForm({ ...form, addressLine2: value })}
      />
      <TextInput
        label="City"
        placeholder="Enter City"
        value={form.city}
        type="text"
        onChange={(value) => setForm({ ...form, city: value })}
      />
      <TextInput
        label="State"
        placeholder="Enter State"
        value={form.state}
        type="text"
        onChange={(value) => setForm({ ...form, state: value })}
      />
      <TextInput
        label="Pincode"
        placeholder="Enter Pincode"
        value={form.postalCode}
        type="number"
        onChange={(value) => setForm({ ...form, postalCode: value })}
      />
    </div>
  )
}
