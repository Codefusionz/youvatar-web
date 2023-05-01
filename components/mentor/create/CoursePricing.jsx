import TextInput from '@/components/TextInput'

export default function CoursePricing({ form, setForm }) {
  const priceOptions = [
    { label: 'Free', value: 'free' },
    { label: 'Paid', value: 'paid' },
  ]

  return (
    <div className="mt-6">
      <TextInput
        label="Course Price"
        placeholder="1000"
        value={form.price}
        type="number"
        onChange={(e) => setForm({ ...form, price: e })}
      />
    </div>
  )
}
