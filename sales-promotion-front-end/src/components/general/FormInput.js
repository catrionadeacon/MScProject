import "../../styles/form.css";

export function FormInput({label, value, onChange, type, placeholder, step, width, name, defaultValue}) {
    return (
      <div className="formItem">
          <label className="formLabel">{label}</label>
          <input
          className="formInput"
          type={type}
          placeholder={placeholder}
          step={step}
          value={value}
          onChange={onChange}
          name={name}
          defaultValue ={defaultValue}
          />
      </div>
    )
  }
  
  export function FormInputDate({label, value, onChange, type, placeholder, step, width, name, defaultValue}) {
      return (
        <div className="formItemDate" width={width}px>
            <label className="formLabel">{label}</label>
            <input
            className="formInput"
            type={type}
            placeholder={placeholder}
            step={step}
            value={value}
            onChange={onChange}
            name={name}
            defaultValue ={defaultValue}
            />
        </div>
      )
    }
  
    export function FormInputNumber({label, value, onChange, type, placeholder, step, width, name, defaultValue}) {
      return (
        <div className="formItemNumber" width={width}px>
            <label className="formLabel">{label}</label>
            <input
            className="formInput"
            type={type}
            placeholder={placeholder}
            step={step}
            value={value}
            onChange={onChange}
            name={name}
            defaultValue ={defaultValue}
            />
        </div>
      )
    }
  
    export function ProductInput({label, value, onChange, type, placeholder, step, width, name, defaultValue}) {
      return (
        <div className="productItem">
            <label className="formLabel">{label}</label>
            <input
            className="formInput"
            type={type}
            placeholder={placeholder}
            step={step}
            value={value}
            onChange={onChange}
            name={name}
            defaultValue ={defaultValue}
            />
        </div>
      )
    }
  
  export function ProductInputMedium({label, value, onChange, type, placeholder, step, width, name, defaultValue}) {
      return (
        <div className="productItemMedium">
            <label className="formLabel">{label}</label>
            <input
            className="formInput"
            type={type}
            placeholder={placeholder}
            step={step}
            value={value}
            onChange={onChange}
            name={name}
            defaultValue ={defaultValue}
            />
        </div>
      )
    }
  
    export function ProductInputSmall({label, value, onChange, type, placeholder, step, width, name, defaultValue}) {
      return (
        <div className="productItemSmall">
            <label className="formLabel">{label}</label>
            <input
            className="formInput"
            type={type}
            placeholder={placeholder}
            step={step}
            value={value}
            onChange={onChange}
            name={name}
            defaultValue ={defaultValue}
            />
        </div>
      )
    }
  
  export function FormSelect({label, name, id, options, onChange}) {
      return (
          <div className="formItem">
              <label className="formLabel">{label}</label>
              <select className="formSelect" name={name} id={id} onChange={onChange}>
                  {
                      options.map((item) =>
                          <option value={item.value}>{item.text}</option>
                      )
                  }
              </select>
          </div>
      )
  }
  
  export function FormSelectMap({label, name, id, options, onChange}) {
      return (
          <div className="formItem">
              <label className="formLabel">{label}</label>
              <select className="formSelect" name={name} id={id} onChange={onChange}>
                  {
                      options.entries.map((item) =>
                          <option value={item.value}>{item.text}</option>
                      )
                  }
              </select>
          </div>
      )
  }
  
  export function ProductSelect({label, name, id, options, onChange}) {
      return (
          <div className="productItem">
              <label className="formLabel">{label}</label>
              <select className="formSelect" name={name} id={id} onChange={onChange}>
                  {
                      options.map((item) =>
                          <option value={item.value}>{item.text}</option>
                      )
                  }
              </select>
          </div>
      )
  }
  
  export function FormCheckbox({label, options, onChange}) {
      return (
          <div className="formItem">
              <label className="formLabel">{label}</label>
              <div className="formCheckbox">
                  {
                      options.map((item) =>
                      <div className="formCheckboxItem">
                          <input className="checkboxItem" type="checkbox" value={item.value} onChange={onChange}/>
                          <label className="checkboxLabel" for={item.value}>{item.text}</label>
                      </div>
                      )
                  }
              </div>
          </div>
      )
  }
  
  export function FormRadio({label, options, onChange, name}) {
      return (
          <div className="formItem">
              <label className="formLabel">{label}</label>
              <div className="formRadio">
                  {
                      options.map((item) =>
                          <div className="formRadioItem">
                              <input className="radioItem" type="radio" name={name} id={item.id} value={item.value} onChange={onChange}/>
                              <label for={item.value}>{item.text}</label>
                          </div>
                      )
                  }
              </div>
          </div>
      )
  }
  