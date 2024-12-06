export default function CardSuccess({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-6 border rounded-lg px-4 py-2 my-10 border-green-500 text-green-500">
      <img src="/check.svg" alt="check" className="w-7" />
      <p>{count} records uploades successfully</p>
      <button className="bg-transparent p-0">X</button>
    </div>
  )
}
