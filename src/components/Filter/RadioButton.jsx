/**
 * Component that takes a value as a prop and returns a radio button with that value as the label.
 */
// DEPRECATED 
const RadioButton = (props) => {

  return (
    <>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value={props.value} />
        <label class="form-check-label" for="flexRadioDefault1" style={{ "text-transform": "capitalize" }}>
          {props.value}
        </label>
      </div>
    </>
  );
};

export default RadioButton;
