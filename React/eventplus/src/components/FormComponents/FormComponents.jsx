import React from "react";
import "./FormComponents.css";

export const Input = ({
  type,
  id,
  value,
  required,
  additionalClass,
  name,
  placeholder,
  manipulationFunction,
}) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      required={required}
      className={`input-component ${additionalClass}`}
      placeholder={placeholder}
      onChange={manipulationFunction}
      autoComplete="off"
    />
  );
};

export const Button = ({
  textButton,
  id,
  name,
  type,
  additionalClass = "",
  manipulationFunction,
}) => {
  return (
    <button
      type={type}
      name={name}
      id={id}
      className={`button-component ${additionalClass}`}
      onClick={manipulationFunction}
    >
      {textButton}
    </button>
  );
};

export const Select = ({ 
    dados = [
        { value: "b5c2359e-782b-48b5-b1db-04acc0464107", text: "C#" },
        { value: "ce5882cf-5d04-45f3-a4e6-216297781b1e", text: "HTML" },
        { value: "55f3ad5d-6d42-47e4-b249-290d05743ff3", text: "CSS" },
        { value: "a1fdc28b-496f-4d99-808c-c7095649bf56", text: "Java Script" },
    ],
    id,
    name,
    require,
    additionalClass = "",
    manipulationFunction,
    defaultValue,

}) => {
  return (
    <select 
        id={id}
        name={name}
        required={require}
        className={`input-component ${additionalClass}`}
        onChange={manipulationFunction}
        value={defaultValue}
    >

      <option value="">Selecione</option>
      {dados.map((e) => {
        return (
          <option key={e.value} value={e.value}>
            {e.text}
          </option>
        );
      })}
    </select>
  );
};
