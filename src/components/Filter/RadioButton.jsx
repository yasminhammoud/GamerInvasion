/**
 * Component that takes a value as a prop and returns a radio button with that value as the label.
 */
// DEPRECATED 
const RadioButton = (props) => {

  return (
    <>
      <div class="form-check">
        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value={props.value} />
        <label className="form-check-label" htmlFor="flexRadioDefault1" style={{ textTransform: "capitalize" }}>
          {props.value}
        </label>
      </div>
    </>
  );
};

export default RadioButton;
