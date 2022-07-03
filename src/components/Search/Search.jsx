import { Form, Button } from "react-bootstrap";
import "./Search.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getNamesAllProducts } from "../../controllers/Productos"
import Autosuggest from "react-autosuggest";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

/**
 * Component that is a search bar that uses the Autosuggest component from react-autosuggest.
 */
export const Search = ({toggleMenu}) => {
  const navigate = useNavigate();
  const [options, setOptions] = useState([]);
  const [optionsValue, setOptionsValue] = useState([]);
  const [value, setValue] = useState("");
  const [optionSelected, setOptionSelected] = useState({});

  const onSuggestionsFetchRequested = ({ value }) => {
    setOptionsValue(filterOptions(value));
  };

  const filterOptions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    var filtered = options.filter((option) => {
      var completeText = option.nombre;

      if (
        completeText
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(inputValue)
      ) {
        return option;
      }
    });

    return inputLength === 0 ? [] : filtered;
  };

  const onSuggestionsClearRequested = () => {
    setOptionsValue([]);
  };

  const getSuggestionValue = (suggestion) => {
    return `${suggestion.nombre}`;
  };

  const renderSuggestion = (suggestion) => {
    if (value.length >= 2) {
      return (
        <div
          className="sugerencia dropdown"
          id={`offcanvasNavbarDropdown-expand-xl`}

          onClick={() => selectOptionValue(suggestion)}
        >
          {`${suggestion.nombre}`}
        </div>
      )
    } else {
    }
  };

  const selectOptionValue = (nombre) => {
    setOptionSelected(nombre);
  };

  const onChange = (e, { newValue }) => {
    setValue(newValue);
  };

  const inputProps = {
    placeholder: "Buscar productos",
    type: "search",
    className: "me-2 ms-3 search-bar",
    "aria-label": "Search",
    value,
    onChange
  };

  const eventEnter = (e) => {
    if (e.key === "Enter") {
      var split = e.target.value.split("-");
      var nombre = {
        nombre: split[0].trim(),
      };
      selectOptionValue(nombre);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/tienda?search=" + value)
  };

  useEffect(() => {
    getNamesAllProducts().then((response) => {
      setOptionsValue(response)
      setOptions(response)
    })
  }, []);

  return (
    <>
      <Form className="my-2 d-inline-flex align-items-center justify-content-center" onSubmit={handleSubmit}>
        <Autosuggest
          suggestions={optionsValue}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          onSuggestionSelected={eventEnter}
        />
        <br />
        <Button
          type="submit" className="nav-btn" variant="outline-cyan" onClick={toggleMenu}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Button>
      </Form>
    </>
  );
};
