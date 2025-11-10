export default function Table({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-xl shadow overflow-hidden ${className}`}>
      <table className="w-full">{children}</table>
    </div>
  )
}