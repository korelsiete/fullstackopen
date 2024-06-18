const PersonForm = ({
  handleSubmit,
  handleChangeName,
  handleChangeNumber,
  newName,
  newNumber,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <InputForm value={newName} onChange={handleChangeName} text="name" />
      <InputForm
        value={newNumber}
        onChange={handleChangeNumber}
        text="number"
      />
      <ButtonForm text="Add" />
    </form>
  );
};

const ButtonForm = ({ text }) => <button>{text}</button>;

const InputForm = ({ type = "text", value, onChange, text }) => {
  const textLabel = text.charAt(0).toUpperCase() + text.slice(1);
  return (
    <div>
      <label htmlFor={text}>{textLabel}: </label>
      <input id={text} type={type} value={value} onChange={onChange} />
    </div>
  );
};
export default PersonForm;
