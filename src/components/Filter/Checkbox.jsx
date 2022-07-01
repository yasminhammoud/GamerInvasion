
/**
 * Component that takes value of props and returns a checkbox button used to filter products
 */
export const Checkbox = ({ id, title, name, handleChange, checked }) => {
  return (
    <div className="form-check">
      <input
        id={id}
        className="form-check-input"
        type="checkbox"
        name={name}
        onChange={handleChange}
        checked={checked}
      />
      <label className="form-check-label" htmlFor={id}>{title}</label>
    </div>
  )
}
