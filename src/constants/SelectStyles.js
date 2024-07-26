export const SelectStyles = {
  container: (baseStyles, state) => ({
    ...baseStyles,
    border: 0,
    outline: 0,
    position : "relative"
  }),
  dropdownIndicator: (baseStyles, state) => ({
    ...baseStyles,
    color: "white",
    border: "none",
    outline: "none",
    "&:hover": {
      color: "white",
    },
  }),
  control: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: "#ffffff33",
    display: "flex",
    borderRadius: "0.75rem",
    padding: "0.2rem 0",
    backdropFilter: "blur(16px)",
    color: "#fff",
    border: 0,
    boxShadow: "none",
    outline: 0,
  }),
  input: (baseStyles, state) => ({
    ...baseStyles,
    color: "#fff",
    "&:focus": {
      padding: 0,
      margin: 0,
    },
  }),
  menu: (baseStyles, state) => ({
    ...baseStyles,
    color: "#fff",
    backgroundColor: "#ffffff33",
    maxHeight : "130px",
    overflowY : "auto",
    backdropFilter: "blur(16px)",
    position : "absolute",
    zIndex : 60

  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: state.isSelected ? "#ffffff33" : "transparent",
    "&:hover": {
      backgroundColor: "#ffffff33",
      backdropFilter: "blur(16px)",
    },
  }),
  singleValue: (baseStyles, state) => ({
    ...baseStyles,
    color: "white",
  }),
  multiValue : (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: "#ffffff33",
    backdropFilter: "blur(16px)",
  }),
  multiValueLabel : (baseStyles, state) => ({
    ...baseStyles,
    color: "#fff",
  }),
  clearIndicator : (baseStyles, state) => ({
    ...baseStyles,
    color: "#fff",
    cursor : "pointer",
    "&:hover" : {
      color : "red"
    }
  })
}
